import React, { useEffect } from "react";
import ace from "ace-builds/src-noconflict/ace"; // Import ace
import "ace-builds/src-noconflict/mode-text"; // Base mode
import "ace-builds/src-noconflict/theme-dracula"; // Theme
import resumeContent from "../data/resumeContent";
import "../styles/Editor.css";

const Editor = () => {
  useEffect(() => {
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
        const oop = ace.require("ace/lib/oop");
        const TextHighlightRules = ace.require(
          "ace/mode/text_highlight_rules"
        ).TextHighlightRules;

        const ResumeHighlightRules = function () {
          this.$rules = {
            start: [
              {
                token: "special_words",
                regex: "\\b(meow|woof|quack|oink)\\b",
              },
              // ... Other rules ...
            ],
          };
        };

        oop.inherits(ResumeHighlightRules, TextHighlightRules);
        exports.ResumeHighlightRules = ResumeHighlightRules;
      }
    );

    // Define the custom mode
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
        const oop = ace.require("ace/lib/oop");
        const TextMode = ace.require("ace/mode/text").Mode;
        const ResumeHighlightRules = ace.require(
          "ace/mode/resume_highlight_rules"
        ).ResumeHighlightRules;

        const Mode = function () {
          this.HighlightRules = ResumeHighlightRules;
        };

        oop.inherits(Mode, TextMode);
        exports.Mode = Mode;
      }
    );

    // Initialize the editor
    const editor = ace.edit("editor");
    editor.setTheme("ace/theme/dracula");
    editor.session.setMode("ace/mode/resume");
    editor.setShowPrintMargin(false);
    editor.setOption("tabSize", 2);
    editor.setFontSize(15);
    editor.setReadOnly(true);

    // Ensure editor is initialized before setting the value
    editor.setValue(resumeContent, 1); // `1` moves the cursor to the start
    editor.clearSelection();

    // Tooltip handling
    const tooltip = document.getElementById("tooltip");

    const showTooltip = (event, content) => {
      tooltip.style.display = "block";
      tooltip.style.left = `${event.pageX + 10}px`;
      tooltip.style.top = `${event.pageY + 10}px`;
      tooltip.innerText = content;
    };

    const hideTooltip = () => {
      tooltip.style.display = "none";
    };

    const handleMouseMove = (e) => {
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

    editor.container.addEventListener("mousemove", handleMouseMove);
    editor.container.addEventListener("mouseleave", hideTooltip);

    // Cleanup to prevent memory leaks
    return () => {
      editor.container.removeEventListener("mousemove", handleMouseMove);
      editor.container.removeEventListener("mouseleave", hideTooltip);
      editor.destroy();
    };
  }, []);

  return (
    <>
      <div id="editor" style={{ height: "100%", width: "100%" }}></div>
      <div id="tooltip" style={{ position: "absolute", display: "none" }}></div>
    </>
  );
};

export default Editor;
