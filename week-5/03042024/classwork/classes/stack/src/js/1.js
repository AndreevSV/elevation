
function tenth() {
  return 'done'
  
}

function ninth() { return tenth() }

function eigth() { return ninth() }

function seventh() { return eigth() }

function sixth() { return seventh() }

function fifth() { return sixth() }

function fourth() { return fifth() }

function third() { return fourth() }

function second() { return third() }

function first() { return second() }

debugger;
const foo = first()