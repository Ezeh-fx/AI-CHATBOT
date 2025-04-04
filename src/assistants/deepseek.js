import OpenAI from "openai";
import { Assistant as OpenAiAssistant } from "./openai";

const openai = new OpenAI({
   baseURL: 'https://api.deepseek.com',
  apiKey: import.meta.env.VITE_DEEPSEEK_AI__API_KEY, // ✅ Corrected env variable
  dangerouslyAllowBrowser: true, // ❌ Avoid exposing API key in frontend
});
console.log(import.meta.env.VITE_DEEPSEEK_AI__API_KEY);

export class Assistant extends OpenAiAssistant {
  constructor(model = "deepseek-chat", client = openai) {
    // ✅ Changed to a valid model name
    super(model, client);
  }
}
