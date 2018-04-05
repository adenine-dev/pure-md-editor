/*
 * Composition Mod for CodeMirror
 * v5.0.0
 * mizchi <miz404@gmail.com>
 * Zhusee <zhusee2@gmail.com>
 *
 * Additional instance properties added to CodeMirror:
 *   - cm.display.inCompositionMode (Boolen)
 *   - cm.display.textMarkerInComposition (TextMarker)
 */

import CodeMirror from 'codemirror';


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

const setInputTranslate = function(cm, translateValue) {
  const transformProperty = getPrefixedPropertyName("transform");
  return cm.display.input.textarea.style[transformProperty] = translateValue;
};

const resetInputTranslate = cm => setInputTranslate("");

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
      if (!cm.options.enableCompositionMod) { return; }

      cm.display.inCompositionMode = true;
      cm.setOption('readOnly', true);

      if (cm.somethingSelected()) { cm.replaceSelection(""); } // Clear the selected text first

      cm.display.compositionHead = cm.getCursor();

      inputField.value = "";

      inputWrapper.classList.add('in-composition');
      return cmWrapper.classList.add('cm-in-composition');
    });

    CodeMirror.on(inputField, 'compositionupdate', function(event) {
      if (!cm.options.enableCompositionMod) { return; }
      const headPos = cm.display.compositionHead;

      if (cm.display.textMarkerInComposition) {
        const markerRange = cm.display.textMarkerInComposition.find();
        cm.replaceRange(event.data, headPos, markerRange.to);
        cm.display.textMarkerInComposition.clear();
        cm.display.textMarkerInComposition = undefined;
      } else {
        cm.replaceRange(event.data, headPos, headPos);
      }

      const endPos = cm.getCursor();
      cm.display.textMarkerInComposition = cm.markText(headPos, endPos, TEXT_MARKER_OPTIONS);

      const pixelToTranslate = cm.charCoords(endPos).left - cm.charCoords(headPos).left;
      return setInputTranslate(cm, `translateX(-${pixelToTranslate}px)`);
    });

    return CodeMirror.on(inputField, 'compositionend', function(event) {
      if (!cm.options.enableCompositionMod) { return; }
      cmWrapper.classList.remove('cm-in-composition');

      const textLeftComposition = event.data;
      const headPos = cm.display.compositionHead;
      const endPos = cm.getCursor();

      cm.display.inCompositionMode = false;
      cm.display.compositionHead = undefined;
      if (cm.display.textMarkerInComposition != null) {
        cm.display.textMarkerInComposition.clear();
      }
      cm.display.textMarkerInComposition = undefined;
      cm.setOption('readOnly', false);

      inputWrapper.classList.remove('in-composition');

      clearCompositionTextMarkers(cm);

      var postCompositionEnd = function() {
        if (cm.display.inCompositionMode) { return false; }
        inputField.value = "";
        return CodeMirror.off(inputField, 'input', postCompositionEnd);
      };

      return CodeMirror.on(inputField, 'input', postCompositionEnd);
    });
  };
})(CodeMirror)
