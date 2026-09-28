"use client";

import { useEffect, useState } from "react";
import CodeEditor from "./CodeEditor";

type Language = "html" | "css" | "javascript";

const defaultCode = {
  html: `<h1>Hello World</h1>
<p>Edit the code and see your changes.</p>`,

  css: `body {
  font-family: Arial, sans-serif;
  padding: 40px;
}

h1 {
  color: #2563eb;
}`,

  javascript: `console.log("Hello from JavaScript!");`,
};

const STORAGE_KEY = "web-code-editor";

export default function WebCodeEditor() {
  const [activeTab, setActiveTab] = useState<Language>("html");

  const [code, setCode] = useState(defaultCode);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedCode = localStorage.getItem(STORAGE_KEY); 
    
    if (savedCode) {
        try {
            setCode(JSON.parse(savedCode)); 
        } catch (error) {
            console.error("Failed to load saved code");
        }
    }

    setIsLoaded(true); 
  }, []); 

  const handleChange = (value: string) => {
    setCode((previous) => {
        const updatedCode = {
            ...previous, 
            [activeTab]: value
        }; 

        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCode)); 

        return updatedCode; 
    });
  };

  const previewDocument = `
<!DOCTYPE html>
<html>
<head>
  <style>
    ${code.css}
  </style>
</head>

<body>

  ${code.html}

  <script>
    ${code.javascript}
  </script>

</body>
</html>
`;

  return (
    <div className="flex h-[600px] overflow-hidden rounded-lg border border-gray-700">

      {/* LEFT - CODE EDITOR */}
      <div className="flex w-1/2 flex-col bg-[#282c34]">

        {/* Tabs */}
        <div className="flex border-b border-gray-700 bg-[#21252b]">
          {(["html", "css", "javascript"] as Language[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-sm font-medium transition ${
                activeTab === tab
                  ? "border-b-2 border-blue-500 bg-[#282c34] text-white"
                  : "text-gray-400 hover:bg-[#282c34] hover:text-white"
              }`}
            >
              {tab === "javascript" ? "JavaScript" : tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* CodeMirror */}
        <div className="min-h-0 flex-1">
            { isLoaded && (
                <CodeEditor
                    key={activeTab}
                    value={code[activeTab]}
                    language={activeTab}
                    onChange={handleChange}
                />
            )}
        </div>

      </div>

      {/* RIGHT - PREVIEW */}
      <div className="flex w-1/2 flex-col bg-white">

        <div className="border-b bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700">
          Preview
        </div>

        <iframe
          title="Live Preview"
          srcDoc={previewDocument}
          sandbox="allow-scripts"
          className="h-full w-full border-0"
        />

      </div>

    </div>
  );
}