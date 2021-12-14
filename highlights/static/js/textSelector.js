/**
 * This is the main highlighting function dependent on user selection of text.
 * - Whenever an "selection event" occurs in the `highlightable` text area, the #highlighter is hidden
 * - If the "selection event" results in a highlight selected, the #highlighter is made visible
 * - The `input` in a form is filled up with the highlight selected (this is set by `setHighlightInput`).
 * - The `input` is submitted when the user clicks on the button.
 * @returns
 */
document.onselectionchange = () => {
  disableHighlighting(); // disabled attributed added, form button hidden
  let textHighlighted = getSelectedText(highlightScope);
  if (!textHighlighted) return; // checks if highlight is allowed
  setHiddenInput(textHighlighted); // set the value on the hidden field of the form
  enableHighlighting(); // disabled attribute is removed, form button shown
};

/**
 * Capture only if selected is within the targetNode
 * @param {*} targetNode
 */
function allowCapture(targetNode) {
  let selectedContent = document.getSelection();
  if (targetNode.contains(selectedContent.anchorNode)) {
    return selectedContent;
  }
}

/**
 * Capture only if selected is within targeted
 * @param target the host of nodes which can be highlighted
 * @returns the string version of the DOM nodes highlighted
 */
function getSelectedText(target) {
  let selection = allowCapture(target);
  if (!selection) return;

  let holder = document.createElement("div");
  for (let i = 0; i < selection.rangeCount; i++) {
    el = selection.getRangeAt(i).cloneContents();
    holder.append(el);
  }

  let textHighlighted = holder.innerHTML.toString();
  if (!textHighlighted || textHighlighted == "") return;

  return textHighlighted;
}

function disableHighlighting() {
  console.log("initially prevent highlighting");
  footerContainer.setAttribute("hidden", true);
  highlightBtn.setAttribute("disabled", true);
}

function enableHighlighting() {
  console.log("highlighting allowed");
  footerContainer.className = ""; // show
  footerContainer.removeAttribute("hidden");
  highlightBtn.removeAttribute("disabled");
}

function setHiddenInput(text) {
  console.log(`hidden input field set: ${text}`);
  highlightInput.setAttribute("value", text); // set input
}