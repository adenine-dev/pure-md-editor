import React, { Component } from 'react';
import CodeMirror from 'codemirror';
import keymaps from "../assets/js/codemirror/keymap/keymap.js"

import '../assets/js/codemirror/mode/gfm.js';

import '../assets/js/codemirror/addon/continuelist.js';
import '../assets/js/codemirror/addon/overlay.js';
import '../assets/js/codemirror/addon/closebrackets.js';

import 'codemirror/mode/javascript/javascript.js';
// import 'codemirror/mode/clike/clike.js';


const editorWrapperStyle = {
  width: "90%",
  margin: "32px auto",
  maxWidth: "960px",
}

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editor: null
    }
  }
  componentDidMount() {
    let editor = CodeMirror(document.getElementById("main-editor"), {
      value: `\`\`\`javascript
Search Scopes
 // Cross-browser xml parsing
var parseXML = function( data ) {
  var xml, tmp;
  if ( !data || typeof data !== "string" ) {
    return null;
  }
  try {
    if ( window.DOMParser ) { // Standard
      tmp = new DOMParser();
      xml = tmp.parseFromString( data , "text/xml" );
    } else { // IE
      xml = new ActiveXObject( "Microsoft.XMLDOM" );
      xml.async = false;
      xml.loadXML( data );
    }
  } catch( e ) {
    xml = undefined;
  }
  if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
    jQuery.error( "Invalid XML: " + data );
  }
  return xml;
};

// Bind a function to a context, optionally partially applying any arguments.
var proxy = function( fn, context ) {
  var tmp, args, proxy;

  if ( typeof context === "string" ) {
    tmp = fn[ context ];
    context = fn;
    fn = tmp;
  }

  // Quick check to determine if target is callable, in the spec
  // this throws a TypeError, but we will just return undefined.
  if ( !jQuery.isFunction( fn ) ) {
    return undefined;
  }

  // Simulated bind
  args = core_slice.call( arguments, 2 );
  proxy = function() {
    return fn.apply( context || this, args.concat( core_slice.call( arguments ) ) );
  };

  // Set the guid of unique handler to the same of original handler, so it can be removed
  proxy.guid = fn.guid = fn.guid || jQuery.guid++;

  return proxy;
};

Sound.play = function() {}
Sound.prototype = { something; }
Sound.prototype.play = function() {}
Sound.prototype.play = myfunc
var parser = document.createElement('a');
parser.href = "http://example.com:3000/pathname/?search=test#hash";
parser.hostname; // => "example.com"
\`\`\``,
      mode: {
        name: "gfm",
        highlightFormatting: true,
        ignoreUnderscore: true,
        taskLists: true,
        fencedCodeBlocks: true,
      },
      autofocus: true,
      addModeClass: true,
      indentUnit: 2,
      tabSize: 2,
      autoCloseBrackets: true,
      extraKeys: {
        "Enter": "newlineAndIndentContinueMarkdownList",
      },
    })
    let keymap = {};
    keymaps.map((map) => {
      keymap[map.name] = map.action
    })
    editor.addKeyMap( keymap );
    let state = {}
    this.setState({ editor })

  }
  render() {
    console.log(this.state.editor);
    return (
      <div className="editor"
           style={{...editorWrapperStyle, ...this.props.style}}>

        <div id="main-editor"></div>
      </div>
    );
  }
}
