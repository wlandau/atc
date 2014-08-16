ATC.prototype.buttonSave = function(){
  var atc = this,
      editor = ace.edit("editor"),
      mode = this.storage.mode;
      saveButton = $(".save");

  if(mode === "local")
    saveButton.addClass("saved");
  else if(mode === "none")
    saveButton.addClass("no-save");

  var showSave = function(){
    if(!saveButton.is(".no-save"))
      saveButton.removeClass("saving saved").addClass("unsaved");  
  };

  var showSaving = function(){
    if(!saveButton.is(".no-save"))
      saveButton.removeClass("unsaved saved").addClass("saving");  
  };

  var showSaved = function(){
    if(!saveButton.is(".no-save"))
      saveButton.removeClass("unsaved saving").addClass("saved");  
  };

  var interactiveSave = function(){
    showSaving();
    atc.save();
    showSaved();  
  };

  editor.on("change", showSave);
  $(".atc > .header div").click(showSave);
  
  $(document).keydown(function(e) {
    var key = e.which || e.charCode || e.keyCode;
    if(saveButton.is(".unsaved") && (e.ctrlKey || e.metaKey) && (key === 83 || key === 115)){
      e.preventDefault();
      interactiveSave();
    }
  });

  saveButton.click(function(e){
    if(saveButton.is(".unsaved"))
      interactiveSave();
  });
};