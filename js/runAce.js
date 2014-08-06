;(function(){
  ATC.prototype.runAce = function(){
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/clouds"); 
    editor.getSession().setMode("ace/mode/atc");
  };
})();