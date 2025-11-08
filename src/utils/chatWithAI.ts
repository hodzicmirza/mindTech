export const chatWithAI = async (
  message: string, 
  model: string = "openrouter/polaris-alpha"
): Promise<string> => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "MindTech App",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": model,
        "messages": [
          {
            "role": "user",
            "content": message
          }
        ],
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      return data.choices[0].message.content;
    } else {
      throw new Error('Invalid response format from AI');
    }
    
  } catch (error) {
    console.error('OpenRouter API error:', error);
    throw error;
  }
};