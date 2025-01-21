export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function sendMessage(serverUrl: string, messages: Message[], userMessage: Message, documents?: string[]) {
  // Create a simple response based on the user's message and context
  const generateResponse = (message: string, documents?: string[]) => {
    // Basic responses for common queries
    const responses = {
      "hello": "Hello! How can I help you today?",
      "hi": "Hi there! How can I assist you?",
      "how are you": "I'm functioning well, thank you! How can I help you?",
      "help": "I'm here to help! You can ask me questions or upload documents for context.",
    };

    // Convert message to lowercase for matching
    const lowercaseMessage = message.toLowerCase();

    // Check if we have any document context and the message contains questions about them
    if (documents && documents.length > 0) {
      const combinedDocs = documents.join(' ');
      const relevantContent = findRelevantContent(lowercaseMessage, combinedDocs);
      if (relevantContent) {
        return `Based on the documents: ${relevantContent}`;
      }
    }

    // Check for exact matches in our responses
    for (const [key, response] of Object.entries(responses)) {
      if (lowercaseMessage.includes(key)) {
        return response;
      }
    }

    // Default response for unmatched queries
    return "I understand you're asking about " + message + ". Could you please provide more details or rephrase your question?";
  };

  // Helper function to find relevant content from documents
  const findRelevantContent = (query: string, content: string) => {
    const sentences = content.split(/[.!?]+/);
    const relevantSentences = sentences.filter(sentence => 
      sentence.toLowerCase().includes(query) ||
      query.split(' ').some(word => 
        sentence.toLowerCase().includes(word) && word.length > 3
      )
    );

    if (relevantSentences.length > 0) {
      return relevantSentences
        .slice(0, 2) // Limit to 2 most relevant sentences
        .join('. ') + '.';
    }
    return null;
  };

  try {
    // Generate response
    const response = generateResponse(userMessage.content, documents);

    // Simulate network delay for more natural interaction
    await new Promise(resolve => setTimeout(resolve, 500));

    return response;
  } catch (error) {
    console.error("Error in sendMessage:", error);
    throw error;
  }
}