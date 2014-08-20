ATC.prototype.showStorage = function(){
  var def = $.Deferred(),
      editArea = $(".ace_content"),
      editor = ace.edit("editor"),
      saveButton = $(".save");
  
  setTimeout(function() {
    saveButton.removeClass("no-save unsaved saving saved");

    if(atc.storage.mode === "no-save")
      saveButton.addClass("no-save");
    else
      saveButton.addClass(atc.storage.status);
      
    if(atc.storage.status === "saving"){
      editArea.addClass("saving");
      editor.setOptions({
        readOnly: true, 
        highlightActiveLine: false,
        highlightGutterLine: false
      });
      editor.renderer.$cursorLayer.element.style.opacity=0
      editor.textInput.getElement().disabled=true
    } else if(atc.storage.status === "saved"){
      editArea.removeClass("saving");
      editor.setOptions({
        readOnly: false,
        highlightActiveLine: true,
        highlightGutterLine: true
      });
      editor.renderer.$cursorLayer.element.style.opacity=1;
      editor.textInput.getElement().disabled=false;
      editor.focus();
    }
      
    def.resolve();
  }, 0);
  return def.promise();   
};