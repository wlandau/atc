ATC.prototype.buttons = function(){
  var atc = this,
      editor = ace.edit("editor");

  enableSave = function(){
    var saveButton = $(".save");
    if(!saveButton.is(".no-save"))
      saveButton.removeClass("saved").addClass("unsaved");  
  };

  editor.on("change", enableSave);
  $(".atc > .header div").click(enableSave);
  
  $(document).keydown(function(e) {
    var key = e.which || e.charCode || e.keyCode   
    if((e.ctrlKey || e.metaKey) && (key === 83 || key === 115)){
      e.preventDefault();
      atc.save();
    }
  });

  $(".save").click(function(e){
    if($(this).is(".unsaved"))
      atc.save();
  });
};