'use client'; // Ensure this is a client-side component

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from '@/components/ui/use-toast';
import { Loader2, UploadCloud } from "lucide-react";

// Define the endpoint URLs
const SCHEMAS_ENDPOINT = '/api/schemas'; 
const VALIDATE_ENDPOINT = '/api/validate'; 

// Fetch schema options from the endpoint
const fetchSchemas = async () => {
  const response = await fetch(SCHEMAS_ENDPOINT);
  if (!response.ok) {
    throw new Error('Failed to fetch schemas');
  }
  return response.json();
};

// Validate the file by sending it to the endpoint
const validateFile = async (file: File, schema: string) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('schema', schema);

  const response = await fetch(VALIDATE_ENDPOINT, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Validation failed');
  }
  return response.json();
};

export default function ValidateDataset() {
  const { toast } = useToast(); // Using useToast for notifications
  const [selectedSchema, setSelectedSchema] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [schemas, setSchemas] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    const getSchemas = async () => {
      try {
        const fetchedSchemas = await fetchSchemas();
        setSchemas(fetchedSchemas);
      } catch (error) {
        console.error("Failed to fetch schemas", error);
        toast({
          title: "Error",
          description: "Failed to fetch schema options.",
          variant: "destructive",
        });
      }
    };

    getSchemas();
  }, [toast]);

  const handleSchemaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSchema(event.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFile(file);
  };

  const handleValidate = async () => {
    if (!file || !selectedSchema) {
      toast({
        title: "Error",
        description: "Please select a schema and upload a file.",
        variant: "destructive",
      });
      return;
    }

    setIsValidating(true);

    try {
      const result = await validateFile(file, selectedSchema);

      toast({
        title: "Validation Successful!",
        description: `File '${file.name}' was validated successfully.`,
        variant: "success",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Validation Failed!",
        description: "An unknown error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col p-12 bg-black text-white">
      <div className="max-w-3xl mx-auto p-8 bg-gray-900 shadow-xl rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Validate Dataset</h1>

        {/* Schema Dropdown */}
        <div className="mb-6">
          <label htmlFor="schema" className="block text-lg font-medium mb-3">Select Schema</label>
          <select
            id="schema"
            value={selectedSchema}
            onChange={handleSchemaChange}
            className="block w-full px-4 py-3 border border-gray-700 bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a Schema...</option>
            {schemas.map((schema) => (
              <option key={schema.value} value={schema.value}>
                {schema.label}
              </option>
            ))}
          </select>
        </div>

        {/* File Upload Section */}
        <div className="mb-6">
          <label htmlFor="file" className="block text-lg font-medium mb-3">Upload CSV File</label>
          <input
            type="file"
            id="file"
            accept=".csv"
            onChange={handleFileChange}
            className="block w-full text-lg text-gray-300 bg-gray-800 file:py-3 file:px-5 file:border file:border-gray-700 file:bg-gray-800 file:text-gray-300 hover:file:bg-gray-700"
          />
        </div>

        {/* Validate Button */}
        <div className="text-center">
          <Button
            disabled={!file || !selectedSchema}
            onClick={handleValidate}
            className="flex items-center justify-center"
          >
            {isValidating ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" aria-hidden="true" />
                Validating...
              </>
            ) : (
              <>
                <UploadCloud className="w-5 h-5 mr-2" aria-hidden="true" />
                Validate
              </>
            )}
          </Button>
        </div>
      </div>
    </main>
  );
}
