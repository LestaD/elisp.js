////
// Emacs Lisp implementation in JavaScript.
// 
// Copyright (c) 2009 Sami Samhuri - sami.samhuri@gmail.com
//
// Released under the terms of the MIT license.  See the included file
// LICENSE.

// Use initHook() to specify initialization routines at the very end
// of the file we call init when everything is defined, regardless of
// the order it appears in the file.  The order of the hooks still
// matters though, it's not fool-proof.
EL._initHooks = [];
EL.initHook = function(hook) {
    EL._initHooks.push(hook);
};
EL.init = function() {
    var i = 0,
        n = EL._initHooks.length;
    while (i < n) {
        EL._initHooks[i++].call();
    }
};