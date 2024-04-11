//require('dotenv').config();
const { parsePDF } = require('../backend/services/PDFParser'); 
const { sendToOpenAI } = require('./SendToOpenAI'); 

const generateQuiz = async (testFilePath) => {
  try {
    // Extract text from the PDF
    const pdfText = await parsePDF(testFilePath);

    // Send the extracted text to OpenAI
    const openAIResponse = await sendToOpenAI(pdfText);
    return openAIResponse;
  } catch (error) {
    console.error("Error in testing:", error);
  }
};

module.exports = {
  generateQuiz
}