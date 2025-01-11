import React from "react";
import enums from "../data/enums.json"; // Your enum-content.js file
import {
  FaFolder,
  FaFileAlt,
  FaCode,
  FaDatabase,
  FaChartBar,
  FaCogs,
  FaUser,
  FaProjectDiagram,
  FaCertificate,
  FaStickyNote,
} from "react-icons/fa"; // Import icons from react-icons

const FileExplorer = ({ onFileClick, activeFile }) => {
  const getIconForCategory = (category) => {
    switch (category) {
      case "skills":
        return <FaCode className="icon" />;
      case "tools":
        return <FaCogs className="icon" />;
      case "certifications":
        return <FaCertificate className="icon" />;
      case "about-me":
        return <FaUser className="icon" />;
      default:
        return <FaFolder className="icon" />;
    }
  };

  const getIconForFile = (file) => {
    switch (file) {
      case "README":
        return <FaStickyNote className="icon" />;
      case "code":
        return <FaCode className="icon" />;
      case "data":
        return <FaDatabase className="icon" />;
      case "product":
        return <FaChartBar className="icon" />;
      case "lang":
        return <FaCode className="icon" />;
      case "lib":
        return <FaProjectDiagram className="icon" />;
      case "db":
        return <FaDatabase className="icon" />;
      case "dataviz":
        return <FaChartBar className="icon" />;
      case "queue":
        return <FaCogs className="icon" />;
      case "google":
        return <FaCertificate className="icon" />;
      case "company":
      case "title":
      case "project":
        return <FaUser className="icon" />;
      default:
        return <FaFileAlt className="icon" />;
    }
  };

  const renderFileTree = (data) => {
    const directories = Object.entries(data).map(([category, files]) => (
      <ul key={category}>
        <li className="category">
          {getIconForCategory(category)} {category}
        </li>
        {files.map((file) => (
          <li
            key={file}
            className={`file ${activeFile === file ? "active" : ""}`}
            onClick={() => onFileClick(file)}
          >
            {getIconForFile(file)} {file}
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
            onClick={() => onFileClick("README")}
          >
            {getIconForFile("README")} README
          </li>
        </ul>
        {directories}
      </>
    );
  };

  return <div id="files">{renderFileTree(enums)}</div>;
};

export default FileExplorer;
