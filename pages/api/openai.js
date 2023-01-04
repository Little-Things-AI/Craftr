const OpenAI = require("openai-api");
const openai = new OpenAI(process.env.OPENAI_API_KEY);

export default async (req, res) => {
  // Promt values
  const beforeP1 = `Hello! I am a bot designed to help you create the perfect OpenAI API prompts using the (engine name) engine. To generate an example prompt, please provide me with the following information:

1. Select a topic or domain from the following list: natural language processing/NLP, computer vision, language translation, sentiment analysis.
2. Enter a specific task or question for the API to generate text for.
3. (Optional) Enter any additional details or requirements for the generated text.

An example of a good generated prompt: 'Hi! I am a bot that can help you find the next questions. I am an expert on a particular subject and have been tasked with teaching someone new to the field. I will help you by identifying the key topics and questions that you should ask to better understand a topic. By providing you with a list of questions, you can easily move on to the next step in your learning process. 
What would you like to understand better? (user input) 
What is your knowledge level? (user input)'

This is a great example of a suggested prompt because it gives a first-person identity, adding personality/capabilities, and defines where the user input will be with questions.

Remember to be as specific as possible in your descriptions to get the best results from me.
Select a topic or domain:`;
  const beforeP2 = `Enter a specific task for your prompt:`;
  const beforeP3 = '(Optional) Enter any additional details or requirements for your prompt:';
  const afterP = `Here is a first person prompt tailored to achieve your desired outcome. This prompt contains an identity, capabilities and questions/statements created for future user input:`;
  const breakPoint = `\n\n'''\n\n`;

  // Construct the prompt
  let prompt = `${beforeP1} ${breakPoint} ${req.body.name} ${breakPoint} ${beforeP2} ${breakPoint} ${req.body.name2} ${breakPoint}${beforeP3} ${breakPoint} ${req.body.name3} ${breakPoint} ${afterP}`;

  // Log promt
  console.log(prompt);

  // Call OpenAI API
  const gptResponse = await openai.complete({
    engine: "text-curie-001",
    prompt: `${prompt}`,
    maxTokens: 1000,
    temperature: 0.6,
    topP: 1,
    presencePenalty: 0.6,
    frequencyPenalty: 0.5,
    bestOf: 1,
    n: 1,
  });

  res.status(200).json({ text: `${gptResponse.data.choices[0].text}` });
};
// model: "text-davinci-003 or text-curie-001",
// prompt: "Example prompt above is starfish, here's another simple one. Write a long form social media post based on this Content that will engage a reader into conversation, include a summary of the Content",
