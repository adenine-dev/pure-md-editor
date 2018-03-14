const api = {
  projects: {},
  getProjects: () => {
    if(Object.keys(api.projects).length !== 0) {
      return api.projects
    } else if(localStorage.getItem("projects")) {
      return api.setProjects(JSON.parse(localStorage.getItem("projects")))
    } else {
      return null
    }
  },
  setProjects: (projects) => {
    api.projects = projects
    localStorage.setItem("projects", JSON.stringify(projects))
    return projects
  },
  getProject: (name) => {
    if(api.getProjects()[name]) {
      return api.projects[name]
    } else {
      return null
    }
  },
  setProject: (name, project) => {
    api.getProjects();
    api.projects[name] = project;
    localStorage.setItem("projects", JSON.stringify(api.projects))
  },
  getNewProject: () => {
    return {
      name: "new project",
      value: ""
    }
  },
  renameProject: (prevName, newName) => {
    api.getProjects();
    api.projects[newName] = {...api.projects[prevName]};
    delete api.projects[prevName]
  },
  settings: {},
  initSettings: () => {
    if(localStorage.getItem("settings")) {
      api.settings = localStorage.getItem("settings")
    } else {
      api.settings = {
        theme: "dark"
      }
    }
  },
  getSettings: () => {
    if(Object.keys(api.settings).length !== 0) {
      return api.settings
    } else if(localStorage.getItem("settings")) {
      return api.setSettings(JSON.parse(localStorage.getItem("settings")))
    } else {
      return null
    }
  },
  setSettings: (settings) => {
    api.settings = settings
    localStorage.setItem("settings", JSON.stringify(settings))
    return settings
  },
  getSetting: (setting) => {
    return api.getSettings()[setting]
  },
  setSetting: (setting, val) => {
    api.getSettings();
    api.settings[setting] = val;
    localStorage.setItem("settings", JSON.stringify(api.settings))

  }

}

window.ipa = api

export default api
