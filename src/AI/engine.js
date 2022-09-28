import axios from "axios";
import { AI_TOKEN } from "../config";
export const tryAI = async (input) => {
  const url = "https://api.openai.com/v1/engines/davinci/completions";
  const params = {
    prompt: input,
    max_tokens: 200,
    temperature: 0.7,
    frequency_penalty: 0.5,
  };
  const headers = {
    Authorization: `Bearer ${AI_TOKEN}`,
  };

  try {
    const res = await axios.post(url, params, { headers: headers });
    const output = `${input}${res.data.choices[0].text}`;
    return output;
  } catch (err) {
    console.log(err);
  }
};
