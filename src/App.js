import React from "react";
import FileExplorer from "./components/FileExplorer";
import Editor from "./components/Editor";
// import Tooltip from "./components/Tooltip";
import RightPanel from "./components/RightPanel";
import Terminal from "./components/Terminal";
import "./styles/App.css";

const App = () => {
  return (
    <div className="app">
      <div id="tooltip" className="tooltip"></div>
      <div id="top-menu">Top Menu</div>
      <FileExplorer />
      <Editor />
      <RightPanel />
      <Terminal />
    </div>
  );
};

export default App;
