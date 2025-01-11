import React, { useState, useEffect } from "react";
import enums from "../data/enums.json";

const FileExplorer = () => {
  const [activeFile, setActiveFile] = useState("README"); // Set README as default active file

  useEffect(() => {
    document.getElementById(
      "right-panel-container"
    ).innerHTML = `<div>README</div>`;
  }, []);

  const openRightPanelFile = (fileName) => {
    setActiveFile(fileName);
    document.getElementById(
      "right-panel-container"
    ).innerHTML = `<div>${fileName}</div>`;
  };

  const renderFileTree = (data) => {
    const directories = Object.entries(data).map(([category, files]) => (
      <ul key={category}>
        <li className="category">{category}</li>
        {files.map((file) => (
          <li
            key={file}
            className={`file ${activeFile === file ? "active" : ""}`}
            onClick={() => openRightPanelFile(file)}
          >
            {file}
          </li>
        ))}
      </ul>
    ));

    return (
      <>
        <ul>
          <li
            key="README"
            className={`file ${activeFile === "README" ? "active" : ""}`}
            onClick={() => openRightPanelFile("README")}
          >
            README
          </li>
        </ul>
        {directories}
      </>
    );
  };

  return <div id="files">{renderFileTree(enums)}</div>;
};

export default FileExplorer;
