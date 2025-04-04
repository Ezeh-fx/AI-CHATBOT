import OpenAI from "openai";

const openai = new OpenAI({
    apiKey : import.meta.env.VITE_OPEN_AI_API_KEY,
  dangerouslyAllowBrowser: true,
});
console.log(import.meta.env.VITE_OPEN_AI_API_KEY)

export class Assistant { // ✅ Renamed to avoid conflict with imported OpenAI class
  #client
  #model;

  constructor(model = "gpt-4o-mini" , client = openai) { // ✅ Changed to a valid model name
    this.#client = client;
    this.#model = model;
  }

  async chat(content, history = []) {
    try {
      const response = await this.#client.chat.completions.create({
        model: this.#model,
        messages: [
          ...history, // ✅ Include previous messages for context
          { role: "user", content },
        ],
      });

      return response.choices[0].message.content || "No response received.";
    } catch (error) {
      console.error("OpenAI API Error:", error);
      return "Sorry, something went wrong.";
    }
  }


  async *chatStream (content,history) {
    try {
      const response = await this.#client.chat.completions.create({
        model: this.#model,
        messages: [
          ...history, // ✅ Include previous messages for context
          { role: "user", content },
        ],
        stream : true,
      });

     for await (const chuk of response) {
      yield chuk.choices[0]?.delta?.content || ""
     }
    } catch (error) {
      console.error("OpenAI API Error:", error);
      return "Sorry, something went wrong.";
    }
  }
}