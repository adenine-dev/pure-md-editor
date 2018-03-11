const theme = {
  themes: {
    "dark": {
      bg: "#222",
      color: "rgba(255,255,255,0.85)"
    },
    "light": {
      bg: "#fafafa",
      color: "rgba(0,0,0,0.85)"
    }
  },
  currentTheme: "",
  getTheme: () => {
    return (
      theme.currentTheme ||
      theme.setTheme(localStorage.getItem("theme")) ||
      theme.setTheme("dark")
    )
  },
  setTheme: (the) => {
    if(theme.themes[the]) {
      theme.currentTheme = the
      localStorage.setItem("theme", theme.currentTheme)
    }
    return theme.currentTheme;
  }
}

export default theme
