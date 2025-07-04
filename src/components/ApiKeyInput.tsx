
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Key } from "lucide-react";

interface ApiKeyInputProps {
  onApiKeySubmit: (key: string) => void;
}

const ApiKeyInput = ({ onApiKeySubmit }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onApiKeySubmit(apiKey.trim());
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <Key className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-gray-900">Google Places API Key Required</h3>
          <p className="text-sm text-gray-600 mt-1">
            To display real Google Reviews, please enter your Google Places API key
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your Google Places API key"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <Button type="submit" className="w-full">
            Load Reviews
          </Button>
        </form>
        
        <p className="text-xs text-gray-500 mt-3">
          Get your API key from the{' '}
          <a 
            href="https://console.cloud.google.com/apis/credentials" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Google Cloud Console
          </a>
        </p>
      </CardContent>
    </Card>
  );
};

export default ApiKeyInput;
