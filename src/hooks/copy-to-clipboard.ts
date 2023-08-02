export default function copyToClipboard(area: any) {
  if (!area) {
    console.error("area not found.");
    return;
  }

  const range = document.createRange();
  range.selectNodeContents(area);

  const selection = window.getSelection();
  if (!selection) {
    console.error("Selection not available.");
    return;
  }
  selection.removeAllRanges();
  selection.addRange(range);

  document.execCommand("copy");
}
