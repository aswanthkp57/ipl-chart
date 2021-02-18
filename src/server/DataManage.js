const csv = require("csvtojson");
const fs = require("fs");

/**
 * Retrieves object from csv file.
 * @async
 * @method
 * @param {String} fileName - name of the file.
 * @returns {Object} parsed csv object
 * @throws {Error} When the file is not found.
 */
const getDataObject = async function (fileName) {
  const csvFilePath = `../src/data/${fileName}`;
  const dataObj = await csv().fromFile(csvFilePath);
  return dataObj;
};

/**
 * Write object to file as json.
 * @async
 * @method
 * @param {Object} data - data to be written as json.
 * @param {String} fileName - name of the file.
 * @returns {Object} parsed csv object
 * @throws {Error} When error in writing.
 */
const writeJsontoFile = function (data, fileName) {
  const jsonFilePath = `../src/public/output/${fileName}`;
  fs.writeFile(jsonFilePath, JSON.stringify(data), (err) => {
    if (err) console.log(`Error ${err}`);
    else console.log(`Data Saved as ${fileName}`);
  });
};

module.exports = { getDataObject, writeJsontoFile };
