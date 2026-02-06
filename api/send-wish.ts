import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // Set CORS headers for Vercel
  response.setHeader('Access-Control-Allow-Credentials', 'true');
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (request.method === 'OPTIONS') {
    response.status(200).end();
    return;
  }

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, message, subject } = request.body;

    if (!name || !email || !message) {
      return response.status(400).json({ error: 'Missing required fields' });
    }

    // Forward the request to FormSubmit to maintain email functionality
    // This acts as a proxy/backend handler as requested
    const formSubmitResponse = await fetch("https://formsubmit.co/ajax/zuyairiaislam5@gmail.com", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject: subject || `Birthday Wish from ${name}`,
        _captcha: "false",
        _template: "table"
      })
    });

    if (!formSubmitResponse.ok) {
      const errorText = await formSubmitResponse.text();
      console.error('FormSubmit error:', errorText);
      throw new Error('Failed to forward wish to email service');
    }

    // Backend processing logic logged
    console.log('Wish processed and forwarded by Vercel backend:', { name, email });

    // Success response
    return response.status(200).json({
      success: true,
      message: 'Wish successfully processed and sent by Vercel Backend!'
    });
  } catch (error) {
    console.error('Backend error:', error);
    return response.status(500).json({ error: 'Internal server error' });
  }
}
