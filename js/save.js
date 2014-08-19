;(function(localStorage, ATC){

  var getStorageSettings = function(atc){
    var obj = localStorage.getItem("atcStorageSettings");
    
    if(obj === null)
      localStorage.setItem("atcStorageSettings", JSON.stringify(new atc.Storage()));
    else
      atc.configure({storage: JSON.parse(obj)});  
  };
  
  ATC.prototype.setStorageMode = function(mode){
    var storage = this.storage;
    this.storage.mode = mode;
    localStorage.setItem("atcStorageSettings", JSON.stringify(storage));
  };
  
  var retrieveLocally = function(atc){
    var editor = ace.edit("editor"), 
        obj = localStorage.getItem("atc");
        
    if(obj !== null){
      atc.configure(JSON.parse(obj));
      editor.setValue(atc.text || "");
      editor.moveCursorTo(0, 0);
    }
  };

  ATC.prototype.retrieve = function(){
    getStorageSettings(atc);
    if(this.storage.mode === "local")
      retrieveLocally(this);  
  };

  var saveLocally = function(atc){
    var editor = ace.edit("editor");
    atc.text = editor.getSession().getValue();
    localStorage.setItem("atc", JSON.stringify(atc)); 
  };

  ATC.prototype.save = function(){
    getStorageSettings(atc);
    if(this.storage.mode === "local")
      saveLocally(this);
  };  

})(window.localStorage, ATC, undefined);