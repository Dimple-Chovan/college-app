import React, { useState } from 'react';
import { getAIResponse } from '../services/openaiService';

const OpenAITest: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTest = async () => {
    setLoading(true);
    setError('');
    setResponse('');
    
    try {
      console.log('Testing OpenAI API with query:', query);
      const result = await getAIResponse(query);
      console.log('OpenAI API test result:', result);
      setResponse(result);
    } catch (err) {
      console.error('Error in OpenAI test:', err);
      setError('Error: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded shadow-sm max-w-lg mx-auto my-8">
      <h2 className="text-xl font-bold mb-4">OpenAI API Test</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Test Query
        </label>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter a test query"
        />
      </div>
      
      <button
        onClick={handleTest}
        disabled={loading || !query.trim()}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
      >
        {loading ? 'Testing...' : 'Test OpenAI API'}
      </button>
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {response && (
        <div className="mt-4">
          <h3 className="font-medium mb-2">Response:</h3>
          <div className="p-3 bg-gray-100 border rounded">
            {response}
          </div>
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-500">
        <p>Check the browser console for detailed logs.</p>
      </div>
    </div>
  );
};

export default OpenAITest;
