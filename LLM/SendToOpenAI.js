const { Configuration, OpenAI } = require("openai");

const sendToOpenAI = async (text) => {
  try {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });

    const prompt = `
    Role: Quiz Creator
    Task: Generate a 5-question multiple-choice quiz based on the provided text. Each question should have four options (A, B, C, D) and indicate the correct answer.

    Text: ${text}
    `;

    const response = await openai.chat.completions.create({
      messages: [
        {
            role: "system",
            content: "You are a helpful assistant designed to output creative quizzes in JSON format using provided text. Role: Quiz Creator Task: Generate a 5-question multiple-choice quiz based on the provided text. Each question should have four options (A, B, C, D) and indicate the correct answer. Besides the quiz, include the top 3 concepts in the given text."
        },
        {
            role: "user", 
            content: text
        }
      ],    
      model: "gpt-3.5-turbo-0125", 
      response_format: { type: "json_object"}
    });

    console.log(response.usage)
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    throw error;
  }
};

module.exports = {
    sendToOpenAI
  }