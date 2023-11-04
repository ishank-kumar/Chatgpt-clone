

const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true, // Use cautiously in a browser-like environment
});

export const sendMsgToOpenAI = async (message) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'system', content: message }],
      max_tokens: 150,
    });

    if (response && response.choices && response.choices.length > 0) {
      const completion = response.choices[0].message.content; // Access the content of the completion
      return completion;
    } else {
      console.error('Unexpected response format:', response);
      return null;
    }
  } catch (error) {
    console.error('Error:', error.response || error.message || error);
    return null;
  }
};













