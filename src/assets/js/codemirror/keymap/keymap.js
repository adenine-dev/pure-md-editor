const keymaps = [
  {
    action: (cm) => {
      let selection = cm.getSelection(),
          innerText = selection.slice(0, 2) === '**' && selection.slice(-2) === '**';
      cm.replaceSelection(innerText ? selection.slice(2, -2) : '**' + selection + '**', 'around');
    },
    name: "Ctrl-B",
    description: "toggles bold"
  },
  {
    action: (cm) => {
      console.log(cm)
      let selection = cm.getSelection(),
          innerText = selection.slice(0, 1) === '*' && selection.slice(-1) === '*';
      cm.replaceSelection(innerText ? selection.slice(1, -1) : '*' + selection + '*', 'around');
    },
    name: "Ctrl-I",
    description: "toggles italics"
  }
]

export default keymaps
