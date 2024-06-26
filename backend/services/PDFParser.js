const pdf = require( "pdf-parse");
const fs = require('fs');

const parsePDF = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
  } catch (error) {
    console.error("Error parsing PDF:", error);
    throw error;
  }
};

module.exports = {
  parsePDF
}