export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function sendMessage(serverUrl: string, messages: Message[], userMessage: Message, documents?: string[]) {
  // Create a response based on the user's message and context with reasoning
  const generateResponse = (message: string, documents?: string[]) => {
    // Basic responses for common queries
    const responses = {
      "hello": "Hello! How can I help you today?",
      "hi": "Hi there! How can I assist you?",
      "how are you": "I'm functioning well, thank you! How can I help you?",
      "help": "I'm here to help! You can ask me questions about the instructional design process or upload documents for context.",
    };

    // Convert message to lowercase for matching
    const lowercaseMessage = message.toLowerCase();

    // Check for exact matches in basic responses first
    for (const [key, response] of Object.entries(responses)) {
      if (lowercaseMessage.includes(key)) {
        return response;
      }
    }

    // If we have documents, try to find relevant content with reasoning
    if (documents && documents.length > 0) {
      const result = findRelevantContentWithReasoning(lowercaseMessage, documents);
      if (result) {
        return result;
      }
    }

    // If no specific match is found, provide a more helpful response
    return `I understand you're asking about "${message}". To provide a more accurate answer, could you:
1. Be more specific about which phase of the instructional design process you're interested in
2. Ask about specific aspects like goals, stakeholders, or implementation
3. Upload relevant documents if you have specific content to reference`;
  };

  // Enhanced function to find relevant content with reasoning
  const findRelevantContentWithReasoning = (query: string, documents: string[]) => {
    const keywords = query.split(' ').filter(word => word.length > 3);
    const phases = ['analyze', 'design', 'develop', 'implement', 'evaluate', 'document'];
    
    // Check if query is about a specific phase
    const phaseMatch = phases.find(phase => query.includes(phase));
    
    let relevantContent = [];
    let context = '';

    // Combine all documents
    const combinedDocs = documents.join(' ');
    const sentences = combinedDocs.split(/[.!?]+/).filter(s => s.trim());

    // Score each sentence based on relevance
    const scoredSentences = sentences.map(sentence => {
      const lowercaseSentence = sentence.toLowerCase();
      let score = 0;

      // Score based on keyword matches
      keywords.forEach(keyword => {
        if (lowercaseSentence.includes(keyword)) score += 2;
      });

      // Boost score for phase-specific content
      if (phaseMatch && lowercaseSentence.includes(phaseMatch)) score += 3;

      // Boost score for sentences with key instructional design terms
      const idTerms = ['learning', 'objectives', 'assessment', 'stakeholders', 'goals', 'needs'];
      idTerms.forEach(term => {
        if (lowercaseSentence.includes(term)) score += 1;
      });

      return { sentence, score };
    });

    // Get the most relevant sentences
    const topSentences = scoredSentences
      .filter(s => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 2);

    if (topSentences.length > 0) {
      relevantContent = topSentences.map(s => s.sentence);
      
      // Add phase-specific context if applicable
      if (phaseMatch) {
        context = `This information is specifically related to the ${phaseMatch} phase. `;
      }

      // Construct a reasoned response
      return `${context}Based on the available documentation: ${relevantContent.join(' ')} 
      
This answer is relevant because it directly addresses your query about ${keywords.join(', ')}.`;
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