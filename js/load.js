ATC.prototype.setText = function(){
  var editor = ace.edit("editor");
  editor.setValue(this.text || "");
  editor.moveCursorTo(0, 0);
};

ATC.prototype.load = function(){
  this.setText();
  this.pluginACE();
  this.buttons();
};