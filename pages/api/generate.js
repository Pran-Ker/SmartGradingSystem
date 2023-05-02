import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
// const openai = new OpenAIApi(configuration);

// export default async function (req, res) {
//   if (!configuration.apiKey) {
//     res.status(500).json({
//       error: {
//         message: "OpenAI API key not configured, please follow instructions in README.md",
//       }
//     });
//     return;
//   }

//   const question = req.body.question || '';
//   const answer = req.body.answer || '';
//   if (question.trim().length === 0) {
//     res.status(400).json({
//       error: {
//         message: "Please enter a valid question",
//       }
//     });
//     return;
//   }

//   try {
//     const completion = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt: generatePrompt(question, answer),
//       temperature: 0.6,
//       max_tokens:200
//     });
//     res.status(200).json({ result: completion.data.choices[0].text });
//   } catch(error) {

//     if (error.response) {
//       console.error(error.response.status, error.response.data);
//       res.status(error.response.status).json(error.response.data);
//     } else {
//       console.error(`Error with OpenAI API request: ${error.message}`);
//       res.status(500).json({
//         error: {
//           message: 'An error occurred during your request.',
//         }
//       });
//     }
//   }
// }

// function generatePrompt(question, answer) {
  
//   return `Imagine you are a teacher in a college. You asked your student the following question: "${question}". Here's their answer:"${answer}".\n\n\nFormat of reply:\nScore: /10 \nFeedback: \nTips for improvement:`;
// }

// // 