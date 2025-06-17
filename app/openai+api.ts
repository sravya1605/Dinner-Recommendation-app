export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt, maxTokens = 150, temperature = 0.7 } = body;

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // You'll need to set your OpenAI API key as an environment variable
    const openaiApiKey = process.env.OPENAI_API_KEY;
    
    if (!openaiApiKey) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that generates creative and personalized date ideas for couples. Focus on unique, memorable experiences that match their preferences and budget.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: maxTokens,
        temperature: temperature,
      }),
    });

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json();
      return new Response(
        JSON.stringify({ 
          error: 'OpenAI API error',
          details: errorData 
        }),
        {
          status: openaiResponse.status,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const data = await openaiResponse.json();
    
    return new Response(
      JSON.stringify({
        success: true,
        response: data.choices[0]?.message?.content || 'No response generated',
        usage: data.usage
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

  } catch (error) {
    console.error('API Route Error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

// GET endpoint for testing the API route
export async function GET(request: Request) {
  return new Response(
    JSON.stringify({ 
      message: 'OpenAI API route is working',
      endpoints: {
        POST: '/openai - Generate date ideas using OpenAI'
      }
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}