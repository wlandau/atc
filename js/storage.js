;(function(localStorage, ATC){

  var retrieveLocally = function(atc){
    var atc = JSON.parse(localStorage.getItem("atc")) || new ATC(), 
        editor = ace.edit("editor");    
    
    editor.setValue(atc.text || "");
    editor.moveCursorTo(0, 0);
  };

  ATC.prototype.retrieve = function(){
    if(this.storage === "none")
      return;
    else if(this.storage === "local")
      retrieveLocally(this);     
  };

  var storeLocally = function(atc){
    var editor = ace.edit("editor");
    atc.text = editor.getSession().getValue();
    localStorage.setItem("atc", JSON.stringify(atc)); 
  };
  
  var storageStep = function(){
    if(atc.config.storage === "local")
      storeLocally(atc);      
  }
  
  var reportSaved = function(){
    $(".save").removeClass("unsaved").addClass("saved");
  };

  ATC.prototype.save = function(){  
    storageStep();    
    reportSaved();
  };  

})(window.localStorage, ATC, undefined);
  