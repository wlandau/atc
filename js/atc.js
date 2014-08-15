;(function(){
  ATC = function(args){

    /* Load all arguments. */    
  
    if(args !== undefined)
      for(key in args)
        this[key] = args[key];

    /* Constructors are capitalized methods. */
  
    var isConstructor = function(method){
      return method[0] === method[0].toUpperCase();
    }

    /* Create new objects from all constructors if not given as arguments. */

    for(obj in this){
      if(isConstructor(obj)){
        var instance = obj.charAt(0).toLowerCase() + obj.slice(1);
        if(!this.hasOwnProperty(instance))
          this[instance] = new this[obj]();
      }
    }
  };
})(undefined);