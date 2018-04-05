import CodeMirror from 'codemirror';
import { applyTextInput } from "codemirror/src/input/input.js"
import { operation } from "codemirror/src/display/operations.js"


const modInitialized = false;
const TEXT_MARKER_CLASS_NAME = "cm-text-in-composition";
const TEXT_MARKER_OPTIONS = {
  inclusiveLeft: true,
  inclusiveRight: true,
  className: TEXT_MARKER_CLASS_NAME
};
const PREFIX_LIST = ['webkit', 'moz', 'o'];

const capitalizeString = string => string.charAt(0).toUpperCase() + string.slice(1);

const getPrefixedPropertyName = function(propertyName) {
  const tempElem = document.createElement('div');

  if (tempElem.style[propertyName] != null) { return propertyName; }

  for (let prefix of Array.from(PREFIX_LIST)) {
    const prefixedPropertyName = prefix + capitalizeString(propertyName);
    if (tempElem.style[prefixedPropertyName] != null) { return prefixedPropertyName; }
  }

  return false;
};

const clearCompositionTextMarkers = function(cm){
  // Clear previous text markers
  const textMarkersArray = cm.getAllMarks();
  for (let textMarker of Array.from(textMarkersArray)) {
    if ((textMarker != null) && (textMarker.className === TEXT_MARKER_CLASS_NAME)) {
      textMarker.clear();
    }
  }

  return true;
};

(function(CodeMirror) {
  let initCompositionMode;
  CodeMirror.defineOption('enableCompositionMod', false, function(cm, newVal, oldVal) {
    if (newVal && !modInitialized) {
      if (window.CompositionEvent != null) {
        return initCompositionMode(cm);
      } else {
        console.warn("Your browser doesn't support CompositionEvent.");
        return cm.setOption('enableCompositionMod', false);
      }
    }
  });

  return initCompositionMode = function(cm) {
    const inputField = cm.display.input.div;
    const inputWrapper = cm.display.input.div.parentElement;
    const cmWrapper = cm.display.wrapper;

    inputWrapper.classList.add('CodeMirror-input-wrapper');
    CodeMirror.on(inputField, 'compositionstart', function(event) {


    });

    CodeMirror.on(inputField, 'compositionupdate', function(event) {
      operation(cm, applyTextInput)(cm, event.data, 0)

    });

    return CodeMirror.on(inputField, 'compositionend', function(event) {
      // alert("end")

    });
  };
})(CodeMirror)
