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
    
    var lang = window.atc.lang;

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
          token: ["text", "text", "wait", "text"], 
          regex: lang.waitFieldAce
        }, {
          token: ["text", "text", "pend", "text"], 
          regex: lang.pendFieldAce
        }, {
          token: ["text", "text", "clear", "text"], 
          regex: lang.clearFieldAce
        }, {
          token: ["text", "text", "pass", "text"], 
          regex: lang.passFieldAce
        }, {
          token : ["text", "text", "pos-number", "text"], 
          regex : lang.posNumberFieldAce
        }, {
          token : ["text", "text", "neg-number", "text"], 
          regex : lang.negNumberFieldAce
        }, {
          token : ["text", "text", "percent", "text"], 
          regex : lang.percentFieldAce
        }, {
          token : ["text", "text", "date", "text"], 
          regex : lang.date
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