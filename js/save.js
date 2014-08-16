;(function(window, ATC){

  var retrieveLocally = function(atc){
    atc.configure(JSON.parse(localStorage.getItem("atc")));
    
    var editor = ace.edit("editor");    
    editor.setValue(atc.text || "");
    editor.moveCursorTo(0, 0);
  };

  ATC.prototype.retrieve = function(){
    if(this.storage.mode === "local")
      retrieveLocally(this);     
  };

  var storeLocally = function(atc){
    var editor = ace.edit("editor");
    atc.text = editor.getSession().getValue();
    localStorage.setItem("atc", JSON.stringify(atc)); 
  };

  ATC.prototype.save = function(){  
    if(this.storage.mode === "local")
      storeLocally(this);
      
    for(var i = 0; i < 1000000000; ++i) i = i + 1; console.log(i);
  };  

})(window.localStorage, ATC, undefined);