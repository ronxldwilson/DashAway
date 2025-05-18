function removeEmDashes(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    node.data = node.data.replace(/—/g, ' ');
  } else if (node.shadowRoot) {
    removeEmDashes(node.shadowRoot);
  } else {
    for (let child of node.childNodes) {
      removeEmDashes(child);
    }
  }
}

function cleanPage() {
  removeEmDashes(document.body);
}

cleanPage();

// Handle dynamic content changes
const observer = new MutationObserver(mutations => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
        setTimeout(() => removeEmDashes(node), 50);
      }
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
