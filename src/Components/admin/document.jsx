import React, { useState } from "react";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const DocumentUploadForm = ({ onSubmit }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
      const uniqueFileName = `${Date.now()}_${file.name}`;
      const storageRef = ref(storage, `documents/${uniqueFileName}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      const newDocument = {
        title,
        description,
        fileUrl: downloadURL,
        fileName: file.name,
        uploadDate: new Date().toISOString(),
      };

      onSubmit(newDocument);
      setFile(null);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error uploading document:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          rows="3"
        ></textarea>
      </div>
      <div
        className="mb-4 p-4 border-2 border-dashed border-gray-300 rounded-md"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
        />
        <label htmlFor="fileInput" className="cursor-pointer block text-center">
          {file ? file.name : "Click to upload or drag and drop a file"}
        </label>
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Upload Document
      </button>
    </form>
  );
};

export const DocumentList = ({ documents }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Uploaded Documents</h3>
      <ul className="space-y-4">
        {documents.map((doc) => (
          <li key={doc.id} className="bg-white p-4 rounded-md shadow">
            <h4 className="text-lg font-medium">{doc.title}</h4>
            <p className="text-gray-600">{doc.description}</p>
            <a
              href={doc.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Download {doc.fileName}
            </a>
            <p className="text-sm text-gray-500 mt-2">
              Uploaded on: {new Date(doc.uploadDate).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
