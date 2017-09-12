#!/usr/bin/env osascript -l JavaScript

function getenv(name, default_value) {
    ObjC.import('stdlib')
    try {
        value = $.getenv(name);
    } finally {
        return (typeof value === 'undefined') ? default_value : value;
    }
}

function run(args)
{
    args = args.join(" ").split(" ")
    var action = String(args[0]);
    if (action == "ssh") {
        var host = String(args[1] || "");
        var app = Application("com.runningwithcrayons.Alfred-3");
        app.runTrigger(getenv("ssh_trigger", "ssh"),
            {inWorkflow:getenv("ssh_workflow", "net.isometry.alfred.ssh"), withArgument:host});
    } else {
        var app = Application(getenv("iterm_application", "com.googlecode.iterm2"));
        app.strictPropertyScope = true;
        app.strictCommandScope  = true;
        app.strictParameterType = true;
        var win = app.windows[Number(args[1])];
        var tab = win.tabs[Number(args[2])];
        var ses = tab.sessions[Number(args[3])];
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
            case "debug":
                console.log(JSON.stringify({args:args, title:ses.name()}));
                break;
            default:
                console.log("Invalid arguments:", JSON.stringify(args));
                break;
        }
    }
}
