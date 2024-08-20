'use client'; // Make sure this is a client-side component

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from '@/components/ui/use-toast';
import { Loader2, UploadCloud } from "lucide-react"; // Import the icons

export default function ValidateDataset() {
  const { toast } = useToast();
  const [selectedType, setSelectedType] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFile(file);
  };

  const handleUpload = async () => {
    if (!file || !selectedType) {
      toast({
        title: "Error",
        description: "Please select a type and upload a file.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Simulate file upload
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "Upload Successful!",
        description: `File '${file.name}' was uploaded successfully.`,
        variant: "success",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Upload Failed!",
        description: "An unknown error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col p-12 bg-black text-white">
      <div className="max-w-3xl mx-auto p-8 bg-gray-900 shadow-xl rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Validate Dataset</h1>

        {/* Type Dropdown */}
        <div className="mb-6">
          <label htmlFor="type" className="block text-lg font-medium mb-3">Select Type</label>
          <select
            id="type"
            value={selectedType}
            onChange={handleTypeChange}
            className="block w-full px-4 py-3 border border-gray-700 bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a type...</option>
            <option value="type1">Type 1</option>
            <option value="type2">Type 2</option>
            <option value="type3">Type 3</option>
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

        {/* Upload Button */}
        <div className="text-center">
          <Button
            disabled={!file || !selectedType}
            onClick={handleUpload}
            className="flex items-center justify-center"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" aria-hidden="true" />
                Uploading...
              </>
            ) : (
              <>
                <UploadCloud className="w-5 h-5 mr-2" aria-hidden="true" />
                Upload
              </>
            )}
          </Button>
        </div>
      </div>
    </main>
  );
}
