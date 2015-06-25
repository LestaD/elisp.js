////
// Emacs Lisp implementation in JavaScript.
//
// Copyright (c) 2009 Sami Samhuri - sami.samhuri@gmail.com
//
// Released under the terms of the MIT license.  See the included file
// LICENSE.

var parser = require('./parser'),
    evaluator = require('./evaluator'),
    utils = require('./utils'),
    Parser = parser.Parser,
    Evaluator = evaluator.Evaluator;

// this should probably be renamed to avoid confusion
var eval = function(string) {
    var p = new Parser(),
	e = new Evaluator();
    return e.evalExpressions(p.parse(string));
};
exports.eval = eval;

var parse = function(string) {
    var p = new Parser();
    return p.parse(string);
};
exports.parse = parse;

var parseOne = function(string) {
    return parse(string).car();
};
exports.parseOne = parseOne;
exports.read = parseOne;

exports.pp = utils.pp;

var rep = function(string) {
    var p = new Parser(),
	e = new Evaluator();
    utils.pp(e.eval(p.read(string)));
};
exports.rep = rep;

var repl = function() {
    var p = new Parser(),
	e = new Evaluator(),
	sys = process,
  readline = require('readline'),
  rl = readline.createInterface(process.stdin, process.stdout);
	settings = require('./settings');
	if (!settings.hidePrompt) {
	    // sys.stdout.write("elisp> "); // i don't want a newline, grrrr
      rl.setPrompt('elisp> ');
	}
	try {

      rl.prompt();
      rl.on('line', function(line){
        if (line === "quit") rl.close();
        utils.pp(e.eval(p.parseOne(line)));
        rl.prompt();
      }).on('close', function(){
        process.exit(0);
      })

	    
	} catch (x) {
	    if (x.evalError) {
		print('[error] ' + x.message + ': ' + x.expression);
	    }
	    else throw(x);
	}
};
exports.repl = repl;

