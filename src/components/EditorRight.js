import React, { useEffect, useRef } from "react";
import "ace-builds/src-min-noconflict/ace";
import "ace-builds/src-min-noconflict/theme-dracula";
import "ace-builds/src-min-noconflict/mode-text";
import highlightRules from "../data/highlight-rules.json";
import "../styles/highlight-rules.css";
import ReadMe from "./ReadMe";

const EditorRight = ({ content, fileName }) => {
  const editorRef = useRef(null);
  const isReadme = fileName?.toLowerCase().includes("readme");

  useEffect(() => {
    if (isReadme) return; // Skip Ace editor initialization for README files

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

    const editor = ace.edit("editor-right");
    editor.setTheme("ace/theme/resume_custom");
    editor.session.setMode("ace/mode/resume");
    editor.setShowPrintMargin(false);
    editor.setOption("tabSize", 1);
    editor.setFontSize(15);
    editor.setReadOnly(true);
    editor.renderer.setPadding(0);
    editor.renderer.setScrollMargin(0, 0, 0, 0);
    editor.setOption("enableAutoIndent", false);
    editor.setValue(content || "", 1);
    editor.clearSelection();
    editorRef.current = editor;

    return () => {
      editor.destroy(); // Clean up editor instance on unmount
    };
  }, [content, isReadme]); // Added isReadme to dependencies

  if (isReadme) {
    return <ReadMe content={content}></ReadMe>;
  }

  return <div id="editor-right" className="editor"></div>;
};

export default EditorRight;
