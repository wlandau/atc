ace.define("ace/mode/doc_comment_highlight_rules", ["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {

  var oop = require("../lib/oop");
  var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

  var DocCommentHighlightRules = function() {
    this.$rules = {
      "start" : [ {
        token : "comment.doc.tag",
          regex : "@[\\w\\d_]+" // TODO: fix email addresses
        }, {
          token : "comment.doc.tag",
          regex : "\\bTODO\\b"
        }, {
          defaultToken : "comment.doc"
        }
      ]
    };
  };

  DocCommentHighlightRules.getStartRule = function(start) {
    return {
      token : "comment.doc", // doc comment
      regex : "\\/\\*(?=\\*)",
      next  : start
    };
  };

  DocCommentHighlightRules.getEndRule = function (start) {
    return {
      token : "comment.doc", // closing comment
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
    this.$rules = {
      "no_regex": [
        DocCommentHighlightRules.getStartRule("doc-start"), {
          token : "comment",
          regex : "\\/\\/",
          next : "line_comment"
        }, {
          token : "comment", // multi line comment
          regex : /\/\*/,
          next : "comment"
        }, {
          token: "comment",
          regex: /^#!.*$/
        }
      ],
      "start": [
        DocCommentHighlightRules.getStartRule("doc-start"), {
          token : "comment", // multi line comment
          regex : "\\/\\*",
          next : "comment_regex_allowed"
        }, {
          token : "comment",
          regex : "\\/\\/",
          next : "line_comment_regex_allowed"
        }, {
          token: "wait", 
          regex: /(^|,|[ \t]+)([Ww]|[Ww][Aa][Ii][Tt]|[Ww][Aa][Ii][Tt][Ii][Nn][Gg])($|[ \t]+)("[^",]*"?|'[^',]*'?|[^ \t,]*)/
        }, {
          token: "pend",
          regex: /(^|,|[ \t]+)([Pp]|[Pp][Ee][Nn][Dd]|[Pp][Ee][Nn][Dd][Ii][Nn][Gg])($|[ \t]+)("[^",]*"?|'[^',]*'?|[^ \t,]*)/
        }, {
          token: "clear",
          regex: /(^|,|[ \t]+)([Cc]|[Cc][Ll][Ee][Aa][Rr]|[Cc][Ll][Ee][Aa][Rr][Ee][Dd])($|[ \t]+)("[^",]*"?|'[^',]*'?|[^ \t,]*)/
        }, {
          token: "pass",
          regex: /(^|,|[ \t]+)([Ss]|[Pp][Aa][Ss][Ss]|[Pp][Aa][Ss][Ss][Ee][Dd])($|[ \t]+)("[^",]*"?|'[^',]*'?|[^ \t,]*)/
        }, {
          token : "pos-number", 
          regex : /[+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/
        }, {
          token : "neg-number", 
          regex : /-\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/
        }, {
          token : "percent", 
          regex : /[+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/
        }
      ],
      "comment_regex_allowed" : [
        {
          token : "comment", 
          regex : "\\*\\/", 
          next : "start"
        }, {
          defaultToken : "comment"
        }
      ],
      "comment" : [
        {
          token : "comment", 
          regex : "\\*\\/", 
          next : "no_regex"
        },
        {
          defaultToken : "comment"
        }
      ],
      "line_comment_regex_allowed" : [
        {
          token : "comment", 
          regex : "$|^", 
          next : "start"
        }, {
          defaultToken : "comment"
        }
      ],
      "line_comment" : [
        {
          token : "comment", 
          regex : "$|^", 
          next : "no_regex"
        }, {
          defaultToken : "comment"
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