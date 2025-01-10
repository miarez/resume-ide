import React, { useEffect, useRef } from "react";
import "ace-builds/src-min-noconflict/ace";
import "ace-builds/src-min-noconflict/theme-dracula";
import "ace-builds/src-min-noconflict/mode-text"; // Replace with your custom mode
import highlightRules from "../data/HighlightRules.json";
import "../styles/Editor.css";
import "../styles/highlight-rules.css";
import resumeContent from "../data/resumeContent";

const Editor = () => {
  const editorRef = useRef(null); // Reference to store the editor instance
  const tooltipRef = useRef(null); // Reference to the tooltip element

  useEffect(() => {
    console.log("RENDERING");

    const ace = require("ace-builds/src-min-noconflict/ace");

    // Define the highlighting rules
    ace.define(
      "ace/mode/resume_highlight_rules",
      [
        "require",
        "exports",
        "module",
        "ace/lib/oop",
        "ace/mode/text_highlight_rules",
      ],
      function (require, exports, module) {
        var oop = require("ace/lib/oop");
        var TextHighlightRules =
          require("ace/mode/text_highlight_rules").TextHighlightRules;

        var ResumeHighlightRules = function () {
          this.$rules = highlightRules;
        };

        oop.inherits(ResumeHighlightRules, TextHighlightRules);
        exports.ResumeHighlightRules = ResumeHighlightRules;
      }
    );

    // Define custom theme
    ace.define(
      "ace/theme/resume_custom",
      ["require", "exports", "module", "ace/lib/dom"],
      function (require, exports, module) {
        exports.isDark = true;
        exports.cssClass = "ace-resume-custom";
      }
    );

    // Define the mode
    ace.define(
      "ace/mode/resume",
      [
        "require",
        "exports",
        "module",
        "ace/lib/oop",
        "ace/mode/text",
        "ace/mode/resume_highlight_rules",
      ],
      function (require, exports, module) {
        var oop = require("ace/lib/oop");
        var TextMode = require("ace/mode/text").Mode;
        var ResumeHighlightRules =
          require("ace/mode/resume_highlight_rules").ResumeHighlightRules;

        var Mode = function () {
          this.HighlightRules = ResumeHighlightRules;
        };
        oop.inherits(Mode, TextMode);

        exports.Mode = Mode;
      }
    );

    const editor = ace.edit("editor");
    editor.setTheme("ace/theme/resume_custom");
    editor.session.setMode("ace/mode/resume");
    editor.setShowPrintMargin(false);
    editor.setOption("tabSize", 2);
    editor.setFontSize(15);
    editor.setReadOnly(true);
    editor.setValue(resumeContent, 1);
    editor.clearSelection();

    editor.container.addEventListener("click", handleClick);
    editor.container.addEventListener("mousemove", handleMouseMove);
    editor.container.addEventListener("mouseleave", hideTooltip);

    // Store the editor instance in the ref
    editorRef.current = editor;

    return () => {
      // Clean up event listeners on unmount
      editor.container.removeEventListener("click", handleClick);
      editor.container.removeEventListener("mousemove", handleMouseMove);
      editor.container.removeEventListener("mouseleave", hideTooltip);
    };
  }, []);

  const showTooltip = (event, content) => {
    const tooltip = document.getElementById("tooltip"); // Get the global tooltip element
    if (tooltip) {
      tooltip.style.display = "block";
      tooltip.style.left = `${event.pageX + 10}px`;
      tooltip.style.top = `${event.pageY + 10}px`;
      tooltip.innerText = content;
    }
  };

  const hideTooltip = () => {
    const tooltip = document.getElementById("tooltip"); // Get the global tooltip element
    if (tooltip) {
      tooltip.style.display = "none";
    }
  };

  const handleMouseMove = (e) => {
    console.log("moving mouse");
    const editor = editorRef.current;
    if (!editor) return;

    const position = editor.renderer.screenToTextCoordinates(
      e.clientX,
      e.clientY
    );
    const token = editor.session?.getTokenAt(position.row, position.column);

    if (token) {
      switch (token.type) {
        case "special_words":
          showTooltip(e, `Special Word: ${token.value}`);
          break;
        case "keyword.control":
          console.log("hovering over", `Keyword: ${token.value}`);
          showTooltip(e, `Keyword: ${token.value}`);
          break;
        case "support.function":
          showTooltip(e, `Function: ${token.value}`);
          break;
        default:
          hideTooltip();
      }
    } else {
      hideTooltip();
    }
  };

  const handleClick = (e) => {
    const editor = editorRef.current;
    if (!editor) return;

    const position = editor.renderer.screenToTextCoordinates(
      e.clientX,
      e.clientY
    );
    const token = editor.session?.getTokenAt(position.row, position.column);

    if (token) {
      switch (token.type) {
        case "special_words":
          console.log(`Special Word: ${token.value}`);
          break;
        case "keyword.control":
          console.log(`Keyword: ${token.value}`);
          break;
        case "support.function":
          console.log(`Function: ${token.value}`);
          break;
      }
    } else {
      hideTooltip();
    }
  };

  return (
    <>
      <div id="editor" className="editor"></div>
      <div id="tooltip" ref={tooltipRef} className="tooltip"></div>
    </>
  );
};

export default Editor;
