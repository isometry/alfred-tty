#!/usr/bin/env osascript -l JavaScript

function getenv(name, value=null) {
    ObjC.import('stdlib')
    try { value = $.getenv(name); }
    finally { return value; }
}

function run(args)
{
    args = args.join(" ").split(" ")
    var action = String(args[0]);
    if (action == "ssh") {
        var host = String(args[1] || "");
        var alfred = Application("com.runningwithcrayons.Alfred-3");
        alfred.runTrigger(getenv("ssh_trigger", "ssh"),
            {inWorkflow:getenv("ssh_workflow", "net.isometry.alfred.ssh"), withArgument:host});
    } else {
        var iterm = Application("com.googlecode.iterm2");
        var win = iterm.windows[Number(args[1])];
        var tab = win.tabs[Number(args[2])];
        var ses = tab.sessions[Number(args[3])];
        switch (action) {
            case "select":
                // tab => session => window => app
                tab.select();
                ses.select();
                win.select();
                iterm.activate();
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
}
