;(function(localStorage, ATC){
  
  storeLocally = function(atc, saveType){
    var editor = ace.edit("editor");
    localStorage.setItem("ATCconfig", JSON.stringify(atc.config)); 
    if(saveType === "all")
      localStorage.setItem("ATCtext", editor.getSession().getValue()); 
  };

  var retrieveLocally = function(atc){
    var editor = ace.edit("editor");    
    atc.config = JSON.parse(localStorage.getItem("ATCconfig")) || new ATCconfig();
    editor.setValue(localStorage.getItem("ATCtext")) || "";
    editor.moveCursorTo(0, 0);
  };

  ATC.prototype.save = function(saveType){
    $(".save").removeClass("no-save unsaved saved").addClass("saving");    
    if(this.config.storage === "local")
      storeLocally(this, saveType);
    $(".save").removeClass("no-save unsaved saving").addClass("saved");
  };
  
  ATC.prototype.retrieve = function(){
    if(this.config.storage === "none") {
      $(".save").removeClass("unsaved saving saved").addClass("no-save");
      return;
    } else if(this.config.storage === "local") {
      retrieveLocally(this);
    }
    
    $(".save").removeClass("no-save unsaved saving").addClass("saved");
  };
})(window.localStorage, ATC);
  