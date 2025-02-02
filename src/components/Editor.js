import React, { useEffect, useRef } from "react";
import "ace-builds/src-min-noconflict/ace";
import "ace-builds/src-min-noconflict/theme-dracula";
import "ace-builds/src-min-noconflict/mode-text";
import highlightRules from "../data/highlight-rules.json";
import "../styles/highlight-rules.css";
import resumeContent from "../data/resumeContent";

const Editor = ({ onNamespaceQualifierClick }) => {
  const editorRef = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
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
    editor.setOption("tabSize", 1);
    editor.setFontSize(15);
    editor.setReadOnly(true);
    editor.renderer.setPadding(0);
    editor.renderer.setScrollMargin(0, 0, 0, 0);
    editor.setOption("enableAutoIndent", false);
    editor.setValue(resumeContent, 1);

    editor.clearSelection();

    editor.container.addEventListener("click", handleClick);

    // Store the editor instance in the ref
    editorRef.current = editor;

    return () => {
      // Clean up event listeners on unmount
      editor.container.removeEventListener("click", handleClick);
    };
  }, []);

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
        case "namespace.qualifier":
          console.log(`Qualifier: ${token.value}`);
          // Call the handler for namespace qualifiers
          onNamespaceQualifierClick(token.value.toLowerCase());
          break;
      }
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
