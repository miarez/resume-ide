// Tooltip handling
// const tooltip = document.getElementById("tooltip");

// const showTooltip = (event, content) => {
//   tooltip.style.display = "block";
//   tooltip.style.left = `${event.pageX + 10}px`;
//   tooltip.style.top = `${event.pageY + 10}px`;
//   tooltip.innerText = content;
// };

// const hideTooltip = () => {
//   tooltip.style.display = "none";
// };

// const handleMouseMove = (e) => {
//   const position = editor.renderer.screenToTextCoordinates(
//     e.clientX,
//     e.clientY
//   );
//   const token = editor.session?.getTokenAt(position.row, position.column);

//   if (token) {
//     switch (token.type) {
//       case "special_words":
//         showTooltip(e, `Special Word: ${token.value}`);
//         break;
//       case "keyword.control":
//         showTooltip(e, `Keyword: ${token.value}`);
//         break;
//       case "support.function":
//         showTooltip(e, `Function: ${token.value}`);
//         break;
//       default:
//         hideTooltip();
//     }
//   } else {
//     hideTooltip();
//   }
// };

// editor.container.addEventListener("mousemove", handleMouseMove);
// editor.container.addEventListener("mouseleave", hideTooltip);

// return () => {
//   editor.container.removeEventListener("mousemove", handleMouseMove);
//   editor.container.removeEventListener("mouseleave", hideTooltip);
//   editor.destroy();
// };
