ATC.prototype.buttons = function(){
  var atc = this;

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
       
    atc.save("all");
  });
  
  $(".atc > .header div").click(function(){
    atc.save("config");
  });
};