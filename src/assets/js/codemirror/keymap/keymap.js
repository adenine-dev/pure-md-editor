import api from "../../api.js"

const keymaps = [
  {
    name: "Ctrl-B",
    description: "toggles bold",
    cm: true,
    toolbar: true,
    icon: "format_bold",
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
  },
  {
    name: "Ctrl-I",
    description: "toggles italics",
    cm: true,
    toolbar: true,
    icon: "format_italic",
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
  },
  {
    name: "Ctrl-U",
    description: "toggles underline",
    cm: true,
    toolbar: true,
    icon: "format_underlined",
    action: (cm) => {
      let selection = cm.getSelection(),
          curActive = selection.slice(0, 2) === '__' && selection.slice(-2) === '__';
      cm.replaceSelection(curActive ? selection.slice(2, -2) : '__' + selection + '__', 'around');
      if(selection.length === 0) {
        cm.setCursor({
          line: cm.getCursor().line,
          ch: cm.getCursor().ch - 2
        })
      }
    },
  },
  {
    name: "ctrl+s",
    description: "saves the document",
    cm: false,
    toolbar: true,
    icon: "save",
    action: (cm, state, that, e, c) => {
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }
      api.setProject(state.project.name, state.project)
      that.setState({notification: {
        value: "the project was saved",
        show: true,
        name: "success"
      }})
      return false;
    }
  }
]

export default keymaps
