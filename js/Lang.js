ATC.prototype.Lang = function(decimal, fieldDelim, transactionDelim){

  this.decimal = decimal || "\\.";
  this.fieldDelim = fieldDelim || ",";
  this.transactionDelim = transactionDelim || ";";
  
  var decimal = this.decimal,
      fieldDelim = this.fieldDelim,
      transactionDelim = this.transactionDelim,
  
      delims = fieldDelim + transactionDelim,
      dateDelims = "(?:\/|\.|-)",
      whitespace = " \\t",

      wait = "w|wait|waiting",
      pend = "p|pend|pending",
      clear = "c|clear|cleared",
      pass = "s|pass|passed",

      numberAce = "(?:\\d+" + decimal + "?\\d*|" + decimal + "\\d+)(?:[eE][+-]?\\d+)?",
      posNumberAce = "\\+?" + numberAce,
      negNumberAce = "-" + numberAce,
      percentAce = "[+-]?" + numberAce + "%",
        
      beginAce = "(^|[" + delims + "])([" + whitespace + "]*)((?:",
      endAce = ")(?:[" + whitespace + "]+[^" + delims + whitespace + "]+)*)((?=[" + delims + whitespace + "])|$)",

      aceRegex = function(regex){
        return beginAce + regex + endAce;
      },
  
      numberRegex = function(sign, percent){
        var str = "^[" + whitespace + "]*" + sign + "(\\d+" + decimal + "?\\d*|\\d*" 
                  + decimal + "\\d+)([eE][+-]?\\d+)?" + percent 
                  + "([" + whitespace + "]+|$)";
        return new RegExp(str, "i");
      },

      statusRegex = function(status){
        var str = "^[" + whitespace + "]*(" + status + ")([" + whitespace + "]+|$)";
        return new RegExp(str, "i");
      };

  this.number = numberRegex("[+-]?", "");
  this.posNumber = numberRegex("\\+", "");
  this.negNumber = numberRegex("-", "");
  this.percent = numberRegex("[+-]?", "%");
        
  this.waitFieldAce = aceRegex(wait);
  this.pendFieldAce = aceRegex(pend);
  this.clearFieldAce = aceRegex(clear);
  this.passFieldAce = aceRegex(pass);
  this.posNumberFieldAce = aceRegex(posNumberAce);
  this.negNumberFieldAce = aceRegex(negNumberAce);
  this.percentFieldAce = aceRegex(percentAce); 
  
  this.wait = statusRegex(wait);
  this.pend = statusRegex(pend);
  this.clear = statusRegex(clear);
  this.pass = statusRegex(pass);
  
  this.date = beginAce + "\\d\\d\\d\\d" + dateDelims + "(?:0[1-9]|1[012])" + dateDelims + "(?:0[1-9]|[12]\\d|3[01])))((?=[" + delims + whitespace + "])|$)";
};