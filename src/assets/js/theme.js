import style from "../style/style.json"

const themes = style.themes
const breakpoints = {}
for(var bp in style.breakpoints) {
  if(style.breakpoints.hasOwnProperty(bp)) {
    breakpoints[bp] = "@media only screen and (max-width : " + style.breakpoints[bp] + ")";
  }
}
console.log(breakpoints)

export { themes, breakpoints }
