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
  }
}

window.ipa = api

export default api
