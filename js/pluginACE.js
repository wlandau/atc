;(function(){
  ATC.prototype.pluginACE = function(){
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/chrome"); 
    editor.getSession().setMode("ace/mode/atc");
    editor.focus();
  };
})();