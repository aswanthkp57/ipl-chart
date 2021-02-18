const csv = require("csvtojson");
const fs = require("fs");

const getDataObject = async function (fileName) {
  const csvFilePath = `../src/data/${fileName}`;
  const dataObj = await csv().fromFile(csvFilePath);
  return dataObj;
};

const writeJsontoFile = function (data, fileName) {
  const jsonFilePath = `../src/public/output/${fileName}`;
  fs.writeFile(jsonFilePath, JSON.stringify(data), (err) => {
    if (err) console.log(`Error ${err}`);
    else console.log(`Data Saved as ${fileName}`);
  });
};

module.exports = { getDataObject, writeJsontoFile };
s