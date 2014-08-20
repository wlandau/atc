;(function(localStorage, ATC){
  
  ATC.prototype.retrieve = function(){
    var obj = JSON.parse(localStorage.getItem("atc"));    

    if(obj !== null){
      this.storage = obj.storage;
      if(obj.storage.mode === "local")
        this.configure(obj);  
    }
  };

})(window.localStorage, ATC, undefined);