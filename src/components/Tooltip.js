import React, { useEffect } from "react";
import "../styles/Tooltip.css";

const Tooltip = () => {
  useEffect(() => {
    const tooltip = document.getElementById("tooltip");

    const showTooltip = (e, content) => {
      tooltip.style.display = "block";
      tooltip.style.left = `${e.pageX + 10}px`;
      tooltip.style.top = `${e.pageY + 10}px`;
      tooltip.innerText = content;
    };

    const hideTooltip = () => {
      tooltip.style.display = "none";
    };

    document.getElementById("editor").addEventListener("mousemove", (e) => {
      const token = null; // Replace with actual token logic
      if (token) {
        showTooltip(e, `Token: ${token}`);
      } else {
        hideTooltip();
      }
    });
  }, []);

  return <div id="tooltip" className="tooltip"></div>;
};

export default Tooltip;
