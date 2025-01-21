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

    // Validate server URL format
    try {
      new URL(serverUrl);
    } catch (e) {
      return "Please enter a valid URL (e.g., http://localhost:11434)";
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
      const errorText = await response.text();
      console.error('Server response:', errorText);
      throw new Error(`Server responded with status ${response.status}: ${errorText}`);
    }

    const data: OllamaResponse = await response.json();
    return data.response;
  } catch (error) {
    console.error("Error in sendMessage:", error);
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      return `Important: If you're using a deployed Lovable app, it cannot connect to localhost.
      
You have two options:
1. Run your Lovable app locally (using 'npm run dev')
2. Deploy your Ollama server to a public URL with HTTPS

For local development:
1. Start Ollama with CORS enabled:
   export OLLAMA_ORIGINS="*"
   ollama serve
2. Use http://localhost:11434 as the server URL
3. Run your Lovable app locally`;
    }
    return `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`;
  }
}