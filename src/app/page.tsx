'use client';

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [deploying, setDeploying] = useState(false);
  const [deployStatus, setDeployStatus] = useState('');

  const handleGenerate = async () => {
    try {
      const response = await axios.post('/api/generate', { prompt });
      setGeneratedCode(response.data.code);
    } catch (error) {
      console.error(error);
      alert('Error generating code.');
    }
  };

  const handleDeploy = async () => {
    setDeploying(true);
    setDeployStatus('');
    try {
      const response = await axios.post('/api/deploy', { code: generatedCode });
      setDeployStatus(`Deployment successful! URL: ${response.data.deploymentUrl}`);
    } catch (error) {
      console.error(error);
      setDeployStatus('Deployment failed.');
    } finally {
      setDeploying(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>AI Code Generator & Deployer</h1>
      <textarea
        rows={4}
        cols={50}
        placeholder="Enter your code prompt here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: '100%', padding: '0.5rem' }}
      />
      <br />
      <button onClick={handleGenerate} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
        Generate Code
      </button>
      {generatedCode && (
        <>
          <h2>Generated Code:</h2>
          <pre style={{ background: '#f4f4f4', padding: '1rem', whiteSpace: 'pre-wrap' }}>
            {generatedCode}
          </pre>
          <button
            onClick={handleDeploy}
            disabled={deploying}
            style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
          >
            {deploying ? 'Deploying...' : 'Deploy to Vercel'}
          </button>
          {deployStatus && <p>{deployStatus}</p>}
        </>
      )}
    </div>
  );
}