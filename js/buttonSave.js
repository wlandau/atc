ATC.prototype.buttonSave = function(){
  var atc = this,
      editor = ace.edit("editor"),
      saveButton = $(".save");

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

  editor.on("change", showSave);
  $(".atc > .header div").click(showSave);
  
  $(document).keydown(function(e) {
    var key = e.which || e.charCode || e.keyCode;
    if(saveButton.is(".unsaved") && (e.ctrlKey || e.metaKey) && (key === 83 || key === 115)){
      e.preventDefault();
      atc.save();
      showSaved();
    }
  });

  saveButton.click(function(e){
    if(saveButton.is(".unsaved")){
      atc.save();
      showSaved();
    }
  });
};