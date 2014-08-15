ATC.prototype.Panels = function(editor, ledger, summary, settings, help){
  this.editor = editor || true;
  this.ledger = ledger || true;
  this.summary = summary || false;
  this.settings = settings || false;
  this.help = help || false;
};