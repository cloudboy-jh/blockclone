import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    // Create a temporary Git repository with the generated code
    // and push it to Vercel for deployment.

    // Note: Vercel's API typically requires a Git repository for deployments.
    // Direct file uploads might not be supported as seamlessly.
    // For a streamlined experience, consider integrating with GitHub or using
    // Vercel's CLI for more advanced deployments.

    // Here's a simplified example assuming Vercel's API can accept direct code.

    const response = await axios.post(
      'https://api.vercel.com/v13/deployments',
      {
        name: `ai-generated-deployment-${Date.now()}`,
        files: {
          'index.js': {
            content: code,
          },
        },
        // Additional configuration can be added here as needed
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.VERCEL_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return NextResponse.json({ deploymentUrl: response.data.url });
  } catch (error: any) {
    console.error(error.response ? error.response.data : error.message);
    return NextResponse.json({ message: 'Error deploying code' }, { status: 500 });
  }
}