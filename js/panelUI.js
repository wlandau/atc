;(function(ATC){
  var changePanelsOnClick = function(config){
    $(".atc > .header div").click(function(){
      var This = $(this);
      This.toggleClass("open");
      var panelClass = This.attr("class").replace("open", "").trim(),
          panel = $(".panel." + panelClass).toggleClass("open");
      config.panels[panelClass] = panel.is(".open");
      fitPanels();
    });
  };
  
  var fitPanels = function(){
    var openPanels = $(".open.panel"),
      numOpenPanels  = openPanels.length,
      wide = 2 * $(window).width() > window.screen.availWidth;
        
    openPanels.css({
      width: wide && numOpenPanels > 1 ? "50%" : "100%",
      height: numOpenPanels === 1 ? "100%" : (100/(wide ? Math.floor(numOpenPanels/2) + numOpenPanels % 2: numOpenPanels)).toFixed() + "%"
    });
    
    if($(".editor").is(".open"))
      ace.edit("editor").resize();
  }; 
  
  var fitPanelsOnResize = function(){
    $(window).resize(function(){
      fitPanels();
    });
  };
  
  var initializePanels = function(config){
    $(".atc > .header div, .panel").removeClass("open");
    for(panel in config.panels)
      if(config.panels[panel])
        $(".atc > .header ." + panel + ", .panel." + panel).addClass("open");
    fitPanels();
  };
  
  ATC.prototype.panelUI = function(){
    changePanelsOnClick(this.config);
    fitPanelsOnResize();
    initializePanels(this.config);
  };
})(ATC);