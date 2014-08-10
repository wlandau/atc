ace.define("ace/mode/doc_comment_highlight_rules", ["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {

  var oop = require("../lib/oop");
  var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

  var DocCommentHighlightRules = function() {
    this.$rules = {
      "start" : [ {
        token : "atc-comment.doc.tag",
          regex : "@[\\w\\d_]+" // TODO: fix email addresses
        }, {
          token : "atc-comment.doc.tag",
          regex : "\\bTODO\\b"
        }, {
          defaultToken : "atc-comment.doc"
        }
      ]
    };
  };

  DocCommentHighlightRules.getStartRule = function(start) {
    return {
      token : "atc-comment.doc", // doc comment
      regex : "\\/\\*(?=\\*)",
      next  : start
    };
  };

  DocCommentHighlightRules.getEndRule = function (start) {
    return {
      token : "atc-comment.doc", // closing comment
      regex : "\\*\\/",
      next  : start
    };
  };

  oop.inherits(DocCommentHighlightRules, TextHighlightRules);
  exports.DocCommentHighlightRules = DocCommentHighlightRules;
});

ace.define('ace/mode/atc_highlight_rules', ["require","exports","module","ace/lib/oop","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"], function(require, exports, module) {
  var oop = require("ace/lib/oop");
  var TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;
  var DocCommentHighlightRules = require("./doc_comment_highlight_rules").DocCommentHighlightRules;

  var atcHighlightRules = function() { 
    
    
    var delims= ",;" //"[,]";
    var decimal="\\.";
  
    var rx = {
      begin: "(^|[" + delims + "])([ \\t]*(?:", // no quoting, commas delimit fields, semicolons delimit transactions
      end: ")(?:$|(?=[" + delims + "])|[ \\t]+[^" + delims + "]*))", // no quoting, commas delimit fields, semicolons delimit transactions
//      begin: "(^|[ \\t" + delims + "])((?:", // quoting, commas optionally delimit fields, semicolons delimit transactions
//      end: ")(?:$|(?=[" + delims + "])|[ \\t]*(?:\"[^\"]*\"?|'[^']*'?)|[ \\t]+[^ \t" + delims +"]*))", // quoting, commas optionally delimit fields, semicolons delimit transactions
      wait: "w|wait|waiting",
      pend: "p|pend|pending",
      clear: "c|clear|cleared",
      pass: "s|pass|passed",
      number: "(?:\\d+" + decimal + "?\\d*|" + decimal + "\\d+)(?:[eE][+-]?\\d+)?",
    };
  
    this.$rules = {
      "no_regex": [
        DocCommentHighlightRules.getStartRule("doc-start"), {
          token : "atc-comment",
          regex : "\\/\\/",
          next : "line_comment"
        }, {
          token : "atc-comment", // multi line comment
          regex : /\/\*/,
          next : "atc-comment"
        }, {
          token: "atc-comment",
          regex: /^#!.*$/
        }
      ],
      "start": [
        DocCommentHighlightRules.getStartRule("doc-start"), {
          token : "atc-comment", // multi line comment
          regex : "\\/\\*",
          next : "atc-comment_regex_allowed"
        }, {
          token : "atc-comment",
          regex : "\\/\\/",
          next : "line_comment_regex_allowed"
        }, {
          token: ["text", "wait"], 
          regex: rx.begin + rx.wait + rx.end
        }, {
          token: ["text", "pend"], 
          regex: rx.begin + rx.pend + rx.end
        }, {
          token: ["text", "clear"], 
          regex: rx.begin + rx.clear + rx.end
        }, {
          token: ["text", "pass"], 
          regex: rx.begin + rx.pass + rx.end
        }, {
          token : ["text", "pos-number"], 
          regex : rx.begin + "\\+?" + rx.number + rx.end
        }, {
          token : ["text", "neg-number"], 
          regex : rx.begin + "-" + rx.number + rx.end
        }, {
          token : ["text", "percent"], 
          regex : rx.begin + "[+-]?" + rx.number + "%" + rx.end
        }, {
            caseInsensitive: true
        }
      ],
      "atc-comment_regex_allowed" : [
        {
          token : "atc-comment", 
          regex : "\\*\\/", 
          next : "start"
        }, {
          defaultToken : "atc-comment"
        }
      ],
      "atc-comment" : [
        {
          token : "atc-comment", 
          regex : "\\*\\/", 
          next : "no_regex"
        },
        {
          defaultToken : "atc-comment"
        }
      ],
      "line_comment_regex_allowed" : [
        {
          token : "atc-comment", 
          regex : "$|^", 
          next : "start"
        }, {
          defaultToken : "atc-comment"
        }
      ],
      "line_comment" : [
        {
          token : "atc-comment", 
          regex : "$|^", 
          next : "no_regex"
        }, {
          defaultToken : "atc-comment"
        }
      ]
    };
    
    this.embedRules(DocCommentHighlightRules, "doc-", [DocCommentHighlightRules.getEndRule("no_regex")]);
  };

  oop.inherits(atcHighlightRules, TextHighlightRules);
  exports.atcHighlightRules = atcHighlightRules;
});

ace.define('ace/mode/atc', function(require, exports, module) {
  var oop = require("ace/lib/oop");
  var TextMode = require("ace/mode/text").Mode;
  var Tokenizer = require("ace/tokenizer").Tokenizer;
  var atcHighlightRules = require("ace/mode/atc_highlight_rules").atcHighlightRules;

  var Mode = function() {
    this.$tokenizer = new Tokenizer(new atcHighlightRules().getRules());
  };
  
  oop.inherits(Mode, TextMode);
  exports.Mode = Mode;
});