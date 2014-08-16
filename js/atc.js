;(function(){
  ATC = function(args){

    var isConstructor = function(method){
      return method[0] === method[0].toUpperCase();
    };
    
    this.configure = function(args){
      if(args !== undefined)
        for(key in args)
          this[key] = args[key];  

      for(obj in this)
        if(isConstructor(obj)){
          var instance = obj.charAt(0).toLowerCase() + obj.slice(1);
          if(!this.hasOwnProperty(instance))
            this[instance] = new this[obj]();
        }
    };
    
    this.configure(args);
  };
})(undefined);