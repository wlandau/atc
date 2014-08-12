ATC.prototype.buttons = function(){
  var atc = this;

  var enableSave = function(){
    var saveButton = $(".save");
    if(!saveButton.is(".no-save"))
      saveButton.removeClass("saved").addClass("unsaved");  
  };
  
  $(window).bind('keyup', function(e) {
    var key = e.keyCode;
    if(key === 8 || key === 46)
      enableSave();
  });


$(document).keydown(function(e) {
  var key = e.which || e.charCode || e.keyCode     
       
  if((e.ctrlKey || e.metaKey) && (key === 83 || key === 115)) {
    e.preventDefault();
    atc.save();
  } else  if(!(e.ctrlKey || e.metaKey) && $(e.target).is(".ace_text-input")){
    if(key === 8 ||
       key === 9 ||
       key === 13 ||
       key === 32 ||
       (key >= 46 && key <= 90) ||
       (key >= 96 && key <= 111) ||
       key >= 186)     
      enableSave();   
    }
  });

  $(".save").click(function(e){
    if($(this).is(".unsaved"))
      atc.save();
  });
};