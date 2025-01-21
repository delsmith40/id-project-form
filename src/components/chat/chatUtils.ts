export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function sendMessage(serverUrl: string, messages: Message[], userMessage: Message, documents?: string[]) {
  const systemMessage = {
    role: "system",
    content: documents 
      ? `You are a helpful assistant that helps users with their questions. Use this context to help answer questions: ${documents.join('\n\n')}`
      : "You are a helpful assistant that helps users fill out forms and can contact administrators if needed. Be concise and precise in your responses.",
  };

  const response = await fetch(`${serverUrl}/api/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama2",
      messages: [
        systemMessage,
        ...messages,
        userMessage,
      ],
      stream: false,
    }),
  });

  const data = await response.json();
  return data.response;
}