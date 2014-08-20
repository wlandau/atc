ATC.prototype.begin = function(){
  var atc = this;

  var step1 = function() {
    var def = $.Deferred();
    setTimeout(function() {
      atc.retrieve();
      def.resolve();
    }, 0);
    return def.promise();
  };

  var step2 = function() {
    var def = $.Deferred();
    setTimeout(function() {
      if(atc.storage.mode === "server")
        atc.login();
      else
        atc.load();
      def.resolve();
    }, 0);
    return def.promise();
  };
  
  step1().then(step2).then(atc.success, atc.error);
};