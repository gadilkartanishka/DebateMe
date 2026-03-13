import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

export async function getWikiReferences(topic, position) {
  try {
    if (!API_KEY) throw new Error("Missing API Key");
    
    // 1. Ask Gemini for the best Wikipedia search query to keep it smart
    const searchModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `Given the debate topic "${topic}" and the specific position "${position}", what is the single most relevant 1-5 word search term to look up on Wikipedia to get factual background articles? Reply with ONLY the search term, no quotes, no extra text.`;
    const searchResult = await searchModel.generateContent(prompt);
    const suggestedQuery = searchResult.response.text().trim();

    if (!suggestedQuery) return [];

    // 2. Fetch the top 5 search results from Wikipedia
    const searchRes = await axios.get(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(suggestedQuery)}&utf8=&format=json&origin=*&srlimit=5`
    );
    
    const searchPages = searchRes.data.query.search;
    if (!searchPages || searchPages.length === 0) return [];

    return searchPages.map(page => ({
      title: page.title,
      // Wikipedia returns snippets with raw HTML <span> tags for highlights, so we strip them
      snippet: page.snippet.replace(/<\/?[^>]+(>|$)/g, ""),
      url: `https://en.wikipedia.org/?curid=${page.pageid}`
    }));

  } catch (err) {
    console.error("Wiki fetch error:", err);
    return [];
  }
}

export async function getOpponentResponse(topic, userPosition, history, latestInput) {
  if (!API_KEY) throw new Error("Missing VITE_GEMINI_API_KEY in .env");

  // Filter history to handle format expected by Gemini (if sending entire history, though we might just stringify it for prompt).
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const systemPrompt = `You are an expert, challenging debate opponent.
Topic: ${topic}
The user's overall position: ${userPosition}
Your goal is to critically analyze and counter their arguments, pushing them to think deeper. Be constructive and maintain a respectful, natural, and conversational tone. Avoid overly complex, "dictionary-like" vocabulary—speak like a smart, articulate human in a real back-and-forth discussion.
You must also score their latest argument based on logic, evidence, and rhetorical strength on a scale of 1 to 10.
Return your response EXACTLY in this JSON format:
{
  "score": <number 1-10>,
  "feedback": "<1 short sentence of feedback on their argument>",
  "rebuttal": "<Your actual response to their argument, 2-3 paragraphs max>"
}`;

  // We are creating a manual prompt that includes the history for context:
  const conversation = history.map(m => `${m.role === 'user' ? 'User' : 'You'}: ${m.content}`).join('\n\n');
  const prompt = `${systemPrompt}\n\nPast Conversation:\n${conversation}\n\nUser's Latest Argument:\n${latestInput}\n\nRespond with the JSON object.`;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    // Try to parse the JSON
    // Sometimes the model wraps JSON in markdown blocks like \`\`\`json ... \`\`\`
    const jsonStr = responseText.replace(/```json\n?|```/g, '').trim();
    return JSON.parse(jsonStr);
  } catch (err) {
    console.error("Gemini Debate Error:", err);
    throw new Error("Failed to generate a response. The opponent is gathering their thoughts.");
  }
}

export async function reframeArgument(topic, userPosition, draftingText) {
  if (!API_KEY) throw new Error("Missing VITE_GEMINI_API_KEY in .env");

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `You are an expert debate coach and speechwriter.
Topic: ${topic}
The user is trying to argue this position: ${userPosition}
Here is their current draft argument:
---
${draftingText}
---
Rewrite and reframe this argument to make it significantly more persuasive and logically sound. 
Fix any logical fallacies, improve the flow, and give it a confident, professional tone.
Crucially, keep the language natural and accessible. Avoid overly formal, "bookish," or "dictionary-like" vocabulary so it sounds like something a real, articulate human would naturally say.
Do NOT add extra pleasantries or formatting. Just return the pure, strengthened text. 2-3 short paragraphs max.`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (err) {
    console.error("Gemini Reframe Error:", err);
    throw new Error("Failed to reframe the argument.");
  }
}

export async function getDynamicContext(topic, position, draftingText) {
  try {
    if (!API_KEY) return null;
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `The user is debating the topic "${topic}" and defending the position: "${position}".
They are currently writing this draft argument:
---
${draftingText}
---
Provide 2-3 extremely concise, factual bullet points (like critical statistics, exact historical precedents, or hard facts) that are highly relevant to the *specific angle* they are writing right now.
Do NOT provide generic facts. Do NOT tell them how to argue. Just give them the raw, powerful stats/facts to drop into their argument.
Keep it very short. Use standard bullet points.`;
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (err) {
    console.error("Dynamic Context Error:", err);
    return null;
  }
}