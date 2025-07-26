// const chatForm = document.getElementById("chatForm");
// const userInput = document.getElementById("userInput");
// const chatWindow = document.getElementById("chatWindow");

// let messages = [
//   {
//     role: "system",
//     content:
//       "You are a friendly and professional product advisor for L’Oréal. Only answer questions about L’Oréal skincare, cosmetics, haircare, and beauty routines. Politely refuse anything unrelated. If the user shares their name, remember and use it naturally later. Keep responses clear, concise, and friendly with emoji.",
//   },
// ];

// let userName = "";

// // Initial welcome message
// appendMessage(
//   "ai",
//   "💄 Hi! I’m your L’Oréal Smart Advisor. Ask me anything about beauty or products!"
// );

// // Use your secure Cloudflare Worker endpoint:
// const workerUrl = "https://variablesandsecrets.c-rice3118.workers.dev/";

// chatForm.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const input = userInput.value.trim();
//   if (!input) return;

//   messages.push({ role: "user", content: input });

//   // Display the latest user question above assistant reply
//   appendMessage("user-question", `You: ${input}`);
//   appendMessage("user", input);

//   userInput.value = "";

//   try {
//     const response = await fetch(workerUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ messages }),
//     });

//     const data = await response.json();
//     const reply = data.choices[0].message.content.trim();

//     // Detect and save user name if mentioned
//     const nameMatch = input.match(/my name is ([a-zA-Z]+)/i);
//     if (nameMatch && !userName) {
//       userName = nameMatch[1];
//     }

//     const personalizedReply = userName
//       ? reply.replace(/\b(?:friend|there)\b/gi, userName)
//       : reply;

//     messages.push({ role: "assistant", content: reply });

//     appendMessage("ai", personalizedReply);
//   } catch (err) {
//     console.error("Error:", err);
//     appendMessage("ai", "⚠️ Sorry, I couldn't connect right now.");
//   }
// });

// function appendMessage(sender, text) {
//   if (sender === "user-question") {
//     const prev = document.querySelector(".msg.user-question");
//     if (prev) prev.remove();
//   }

//   const msg = document.createElement("div");
//   msg.classList.add("msg", sender);
//   msg.textContent = text;
//   chatWindow.appendChild(msg);
//   chatWindow.scrollTop = chatWindow.scrollHeight;
// }

//working two updates ago//////

const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatWindow = document.getElementById("chatWindow");

// Stores full conversation for multi-turn context
let messages = [
  {
    role: "system",
    content:
      "You are a friendly and professional product advisor for L’Oréal. Only answer questions about L’Oréal skincare, cosmetics, haircare, and beauty routines. Kindly refuse to answer unrelated questions. If the user shares their name, remember it and use it naturally in future replies. Keep responses clear, concise, and friendly with emoji.",
  },
];

let userName = "";

// Initial greeting
appendMessage(
  "ai",
  "💄 Hi! I’m your L’Oréal Smart Advisor. Ask me about products or beauty routines!"
);

// Your Cloudflare Worker URL
const workerUrl = "https://variablesandsecrets.c-rice3118.workers.dev/";

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const input = userInput.value.trim();
  if (!input) return;

  // Add user message to full conversation history
  messages.push({ role: "user", content: input });

  // Display user's latest question above AI response
  appendMessage("user-question", `You: ${input}`);

  userInput.value = "";

  try {
    const response = await fetch(workerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    });

    const data = await response.json();
    const reply = data.choices[0].message.content.trim();

    // Capture name from user input
    const nameMatch = input.match(/my name is ([a-zA-Z]+)/i);
    if (nameMatch && !userName) {
      userName = nameMatch[1];
    }

    // Optionally personalize the AI’s response
    const personalizedReply = userName
      ? reply.replace(/\b(?:friend|there)\b/gi, userName)
      : reply;

    // Store assistant reply in the message history
    messages.push({ role: "assistant", content: reply });

    appendMessage("ai", personalizedReply);
  } catch (error) {
    console.error("Worker error:", error);
    appendMessage("ai", "⚠️ Sorry, I couldn't get a response right now.");
  }
});

function appendMessage(sender, text) {
  // If showing a new user-question, remove any previous one
  if (sender === "user-question") {
    const prev = document.querySelector(".msg.user-question");
    if (prev) prev.remove();
  }

  const msgDiv = document.createElement("div");
  msgDiv.classList.add("msg", sender);
  msgDiv.textContent = text;
  chatWindow.appendChild(msgDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

/////////WORKINGFIRSTUPDATE/////////////////

// const chatForm = document.getElementById("chatForm");
// const userInput = document.getElementById("userInput");
// const chatWindow = document.getElementById("chatWindow");

// // Initialize conversation with a strong system prompt for brand focus
// let messages = [
//   {
//     role: "system",
//     content:
//       "You are a friendly and professional product advisor for L’Oréal. Only answer questions about L’Oréal skincare, cosmetics, haircare, and beauty routines. Kindly refuse to answer unrelated questions. If the user shares their name, remember it and use it naturally in future replies. Keep responses clear, concise, and friendly with emoji.",
//   },
// ];

// // Track user's name if mentioned
// let userName = "";

// // Initial greeting
// appendMessage(
//   "ai",
//   "💄 Hi! I’m your L’Oréal Smart Advisor. Ask me about products or beauty routines!"
// );

// // Your deployed Cloudflare Worker URL
// const workerUrl = "https://variablesandsecrets.c-rice3118.workers.dev/";

// chatForm.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const input = userInput.value.trim();
//   if (!input) return;

//   appendMessage("user", input);
//   userInput.value = "";

//   // Add user message to conversation
//   messages.push({ role: "user", content: input });

//   try {
//     const response = await fetch(workerUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ messages }),
//     });

//     const data = await response.json();
//     const reply = data.choices[0].message.content.trim();

//     // Extract and store name if the user provides it (e.g. "My name is Cody")
//     const nameMatch = input.match(/my name is ([a-zA-Z]+)/i);
//     if (nameMatch && !userName) {
//       userName = nameMatch[1];
//     }

//     // Personalize AI reply if name was captured
//     const personalizedReply = userName
//       ? reply.replace(/\b(?:friend|there)\b/gi, userName)
//       : reply;

//     // Store assistant response
//     messages.push({ role: "assistant", content: reply });

//     appendMessage("ai", personalizedReply);
//   } catch (error) {
//     console.error("Worker error:", error);
//     appendMessage(
//       "ai",
//       "⚠️ Oops! I couldn't get a response. Try again shortly."
//     );
//   }
// });

// // Append chat bubbles
// function appendMessage(sender, text) {
//   const msgDiv = document.createElement("div");
//   msgDiv.classList.add("msg", sender);
//   msgDiv.textContent = text;
//   chatWindow.appendChild(msgDiv);
//   chatWindow.scrollTop = chatWindow.scrollHeight;
// }

///////WORKIJNG BEFORE LEVEL UPS/////////////////

// const chatForm = document.getElementById("chatForm");
// const userInput = document.getElementById("userInput");
// const chatWindow = document.getElementById("chatWindow");

// // System message: restrict chatbot to L'Oréal beauty topics only
// let messages = [
//   {
//     role: "system",
//     content:
//       "You are a friendly and professional product advisor for L’Oréal. Only answer questions about L’Oréal skincare, cosmetics, haircare, and beauty routines. Kindly decline questions that are unrelated to L’Oréal or beauty. Keep responses short, helpful, and include emojis when appropriate.",
//   },
// ];

// // Display welcome message
// appendMessage("ai", "💄 Hi! I'm your L’Oréal Smart Advisor. Ask me about products or beauty routines!");

// // Use Cloudflare Worker URL instead of OpenAI directly
// const workerUrl = "https://variablesandsecrets.c-rice3118.workers.dev/";

// chatForm.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const input = userInput.value.trim();
//   if (!input) return;

//   appendMessage("user", input);
//   userInput.value = "";

//   messages.push({ role: "user", content: input });

//   try {
//     const response = await fetch(workerUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ messages }),
//     });

//     const data = await response.json();
//     const reply = data.choices[0].message.content.trim();

//     messages.push({ role: "assistant", content: reply });
//     appendMessage("ai", reply);
//   } catch (error) {
//     console.error("Worker error:", error);
//     appendMessage("ai", "⚠️ Oops! I couldn't get a response. Try again in a moment.");
//   }
// });

// // Append message to chat window
// function appendMessage(sender, text) {
//   const msgDiv = document.createElement("div");
//   msgDiv.classList.add("msg", sender);
//   msgDiv.textContent = text;
//   chatWindow.appendChild(msgDiv);
//   chatWindow.scrollTop = chatWindow.scrollHeight;
// }

// // Assumes OPENAI_API_KEY is declared in secrets.js

// const chatForm = document.getElementById("chatForm");
// const userInput = document.getElementById("userInput");
// const chatWindow = document.getElementById("chatWindow");

// // ✅ Refined system prompt for AI relevance
// let messages = [
//   {
//     role: "system",
//     content:
//       "You are a friendly and professional product advisor for L’Oréal. Your job is to answer questions only about L’Oréal skincare, haircare, cosmetics, and beauty routines. If the user asks a question unrelated to L’Oréal or beauty, politely decline to answer and guide them back to beauty-related topics. Keep responses brief, clear, and helpful. Add emojis when it makes sense.",
//   },
// ];

// // Initial welcome message
// appendMessage(
//   "ai",
//   "💄 Hi! I'm your L’Oréal Smart Advisor. Ask me about skincare, haircare, or beauty routines!"
// );

// // Handle chat submission
// chatForm.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const input = userInput.value.trim();
//   if (!input) return;

//   appendMessage("user", input);
//   userInput.value = "";

//   messages.push({ role: "user", content: input });

//   try {
//     const response = await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${OPENAI_API_KEY}`,
//       },
//       body: JSON.stringify({
//         model: "gpt-4o",
//         messages,
//         max_tokens: 300,
//       }),
//     });

//     const data = await response.json();
//     const reply = data.choices[0].message.content.trim();

//     messages.push({ role: "assistant", content: reply });
//     appendMessage("ai", reply);
//   } catch (error) {
//     console.error("OpenAI API error:", error);
//     appendMessage(
//       "ai",
//       "⚠️ Sorry, something went wrong while fetching a response."
//     );
//   }
// });

// // Display messages in the chat window
// function appendMessage(sender, text) {
//   const msgDiv = document.createElement("div");
//   msgDiv.classList.add("msg", sender);
//   msgDiv.textContent = text;
//   chatWindow.appendChild(msgDiv);
//   chatWindow.scrollTop = chatWindow.scrollHeight;
// }

// // Assumes OPENAI_API_KEY is declared in secrets.js

// const chatForm = document.getElementById("chatForm");
// const userInput = document.getElementById("userInput");
// const chatWindow = document.getElementById("chatWindow");

// // System message to guide the chatbot’s behavior
// let messages = [
//   {
//     role: "system",
//     content:
//       "You are a helpful and friendly product advisor working for L’Oréal. Only answer questions related to L’Oréal skincare, haircare, and cosmetic products, beauty routines, and recommendations. Politely refuse unrelated questions. Use clear, concise answers and include emojis when appropriate.",
//   },
// ];

// // Display initial greeting
// appendMessage(
//   "ai",
//   "👋 Hello! I’m your L’Oréal Smart Advisor. Ask me about products or routines!"
// );

// // Handle form submission
// chatForm.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const input = userInput.value.trim();
//   if (!input) return;

//   appendMessage("user", input);
//   userInput.value = "";

//   messages.push({ role: "user", content: input });

//   try {
//     const response = await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${OPENAI_API_KEY}`,
//       },
//       body: JSON.stringify({
//         model: "gpt-4o",
//         messages,
//         max_tokens: 300,
//       }),
//     });

//     const data = await response.json();
//     const reply = data.choices[0].message.content.trim();

//     messages.push({ role: "assistant", content: reply });
//     appendMessage("ai", reply);
//   } catch (error) {
//     console.error("OpenAI API error:", error);
//     appendMessage(
//       "ai",
//       "⚠️ Sorry, something went wrong while fetching a response."
//     );
//   }
// });

// // Function to append chat messages to the UI
// function appendMessage(sender, text) {
//   const msgDiv = document.createElement("div");
//   msgDiv.classList.add("msg", sender);
//   msgDiv.textContent = text;
//   chatWindow.appendChild(msgDiv);
//   chatWindow.scrollTop = chatWindow.scrollHeight;
// }

// const chatForm = document.getElementById("chatForm");
// const userInput = document.getElementById("userInput");
// const chatWindow = document.getElementById("chatWindow");

// let messages = [
//   {
//     role: "system",
//     content:
//       "You are a friendly and professional L’Oréal product advisor. Offer brief, helpful answers and add emoji where helpful.",
//   },
// ];

// appendMessage("ai", "👋 Hello! How can I help you today?");

// chatForm.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const input = userInput.value.trim();
//   if (!input) return;

//   appendMessage("user", input);
//   userInput.value = "";

//   messages.push({ role: "user", content: input });

//   try {
//     const response = await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${OPENAI_API_KEY}`,
//       },
//       body: JSON.stringify({
//         model: "gpt-4o",
//         messages,
//         max_tokens: 300,
//       }),
//     });

//     const data = await response.json();
//     const reply = data.choices[0].message.content.trim();

//     messages.push({ role: "assistant", content: reply });
//     appendMessage("ai", reply);
//   } catch (error) {
//     console.error("Error:", error);
//     appendMessage("ai", "⚠️ Sorry, something went wrong.");
//   }
// });

// function appendMessage(sender, text) {
//   const msgDiv = document.createElement("div");
//   msgDiv.classList.add("msg", sender);
//   msgDiv.textContent = text;
//   chatWindow.appendChild(msgDiv);
//   chatWindow.scrollTop = chatWindow.scrollHeight;
// }
