import React from "react";
import fileExplorerGif from "../assets/readme-gifs/file-explorer.gif";
import editorQualifierGif from "../assets/readme-gifs/editor-qualifier.gif";
import terminalGif from "../assets/readme-gifs/terminal.gif";

const ReadMe = ({ content }) => {
  return (
    <div className="readme-content">
      <h1>How To Use Resume IDE</h1>

      <h2>Navigating the File Explorer</h2>
      <p>
        You can browse all skills, tools, qualifications and more through the
        file explorer.
      </p>
      <div className="readme-gif">
        <img src={fileExplorerGif} alt="File Explorer GIF" />
      </div>

      <h2>Interacting with the Code Editor</h2>
      <p>
        Click on skills, tools, or other elements to view additional details.
      </p>
      <div className="readme-gif">
        <img src={editorQualifierGif} alt="Editor Qualifier GIF" />
      </div>

      <h2>Terminal Command Line Interface</h2>
      <p>
        Run custom commands in the terminal to get contact details and other
        additional information.
      </p>
      <div className="readme-gif">
        <img src={terminalGif} alt="Terminal GIF" />
      </div>
    </div>
  );
};

export default ReadMe;
