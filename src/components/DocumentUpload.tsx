import React, { useState } from 'react';

const DocumentUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4">
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload" className="cursor-pointer">
        <div className="flex flex-col items-center justify-center">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16V4a1 1 0 011-1h8a1 1 0 011 1v12m-4 4h-4m4 0a1 1 0 001-1v-4m-6 4a1 1 0 01-1-1v-4m0 0H5m6 0h4"
            ></path>
          </svg>
          <span className="mt-2 text-sm text-gray-600">Click to upload a PDF</span>
        </div>
      </label>
      {file && (
        <div className="mt-4 text-sm text-gray-600">
          <span>Selected file: {file.name}</span>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;