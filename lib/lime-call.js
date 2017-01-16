
//The calls within this module will use the lime state
// that is current, unless called .lime directly with your
// own arguments. The rest will assume the current state.

var exec = require('./utils/exec');
var state = require('./lime-state');
var lime_log = require('./utils/log');


module.exports = {

    lime: function(args, ondataout, ondataerr) {
        var pre_args = ['run','lime'];
        var use_args = pre_args.concat(args);
        lime_log.debug('running: lime ' + args.join(' '));
        var haxelib_path = atom.config.get('haxe.haxelib_path') || 'haxelib';
        return exec(haxelib_path, use_args, ondataout, ondataerr);
    },

    hxml: function() {
        return this.lime([
            'display', state.project_path, state.target
        ]);
    },

    build: function(plus_args, ondataout, ondataerr) {
        return this.cmd('build', plus_args, ondataout, ondataerr);
    },

    run: function(plus_args, ondataout, ondataerr) {
        return this.cmd('test', plus_args, ondataout, ondataerr);
    },

    launch: function(plus_args, ondataout, ondataerr) {
        return this.cmd('run', plus_args, ondataout, ondataerr);
    },

    cmd: function(cmd, plus_args, ondataout, ondataerr) {
        var args = [cmd];
            args = args.concat(state.as_args(plus_args));

        var additional = atom.config.get('lime.command_line_extra');
        args.push(additional);

        return this.lime(args, ondataout, ondataerr);
    }

}; //module.exports
