const keymaps = [
  {
    action: (cm) => {
      let selection = cm.getSelection(),
          curActive = selection.slice(0, 2) === '**' && selection.slice(-2) === '**';
      cm.replaceSelection(curActive ? selection.slice(2, -2) : '**' + selection + '**', 'around');
      if(selection.length === 0) {
        cm.setCursor({
          line: cm.getCursor().line,
          ch: cm.getCursor().ch - 2
        })
      }
    },
    name: "Ctrl-B",
    description: "toggles bold",
    cm: true
  },
  {
    action: (cm) => {
      let selection = cm.getSelection(),
          innerText = selection.slice(0, 1) === '*' && selection.slice(-1) === '*';
      cm.replaceSelection(innerText ? selection.slice(1, -1) : '*' + selection + '*', 'around');
      if(selection.length === 0) {
        cm.setCursor({
          line: cm.getCursor().line,
          ch: cm.getCursor().ch - 1
        })
      }
    },
    name: "Ctrl-I",
    description: "toggles italics",
    cm: true
  }
]

export default keymaps
