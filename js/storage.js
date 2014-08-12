;(function(localStorage, ATC){

  var retrieveLocally = function(atc){
    var editor = ace.edit("editor");    
    atc.config = JSON.parse(localStorage.getItem("ATCconfig")) || new ATCconfig();
    editor.setValue(localStorage.getItem("ATCtext")) || "";
    editor.moveCursorTo(0, 0);
  };

  ATC.prototype.retrieve = function(){
    if(this.config.storage === "none")
      return;
    else if(this.config.storage === "local")
      retrieveLocally(this);
      
    var saveButton = $(".save");
    if(this.config.storage === "none")
      saveButton.addClass("no-save")
    else if(this.config.storage === "local")
      saveButton.addClass("saved")      
  };

  var storeLocally = function(atc, saveType){
    var editor = ace.edit("editor");
    localStorage.setItem("ATCconfig", JSON.stringify(atc.config)); 
    if(saveType === "all" || saveType === undefined)
      localStorage.setItem("ATCtext", editor.getSession().getValue()); 
  };
  
  var reportSaved = function(){
    $(".save").removeClass("unsaved").addClass("saved");
  };

  ATC.prototype.save = function(saveType){
    if(this.config.storage === "local")
      storeLocally(atc, saveType);
    reportSaved();
  };  

})(window.localStorage, ATC, undefined);
  