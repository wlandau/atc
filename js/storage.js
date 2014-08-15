;(function(localStorage, ATC){

  var retrieveLocally = function(atc){
    var atc = new ATC(JSON.parse(localStorage.getItem("atc"))), 
        editor = ace.edit("editor");    
    
    editor.setValue(atc.text || "");
    editor.moveCursorTo(0, 0);
  };

  ATC.prototype.retrieve = function(){
    if(this.storage === "local")
      retrieveLocally(this);     
  };

  var storeLocally = function(atc){
    var editor = ace.edit("editor");
    atc.text = editor.getSession().getValue();
    localStorage.setItem("atc", JSON.stringify(atc)); 
  };

  ATC.prototype.save = function(){  
    if(atc.config.storage === "local")
      storeLocally(atc);  
  };  

})(window.localStorage, ATC, undefined);
  