const adjectives = ["unprecedented", "gay", "draconian", "elderly", "erect", "fertile", "hellish", "hospitable", "jolly", "knowledgeable", "needy", "noxious", "obscene", "organic", "horny", "petite", "periodic", "prickly", "puny", "rambunctious", "rare", "ruthless", "scientific", "skillful", "squeamish", "sulky", "talented", "tangy", "unsightly", "vacuous", "voiceless", "yummy" ]
const nouns = ["zoology", "aluminium", "anethesiologist", "appendix", "bacon", "yogurt", "xylophone", "windshield", "aftermath", "airplane", "vulture", "vegetarian", "typhoon", "midwife", "supermarket", "squirrel", "squirrel", "rugby", "lasagna", "equipment", "diploma", "dedication", "customer", "cocktail", "chimpanzee", "mudkip", "crab", "canadian", "bra", "blizzard", "gay", "aardvark"]

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
    const newProjectName = () => {
      let adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
      let noun = nouns[Math.floor(Math.random() * nouns.length)]
      let name = adjective + " " + noun

      // TODO: don't make this loop forever
      while(api.getProject(name)) {
        adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
        noun = nouns[Math.floor(Math.random() * nouns.length)]
        name = adjective + " " + noun
      }
      return name
    }

    let name = newName || newProjectName()
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
      countType: "words",
      fadeFormatting: true,
      wrapLine: true,
      showToolbar: true,
      tabSize: 2,
      lineHeight: "1.6",
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

  },

  // Putting this here because there aren't really enough of these to have a full util.js and i am lazy
  // TODO: don't be lazy
  isMobile: () => {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  }
}

window.ipa = api

export default api
