export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

interface PerplexityResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export async function sendMessage(apiKey: string, messages: Message[], userMessage: Message, documents?: string[]) {
  try {
    // If no API key is provided, return a message asking for it
    if (!apiKey) {
      return "Please provide your Perplexity API key to enable AI-powered responses.";
    }

    // Create system message with context from documents
    let systemMessage = "You are an AI assistant specializing in instructional design. ";
    if (documents && documents.length > 0) {
      systemMessage += "Here is some context from the uploaded documents: " + documents.join(" ");
    }

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: 'system',
            content: systemMessage
          },
          ...messages.slice(-5), // Keep last 5 messages for context
          userMessage
        ],
        temperature: 0.2,
        top_p: 0.9,
        max_tokens: 1000,
        frequency_penalty: 1,
        presence_penalty: 0
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get response from Perplexity API');
    }

    const data: PerplexityResponse = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error in sendMessage:", error);
    return "Sorry, there was an error processing your request. Please check your API key and try again.";
  }
}