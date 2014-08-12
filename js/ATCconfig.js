ATCconfig = function(lang, panels, storage){
  this.lang =  lang || new ATClang();
  this.panels = panels || new ATCpanels();
  this.storage = storage || "local";
};