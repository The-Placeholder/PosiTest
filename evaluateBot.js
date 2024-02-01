import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.CHATGPT_API_KEY });

export default async function evaluateCode() {
  const response = await open.ai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: systemContent,
      },
      {
        role: 'user',
        content: instructionPrompt,
      },
    ],
  });
}
