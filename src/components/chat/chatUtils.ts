export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function sendMessage(serverUrl: string, messages: Message[], userMessage: Message, documents?: string[]) {
  // Create a simple response based on the user's message and context
  const generateResponse = (message: string, context?: string) => {
    // Basic responses for common queries
    const responses = {
      "hello": "Hello! How can I help you today?",
      "hi": "Hi there! How can I assist you?",
      "how are you": "I'm functioning well, thank you! How can I help you?",
      "help": "I'm here to help! You can ask me questions or upload documents for context.",
    };

    // Check if we have any document context
    if (context) {
      return `Based on the provided documents, I can help answer your questions. ${context}`;
    }

    // Convert message to lowercase for matching
    const lowercaseMessage = message.toLowerCase();

    // Check for exact matches in our responses
    for (const [key, response] of Object.entries(responses)) {
      if (lowercaseMessage.includes(key)) {
        return response;
      }
    }

    // Default response for unmatched queries
    return "I understand you're asking about " + message + ". Could you please provide more details or rephrase your question?";
  };

  try {
    // Process documents if they exist
    const context = documents && documents.length > 0 
      ? `I see you've provided some documents. Here's what I found:\n${documents.join('\n---\n')}`
      : undefined;

    // Generate response
    const response = generateResponse(userMessage.content, context);

    // Simulate network delay for more natural interaction
    await new Promise(resolve => setTimeout(resolve, 500));

    return response;
  } catch (error) {
    console.error("Error in sendMessage:", error);
    throw error;
  }
}