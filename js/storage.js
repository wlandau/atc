;(function(localStorage, ATC){

  var retrieveLocally = function(atc){
    var editor = ace.edit("editor");    
    atc.config = JSON.parse(localStorage.getItem("ATCconfig")) || new ATCconfig();
    editor.setValue(localStorage.getItem("ATCtext")) || "";
    editor.moveCursorTo(0, 0);
  };

  ATC.prototype.retrieve = function(){
    if(this.config.storage === "none") {
      $(".save").removeClass("saving saved").addClass("no-save");
      return;
    } else if(this.config.storage === "local") {
      $(".save").removeClass("no-save saving").addClass("saved");
      retrieveLocally(this);
    }
  };
  
  var storeLocally = function(atc, saveType){
    var editor = ace.edit("editor");
    localStorage.setItem("ATCconfig", JSON.stringify(atc.config)); 
    if(saveType === "all" || saveType === undefined)
      localStorage.setItem("ATCtext", editor.getSession().getValue()); 
  };

  var actuallySave = function(atc, saveType){
    if(atc.config.storage === "local")
      storeLocally(atc, saveType);
  }

  var afterSave = function(){
    var saveButton = $(".save");
    if(saveButton.is(".saving"))
      saveButton.removeClass("saving").addClass("saved");
  }

  ATC.prototype.save = function(saveType){
    var atc = this,
        doneTypingInterval = saveType === "all" ? 1000 : 100,
        typingTimer;
         
    $(".save").removeClass(".saved").addClass("saving");
    clearTimeout(typingTimer);
    typingTimer = setTimeout(function(){
      actuallySave(atc, saveType);
      afterSave();
    }, doneTypingInterval);
  };
  
})(window.localStorage, ATC, undefined);
  