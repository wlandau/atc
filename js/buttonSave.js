ATC.prototype.buttonSave = function(){
  var atc = this,
      editor = ace.edit("editor"),
      editWindow = $(".ace_content"),
      mode = this.storage.mode,
      saveButton = $(".save");

  if(mode === "local")
    saveButton.addClass("saved");
  else if(mode === "none")
    saveButton.addClass("no-save");

  var asyncSave = function(){
    var def = $.Deferred();
    setTimeout(function() {      
      atc.save();
      def.resolve();
    }, 0);
    return def.promise();    
  }

  var showSave = function(){
    var def = $.Deferred();
    setTimeout(function() {
      if(!saveButton.is(".no-save"))
        saveButton.removeClass("saving saved").addClass("unsaved");  
      def.resolve();
    }, 0);
    return def.promise();  
  };

  var showSaving = function(){
    var def = $.Deferred();
    setTimeout(function() {
      if(!saveButton.is(".no-save")){
        saveButton.removeClass("unsaved saved").addClass("saving");
        editWindow.addClass("saving");   
        editor.setOptions({
          readOnly: true,
          highlightActiveLine: false,
          highlightGutterLine: false
        });
        editor.renderer.$cursorLayer.element.style.opacity=0
        editor.textInput.getElement().disabled=true
      }
      def.resolve();
    }, 0);
    return def.promise();  
  };

  var showSaved = function(){
    var def = $.Deferred();
    setTimeout(function() {
      if(!saveButton.is(".no-save")){
        saveButton.removeClass("unsaved saving").addClass("saved");  
        editWindow.removeClass("saving");
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
 
 
  var UIsave = function(){  
    showSaving().then(asyncSave).then(showSaved).then(atc.success, atc.error);
  };

  editor.on("change", showSave);
  $(".atc > .header div").click(showSave);
  
  $(document).keydown(function(e) {
    var key = e.which || e.charCode || e.keyCode;

    if(key === 8 || key === 46){
      e.preventDefault();
    } else if((e.ctrlKey || e.metaKey) && (key === 83 || key === 115)){
      e.preventDefault();
      if(saveButton.is(".unsaved"))
        UIsave();
    }
  });

  saveButton.click(function(e){
    if(saveButton.is(".unsaved"))
      UIsave();
  });
};