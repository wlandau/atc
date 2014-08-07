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

ace.define('ace/mode/atc_highlight_rules', function(require, exports, module) {
var oop = require("ace/lib/oop");
var TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;

var atcHighlightRules = function() {
  this.$rules = /* new TextHighlightRules().getRules(); */
  {
    "start": [
      {
        token: "waiting",
        regex: "waiting"
      },
      {
        token: "pending",
        regex: "pending"
      },
      {
        token: "cleared",
        regex: "cleared"
      },
      {
        token: "passed",
        regex: "passed"
      }
    ]
  };
}

oop.inherits(atcHighlightRules, TextHighlightRules);
exports.atcHighlightRules = atcHighlightRules;
});