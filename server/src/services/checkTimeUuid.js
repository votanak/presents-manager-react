import { arrayToFile, fileToArray } from './arrayFile.js';

export const checkTimeUuid = (uuid) =>
  setTimeout(async () => {
    let passUuids = await fileToArray('passUuids.json');
    delete passUuids[uuid];
    arrayToFile('passUuids.json', passUuids);
  }, 3600000);

export const checkAllPassUuids = async () => {
  let passUuids = await fileToArray('passUuids.json');
  const newPassUuids = Object.fromEntries(
    Object.entries(passUuids).filter((el) => Date.now() - el[1] < 3600000),
  );
  if (Object.keys(passUuids).length !== Object.keys(newPassUuids).length)
    arrayToFile('passUuids.json', newPassUuids);
};
