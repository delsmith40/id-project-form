export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function sendMessage(serverUrl: string, messages: Message[], userMessage: Message, documents?: string[]) {
  // Ensure serverUrl is properly formatted
  const baseUrl = serverUrl.replace(/\/$/, ''); // Remove trailing slash if present
  
  const context = documents && documents.length > 0 
    ? `Context from uploaded documents:\n\n${documents.join('\n---\n')}\n\nUse the above context to help answer questions. If the context doesn't contain relevant information, let the user know.`
    : "You are a helpful assistant that helps users with their questions.";

  const systemMessage = {
    role: "system",
    content: context
  };

  try {
    const response = await fetch(`${baseUrl}/api/generate`, {
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

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Error in sendMessage:", error);
    throw error;
  }
}