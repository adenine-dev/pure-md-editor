const api = {
  projects: {},
  getProjects: () => {
    if(api.projects.length !== 0) {
      return api.projects
    } else if(localStorage.getItem("projects")) {
      return api.setProject(JSON.parse(localStorage.getItem("projects")))
    } else {
      return null
    }
  },
  setProjects: (projects) => {
    api.projects = projects
    localStorage.setItem("projects", JSON.stringify(projects))
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
  }
}

window.ipa = api

export default api
