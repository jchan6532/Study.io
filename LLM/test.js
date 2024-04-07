require('dotenv').config();
const { parsePDF } = require('../backend/services/PDFParser'); 
const { sendToOpenAI } = require('./SendToOpenAI'); 

const testFilePath = 'C:\\Users\\kline\\OneDrive\\Documents\\studyio-testPDF.pdf';
const performTest = async () => {
  try {
    // Extract text from the PDF
    const pdfText = await parsePDF(testFilePath);

    // Send the extracted text to OpenAI
    const openAIResponse = await sendToOpenAI(pdfText);
    
    console.log("Response from OpenAI:", openAIResponse);
  } catch (error) {
    console.error("Error in testing:", error);
  }
};

performTest();