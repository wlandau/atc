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
      
    if(status === "saving"){
      editArea.addClass("saving");
      editor.setOptions({
        readOnly: true, 
        highlightActiveLine: false,
        highlightGutterLine: false
      });
      editor.renderer.$cursorLayer.element.style.opacity=0
      editor.textInput.getElement().disabled=true
    } else if(status === "saved"){
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

ATC.prototype.buttonSave = function(){
  var atc = this;

  var asyncSave = function(){
    var def = $.Deferred();
    setTimeout(function() {
      atc.storage.status = "saved";
      atc.save();
      def.resolve();
    }, 0);
    return def.promise();    
  }

  var saveEvent = function(){
    if(atc.storage.mode === "no-save") {
      atc.showStorage();
    } else if(atc.storage.status === "unsaved") {
      atc.storage.status = "saving";
      atc.showStorage().then(asyncSave).then(atc.showStorage).then(atc.success, atc.error);
    }
  };

  var enableSaveEvent = function(){
    atc.storage.status = "unsaved";
    atc.showStorage();
  };
  
  var keyHandlerEvent = function(e){
    var key = e.which || e.charCode || e.keyCode;

    if(key === 8 || key === 46){
      e.preventDefault();
    } else if((e.ctrlKey || e.metaKey) && (key === 83 || key === 115)){
      e.preventDefault();
      saveEvent();
    }  
  };

  ace.edit("editor").on("change", enableSaveEvent);
  $(".atc > .header div").on("click", enableSaveEvent);
  $(document).on("keydown", function(e){keyHandlerEvent(e)});
  $(".save").on("click", saveEvent);

  atc.showStorage();  
};