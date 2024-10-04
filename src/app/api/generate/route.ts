import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 500,
        temperature: 0.5,
        n: 1,
        stop: null,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const code = response.data.choices[0].text.trim();
    return NextResponse.json({ code });
  } catch (error: any) {
    console.error(error.response ? error.response.data : error.message);
    return NextResponse.json({ message: 'Error generating code' }, { status: 500 });
  }
}