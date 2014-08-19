


ATC.prototype.buttonSave = function(){
  var atc = this,
      editor = ace.edit("editor"),
      editArea = $(".ace_content"),
      mode = this.storage.mode,
      saveButton = $(".save");

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
      saveButton.removeClass("no-save saving saved").addClass("unsaved");  
      def.resolve();
    }, 0);
    return def.promise();  
  };

  var showSaving = function(){
    var def = $.Deferred();
    setTimeout(function() {
      saveButton.removeClass("no-save unsaved saved").addClass("saving");
      editArea.addClass("saving");
      editor.setOptions({
        readOnly: true,
        highlightActiveLine: false,
        highlightGutterLine: false
      });
      editor.renderer.$cursorLayer.element.style.opacity=0
      editor.textInput.getElement().disabled=true
      def.resolve();
    }, 0);
    return def.promise();  
  };

  var showSaved = function(){
    var def = $.Deferred();
    setTimeout(function() {
      saveButton.removeClass("no-save unsaved saving").addClass("saved");  
      editArea.removeClass("saving");
      editor.setOptions({
        readOnly: false,
        highlightActiveLine: true,
        highlightGutterLine: true
      });
      editor.renderer.$cursorLayer.element.style.opacity=1;
      editor.textInput.getElement().disabled=false;
      editor.focus();
      def.resolve();
    }, 0);
    return def.promise();  
  };
  
  var showNoSave = function(){
    var def = $.Deferred();
    setTimeout(function() {
      saveButton.removeClass("unsaved saving saved").addClass("no-save");  
      def.resolve();
    }, 0);
    return def.promise(); 
  };






  var UIsave = function(){
    console.log(mode);
    if(mode === "none")
      showNoSave();
    else if(mode === "local")
      showSaving().then(asyncSave).then(showSaved).then(atc.success, atc.error);
  };

  var UIenableSave = function(){
    if(mode === "none")
      showNoSave();
    else if(mode === "local")
      showSave();
  };

  if(mode === "local")
    saveButton.removeClass("no-save unsaved saving").addClass("saved");
  else if(mode === "none")
    saveButton.removeClass("unsaved saving saved").addClass("no-save");

  editor.on("change", UIenableSave);
  
  $(".atc > .header div").on("click", UIenableSave);
  
  $(document).on("keydown", function(e) {
    var key = e.which || e.charCode || e.keyCode;

    if(key === 8 || key === 46){
      e.preventDefault();
    } else if((e.ctrlKey || e.metaKey) && (key === 83 || key === 115)){
      e.preventDefault();
      if(saveButton.is(".unsaved"))
        UIsave();
    }
  });

  saveButton.on("click", function(e){
    if(saveButton.is(".unsaved"))
      UIsave();
  });
};