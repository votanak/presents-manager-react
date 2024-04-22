/**
 * JSON 404 response
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param obj: object to send
 */
export const sendWrapped = (req, res, obj) => res.status(200).json({ data: obj })
