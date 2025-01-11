import React, { useState, useEffect } from "react";
import FileExplorer from "./components/FileExplorer";
import Editor from "./components/Editor";
import EditorRight from "./components/EditorRight";
import Terminal from "./components/Terminal";
import enumContent from "./data/enum-content";
import "./styles/App.css";
import Navbar from "./components/Navbar";

const App = () => {
  const [currentFile, setCurrentFile] = useState("README");
  const [currentContent, setCurrentContent] = useState(enumContent["README"]);
  const [isMobile, setIsMobile] = useState(false);

  const setFileAndContent = (fileName) => {
    const fileContent =
      enumContent[fileName] || `Content for ${fileName} not found.`;
    setCurrentFile(fileName);
    setCurrentContent(fileContent);
  };

  useEffect(() => {
    // Set README as the initial file
    setFileAndContent("README");

    // Handle screen size detection
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // Detect screens smaller than 1024px
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup
    };
  }, []);

  const handleFileClick = (fileName) => {
    setFileAndContent(fileName);
  };

  const handleNamespaceQualifierClick = (fileName) => {
    setFileAndContent(fileName);
  };

  // Show mobile message if screen size is too small
  if (isMobile) {
    return (
      <div id="mobile-message">
        <h1>Resume IDE</h1>
        <p>Sorry, this site is only available on desktop right now.</p>
      </div>
    );
  }

  return (
    <div className="app">
      <div id="tooltip" className="tooltip"></div>
      <Navbar />
      <FileExplorer onFileClick={handleFileClick} activeFile={currentFile} />
      <Editor onNamespaceQualifierClick={handleNamespaceQualifierClick} />
      <EditorRight content={currentContent} fileName={currentFile} />
      <Terminal />
    </div>
  );
};

export default App;
