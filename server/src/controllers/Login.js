import jwt from 'jsonwebtoken';
import verify from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { accessTokenSecret } from '../middleware/auth.js';
import { sendWrapped } from '../services/sendWrapper.js';
import { nodeCache } from '../services/cache.js';
import { fileToArray } from '../services/arrayFile.js';

/**
 * Health check endpoint
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const login = (req, res) => {
  // Read email and password from request body
  const { email, password } = req.body;

  // Comparison email and password
  const adminAuth = fileToArray('adminAuth.json');
  const user =
    adminAuth.email === email && adminAuth.password === password
      ? adminAuth
      : null;

  if (user) {
    // Generate an access token
    const accessToken = jwt.sign(
      { email: user.email, role: user.role },
      accessTokenSecret,
    );
    const authCode = uuidv4();
    nodeCache.set(authCode, accessToken);

    sendWrapped(req, res, { accessToken, authCode });
  } else {
    res.status(403).send({ error: 'Email or password are incorrect' });
  }
};

export const getTokenSilently = (req, res) => {
  if (!req.body.authCode) {
    return res.status(400).send({ error: 'authCode is required' });
  }
  const { authCode } = req.body;

  const token = nodeCache.get(authCode);
  if (!token) {
    return res.status(400).send({ error: 'Incorrect authCode' });
  }

  verify(token, accessTokenSecret, (err) => {
    if (err) {
      nodeCache.del(authCode);
      return res.status(401).send({ error: "Can't get token" });
    }

    return sendWrapped(req, res, { accessToken: token });
  });
};

export const logout = (req, res) => {
  if (!req.body.authCode) {
    return res.status(400).send({ error: 'authCode is required' });
  }
  const { authCode } = req.body;

  const token = nodeCache.get(authCode);
  if (!token) {
    return res.status(400).send({ error: 'Incorrect authCode' });
  }

  nodeCache.del(authCode);

  return sendWrapped(req, res, { status: 'success' });
};
