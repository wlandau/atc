function ATC(config, ledger, summary){
  this.config = config || new ATCconfig();
  this.ledger = ledger || [];
  this.summary = summary || [];
};