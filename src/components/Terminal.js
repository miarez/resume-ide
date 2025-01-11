import React, { useState, useRef, useEffect } from "react";

const Terminal = () => {
  const [commands, setCommands] = useState([]); // To store the history of commands and outputs
  const [input, setInput] = useState(""); // To store the current user input
  const cliRef = useRef(null); // Ref for the input field
  const terminalRef = useRef(null); // Ref for the terminal container

  // Process commands and return output
  const processCommand = (cmd) => {
    const lowerCmd = cmd.trim().toLowerCase();
    if (lowerCmd === "help") {
      return `
        Available Commands:
        help          - Display the list of available commands
        get-email     - Get email to contact Stas about employment
        book-meeting  - Visit this link to book a meeting with Stas
        clear         - Clear the terminal
      `;
    } else if (lowerCmd === "get-email") {
      return "Email: hi@stas.website";
    } else if (lowerCmd === "book-meeting") {
      return "Visit: https://stas.website/meeting to book a meeting.";
    } else if (lowerCmd === "clear") {
      setCommands([]); // Clear the terminal
      return ""; // Return empty output
    } else if (lowerCmd === "") {
      return ""; // Empty command, no output
    } else {
      return `Command not found: ${cmd}`;
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const output = processCommand(input);
      if (input.trim().toLowerCase() !== "clear") {
        setCommands((prev) => [
          ...prev,
          {
            command: input,
            output,
          },
        ]);
      }
      setInput(""); // Clear input for the next command
    }
  };

  // Handle terminal click to focus input
  const handleClick = () => {
    if (cliRef.current) {
      cliRef.current.focus();
    }
  };

  // Automatically scroll to the bottom of the terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands]);

  // Run "help" command on initial load
  useEffect(() => {
    setCommands([
      {
        command: "",
        output: processCommand("help"),
      },
    ]);
  }, []);

  return (
    <div id="terminal" ref={terminalRef} onClick={handleClick}>
      {commands.map((entry, index) => (
        <div key={index}>
          <div className="prompt">
            <span id="host">employer@stas-resume-ide-Z53-X5I</span>:
            <span id="dir">~/stas.website/resume-ide</span>$ {entry.command}
          </div>
          <div className="output">{entry.output}</div>
        </div>
      ))}
      <div className="prompt">
        <span id="host">employer@stas-resume-ide-Z53-X5I</span>:
        <span id="dir">~/stas.website/resume-ide</span>$&nbsp;
        <input
          id="cli"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          ref={cliRef}
          autoFocus
        />
      </div>
    </div>
  );
};

export default Terminal;
