export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

interface OllamaResponse {
  response: string;
  done: boolean;
}

export async function sendMessage(serverUrl: string, messages: Message[], userMessage: Message, documents?: string[]) {
  try {
    if (!serverUrl) {
      return "Please provide your Ollama server URL to enable AI-powered responses.";
    }

    // Create system message with context from documents
    let systemMessage = "You are an AI assistant specializing in instructional design. ";
    if (documents && documents.length > 0) {
      systemMessage += "Here is some context from the uploaded documents: " + documents.join(" ");
    }

    const response = await fetch(`${serverUrl}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama2',  // You can change this to any model you have installed on your Ollama server
        messages: [
          {
            role: 'system',
            content: systemMessage
          },
          ...messages.slice(-5), // Keep last 5 messages for context
          userMessage
        ],
        stream: false
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get response from Ollama server');
    }

    const data: OllamaResponse = await response.json();
    return data.response;
  } catch (error) {
    console.error("Error in sendMessage:", error);
    return "Sorry, there was an error connecting to the Ollama server. Please check if it's running and try again.";
  }
}