export interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function sendMessage(serverUrl: string, messages: Message[], userMessage: Message) {
  const response = await fetch(`${serverUrl}/api/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama2",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that helps users fill out forms and can contact administrators if needed. Be concise and precise in your responses.",
        },
        ...messages,
        userMessage,
      ],
      stream: false,
    }),
  });

  const data = await response.json();
  return data.response;
}