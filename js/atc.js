;(function(){
  ATC = function(args){

    var isConstructor = function(method){
      return method[0] === method[0].toUpperCase();
    };
    
    this.configure = function(args){
      if(args !== undefined)
        for(var key in args)
          this[key] = args[key];  

      for(var obj in this)
        if(isConstructor(obj)){
          var instance = obj.charAt(0).toLowerCase() + obj.slice(1);
          if(!this.hasOwnProperty(instance))
            this[instance] = new this[obj]();
        }
    };
    
    this.configure(args);
    
    this.success = function(){
//      console.log("ATC success.");
    };
    
    this.error = function(){
      console.log("ATC error.");
    }
  };
})(undefined);