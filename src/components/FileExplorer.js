import React from "react";

const FileExplorer = () => {
  const openRightPanelFile = (fileName) => {
    document.getElementById(
      "right-panel-container"
    ).innerHTML = `<div>${fileName}</div>`;
  };

  return (
    <div id="files">
      <ul>
        {["cert1", "cert2", "skill1", "skill2", "readme"].map((file) => (
          <li key={file} onClick={() => openRightPanelFile(file)}>
            {file}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileExplorer;
