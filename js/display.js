;(function(){
  var changeDisplayOnClick = function(cfg){
    $(".atc > .header div").click(function(){
      var This = $(this);
      This.toggleClass("open");
      var panelClass = This.attr("class").replace("open", "").trim(),
          panel = $(".panel." + panelClass).toggleClass("open");
      cfg.display[panelClass] = panel.is(".open");
      fitDisplay();
    });
  };
  
  var fitDisplay = function(){
    var openPanels = $(".open.panel"),
      numOpenPanels  = openPanels.length,
      wide = 2 * $(window).width() > window.screen.availWidth;
        
    openPanels.css({
      width: wide && numOpenPanels > 1 ? "50%" : "100%",
      height: numOpenPanels === 1 ? "100%" : (100/(wide ? Math.floor(numOpenPanels/2) + numOpenPanels % 2: numOpenPanels)).toFixed() + "%"
    });
  }; 
  
  var fitDisplayOnResize = function(){
    $(window).resize(function(){
      fitDisplay();
    });
  };
  
  var initializeDisplay = function(cfg){
    $(".atc > .header div, .panel").removeClass("open");
    for(panel in cfg.display)
      if(cfg.display[panel])
        $(".atc > .header ." + panel + ", .panel." + panel).addClass("open");
    fitDisplay();
  };
  
  ATC.prototype.display = function(){
    changeDisplayOnClick(this.cfg);
    fitDisplayOnResize();
    initializeDisplay(this.cfg);
  };
})();