import React, { useState } from 'react';
import {  } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Trash2, Upload } from 'lucide-react';

export default function FileManagement({ files, setProjectData }) {
  const [uploading, setUploading] = useState(false);

  const uploadFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploading(true);
      // Simulating file upload
      setTimeout(() => {
        setProjectData(prevData => ({
          ...prevData,
          files: [...prevData.files, { id: Date.now(), name: file.name, size: file.size, type: file.type }]
        }));
        setUploading(false);
      }, 1500);
    }
  };

  const deleteFile = (fileId) => {
    setProjectData(prevData => ({
      ...prevData,
      files: prevData.files.filter(file => file.id !== fileId)
    }));
  };

  return (
    <div className="bg-white dark:bg-indigo-950 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-indigo-900 dark:text-indigo-100 mb-4">File Management</h2>
        <div className="flex items-center space-x-2 mb-4">
          <Input type="file" onChange={uploadFile} disabled={uploading} />
          <Button disabled={uploading} className="bg-indigo-600 hover:bg-indigo-700 text-white">
            {uploading ? 'Uploading...' : <><Upload className="mr-2 h-4 w-4" /> Upload</>}
          </Button>
        </div>
        <div className="space-y-2">
          {files.map(file => (
            <div key={file.id} className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-800 rounded">
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>{file.name}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => deleteFile(file.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
    </div>
  );
}

