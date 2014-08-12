ATC.prototype.buttons = function(){
  var atc = this;

  var enableSave = function(){
    if(atc.config.storage !== "none")
      $(".save").removeClass("no-save saving saved").addClass("unsaved");  
  };

  $(".editor").keyup(function(e){
    if(e.metaKey)
      return;

    var key = e.keyCode;
    
    if(key === 8 ||
       key === 9 ||
       key === 13 ||
       (key >= 46 && key <= 90) ||
       (key >= 96 && key <= 111) ||
       key >= 186)
    enableSave();
  });
  
  $(".atc > .header div").click(function(){
    enableSave();
  });
  
  $(".save").click(function(){
    if($(this).is(".unsaved"))
      atc.save("all");
  });
};