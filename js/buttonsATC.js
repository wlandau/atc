;(function(ATC){
  var changePanelsOnClick = function(atc){
    $(".atc > .header div").click(function(){
      var This = $(this);
      This.toggleClass("open");
      var panelClass = This.attr("class").replace("open", "").trim(),
          panel = $(".panel." + panelClass).toggleClass("open");
      atc.panels[panelClass] = panel.is(".open");
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
  
  var initializePanels = function(atc){
    $(".atc > .header div, .panel").removeClass("open");
    for(panel in atc.panels)
      if(atc.panels[panel])
        $(".atc > .header ." + panel + ", .panel." + panel).addClass("open");
    fitPanels();
  };
  
  ATC.prototype.buttonsATC = function(){
    changePanelsOnClick(this);
    fitPanelsOnResize();
    initializePanels(this);
  };
})(ATC);