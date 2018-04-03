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
  setLocalProjects: (projects) => {
    localStorage.setItem("projects", JSON.stringify(projects || api.projects))
  },
  setProjects: (projects) => {
    api.projects = projects
    api.setLocalProjects()
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
    api.setLocalProjects()
    return project
  },
  deleteProject: (name) => {
    api.getProjects();
    if(api.projects[name]) {
      delete api.projects[name]
    }
    api.setLocalProjects()
  },
  getNewProject: (newName) => {
    // TODO: make this generate an unused project name better
    let name = newName || "new project" + Math.random();
    let projects = api.getProjects()
    let project = {
      name: name,
      value: ""
    }
    return api.setProject(name, project)
  },
  renameProject: (prevName, newName) => {
    if(newName !== "") {
      api.getProjects();
      api.projects[newName] = { ...api.projects[prevName] };
      api.projects[newName].name = newName;
      delete api.projects[prevName]
      api.setLocalProjects()
      return true
    } else {
      return false
    }
  },
  settings: {},
  initSettings: () => {
    const defaultSettings = {
      theme: "dark",
      fontSize: "24",
    }
    if(localStorage.getItem("settings")) {
      api.settings = { ...defaultSettings,
                       ...JSON.parse(localStorage.getItem("settings")) }
    } else {
      api.settings = defaultSettings
    }
    localStorage.setItem("settings", JSON.stringify(api.settings))
    return api.settings
  },
  getSettings: () => {
    if(Object.keys(api.settings).length !== 0) {
      return api.settings
    } else if(localStorage.getItem("settings")) {
      return api.setSettings(JSON.parse(localStorage.getItem("settings")))
    } else {
      return api.initSettings()
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
