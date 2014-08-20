;(function(localStorage, ATC){

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