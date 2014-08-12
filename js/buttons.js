ATC.prototype.buttons = function(){
  var atc = this;

  var enableSave = function(){
    var saveButton = $(".save");
    if(!saveButton.is(".no-save"))
      saveButton.removeClass("saved").addClass("unsaved");  
  };

  $(".editor").keyup(function(e){
    var key = e.keyCode;

    if(e.metaKey || e.ctrlKey)
      return;
    
    if(key === 8 ||
       key === 9 ||
       key === 13 ||
       key === 32 ||
       (key >= 46 && key <= 90) ||
       (key >= 96 && key <= 111) ||
       key >= 186)
       
    enableSave();
  });
  
  $(".atc > .header div").click(function(){
    enableSave();
  });

  $(".save").click(function(e){
    if($(this).is(".unsaved"))
      atc.save();
  });
};