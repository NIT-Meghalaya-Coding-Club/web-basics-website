"use client";

import { useState } from "react";
import CodeEditor from "./CodeEditor";

type Language = "html" | "css" | "javascript";

export default function WebCodeEditor() {
  const [activeTab, setActiveTab] = useState<Language>("html");

  const [code, setCode] = useState({
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
  });

  const handleChange = (value: string) => {
    setCode((previous) => ({
      ...previous,
      [activeTab]: value,
    }));
  };

  return (
    <div className="flex h-[600px] flex-col overflow-hidden rounded-lg border border-gray-700 bg-[#282c34]">
      
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

      {/* Editor */}
      <div className="min-h-0 flex-1">
        <CodeEditor
          key={activeTab}
          value={code[activeTab]}
          language={activeTab}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}