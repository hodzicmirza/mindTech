const API_KEY = import.meta.env.VITE_API_KEY;
console.log(API_KEY);

export const chatWithAI = async (
  message: string, 
  model: string = "openrouter/polaris-alpha"
): Promise<string> => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
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