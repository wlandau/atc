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
        regex: /\b([Ww][Aa][Ii][Tt][Ii][Nn][Gg]|[Ww][Aa][Ii][Tt]|[Ww])\b/
      },
      {
        token: "pending",
        regex: /\b([Pp][Ee][Nn][Dd][Ii][Nn][Gg]|[Pp][Ee][Nn][Dd]|[Pp])\b/
      },
      {
        token: "cleared",
        regex: /\b([Cc][Ll][Ee][Aa][Rr][Ee][Dd]|[Cc][Ll][Ee][Aa][Rr]|[Cc])\b/
      },
      {
        token: "passed",
        regex: /\b([Pp][Aa][Ss][Ss][Ee][Dd]|[Pp][Aa][Ss][Ss]|[Ss])\b/
      }
    ]
  };
}

oop.inherits(atcHighlightRules, TextHighlightRules);
exports.atcHighlightRules = atcHighlightRules;
});