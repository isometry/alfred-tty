#!/usr/bin/env osascript -l JavaScript

function run(args)
{
    args = args.join(" ").split(" ").map(function(e,i){return i==0?String(e):Number(e)});
    var app = Application("com.googlecode.iterm2");
    var action = args[0];
    var win = app.windows[args[1]];
    var tab = win.tabs[args[2]];
    var ses = tab.sessions[args[3]];
    switch (action) {
        case "select":
            // tab => session => window => app
            tab.select();
            ses.select();
            win.select();
            app.activate();
            break;
        case "close":
            var old = win.currentTab();
            tab.select();
            ses.close();
            old.select();
            break;
        default:
            console.info(JSON.stringify({args:args, title:ses.name()}));
            break;
    }
}
