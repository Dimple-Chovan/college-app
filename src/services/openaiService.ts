import OpenAI from 'openai';
import { OPENAI_API_KEY } from '../constants/apiKeys';

/**
 * Send a message to OpenAI and get a response
 * @param message The user's message
 * @returns The AI's response
 */
export const getAIResponse = async (message: string): Promise<string> => {
  console.log('Getting AI response for message:', message);
  
  // For simple testing, return a mock response for queries containing 'test'
  if (message.toLowerCase().includes('test')) {
    console.log('Using mock response for test query');
    return 'This is a mock response for testing purposes. The OpenAI API integration is currently being debugged.';
  }
  
  try {
    console.log('Creating OpenAI client...');
    // Create a new OpenAI client for each request to avoid initialization issues
    const openai = new OpenAI({
      apiKey: OPENAI_API_KEY.trim(),
      dangerouslyAllowBrowser: true // Required for client-side usage
    });
    
    console.log('Making API call to OpenAI...');
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant for a college application portal. Provide concise responses about application processes, requirements, and deadlines. If the query is unrelated to college applications, respond with "Sorry. This query is out of scope of the application."'
        },
        {
          role: 'user',
          content: message
        }
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    console.log('OpenAI API response received');
    return response.choices[0]?.message?.content || 'Sorry, I could not generate a response at this time.';
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    
    // Provide a more specific error message based on the error
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      if (error.message.includes('API key')) {
        return 'Error: There seems to be an issue with the API key. Please check the console for more details.';
      } else if (error.message.includes('network')) {
        return 'Error: There was a network issue when connecting to the OpenAI API. Please check your internet connection.';
      }
    }
    
    return 'Sorry, there was an error processing your request. Please try again later.';
  }
};
