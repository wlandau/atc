;(function(localStorage, ATC){

  var retrieveLocally = function(atc, obj){
    var editor = ace.edit("editor");
    atc.configure(obj);
    editor.setValue(atc.text || "");
    editor.moveCursorTo(0, 0);  
  };
  
  ATC.prototype.retrieve = function(){
    var obj = JSON.parse(localStorage.getItem("atc"));    

    if(obj !== null){
      this.storage = obj.storage;
      if(obj.storage.mode === "local")
        retrieveLocally(this, obj);   
    }
  };

  var saveLocally = function(atc){
    var editor = ace.edit("editor");
    atc.text = editor.getSession().getValue();
    localStorage.setItem("atc", JSON.stringify(atc)); 
  };

  ATC.prototype.save = function(){
    if(this.storage.mode === "no-save")
      localStorage.setItem("atc", JSON.stringify({storage: new this.Storage("no-save")})); 
    else if(this.storage.mode === "local")
      saveLocally(this);
  };  

})(window.localStorage, ATC, undefined);