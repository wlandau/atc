ATClang= function(decimal, fieldDelim, transactionDelim){

  this.decimal = decimal || "\\.";
  this.fieldDelim = fieldDelim || ",";
  this.transactionDelim = transactionDelim || ";";
  
  this.whitespace = " \\t";
  this.wait = "w|wait|waiting";
  this.pend = "p|pend|pending";
  this.clear = "c|clear|cleared";
  this.pass = "s|pass|passed"

  this.delims = this.fieldDelim + this.transactionDelim; 
  this.number = "(?:\\d+" + this.decimal + "?\\d*|" + this.decimal + "\\d+)(?:[eE][+-]?\\d+)?";

  this.posNumber = "\\+?" + this.number;
  this.negNumber = "-" + this.number;
  this.percent = "[+-]?" + this.number + "%";

  this.begin = "(^|[" + this.delims + "])([" + this.whitespace + "]*)((?:";
  this.end = ")(?:[" + this.whitespace + "]+[^" + this.delims + this.whitespace + "]+)*)((?=[" + this.delims + this.whitespace + "])|$)"; 
      
  this.waitField = this.begin + this.wait + this.end;
  this.pendField = this.begin + this.pend + this.end;
  this.clearField = this.begin + this.clear + this.end;
  this.passField = this.begin + this.pass + this.end;
  this.posNumberField = this.begin + this.posNumber + this.end;
  this.negNumberField = this.begin + this.negNumber + this.end;  
  this.percentField = this.begin + this.percent + this.end; 
};