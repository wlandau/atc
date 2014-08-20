ATC.prototype.buttonSave = function(){
  var atc = this,
      saveButton = $(".save");

  var asyncSave = function(){
    var def = $.Deferred();
    setTimeout(function() {
      atc.storage.status = "saved";
      atc.save();
      def.resolve();
    }, 0);
    return def.promise();    
  }

  var saveEvent = function(){
    if(!saveButton.is(".unsaved"))
      return;
      
    if(atc.storage.mode === "no-save") {
      atc.showStorage();
    } else if(atc.storage.status === "unsaved") {
      atc.storage.status = "saving";
      atc.showStorage().then(asyncSave).then(atc.showStorage).then(atc.success, atc.error);
    }
  };

  var enableSaveEvent = function(){
    atc.storage.status = "unsaved";
    atc.showStorage();
  };
  
  var keyHandlerEvent = function(e){
    var key = e.which || e.charCode || e.keyCode;

    if(key === 8 || key === 46){
      e.preventDefault();
    } else if((e.ctrlKey || e.metaKey) && (key === 83 || key === 115)){
      e.preventDefault();
      saveEvent();
    }  
  };

  ace.edit("editor").on("change", enableSaveEvent);
  $(".atc > .header div:not(.save)").on("click", enableSaveEvent);
  $(document).on("keydown", function(e){keyHandlerEvent(e)});
  saveButton.on("click", saveEvent);

  atc.showStorage();  
};