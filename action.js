#!/usr/bin/env osascript -l JavaScript

function getenv(name, default_value) {
    var env = $.NSProcessInfo.processInfo.environment.js;
    return (name in env) ? env[name].js : default_value;
}

function run(args) {
    args = args.join(" ").split(" ");
    var app, action = String(args[0]);
    if (action == "ssh") {
        var host = String(args[1] || "");
        app = Application("com.runningwithcrayons.Alfred");
        app.runTrigger(getenv("ssh_trigger", "ssh"), {
            inWorkflow: getenv("ssh_workflow", "net.isometry.alfred.ssh"),
            withArgument: host
        });
    } else {
        app = Application(getenv("iterm_application", "com.googlecode.iterm2"));
        app.strictPropertyScope = true;
        app.strictCommandScope = true;
        app.strictParameterType = true;
        var win = app.windows.byId(Number(args[1]));
        var tab = win.tabs[Number(args[2])];
        var ses = tab.sessions.byId(String(args[3]));
        switch (action) {
            case "select":
                // tab => session => window => app
                tab.select();
                ses.select();
                win.select();
                app.activate();
                break;
            case "close":
                ses.close();
                break;
            case "debug":
                console.log(JSON.stringify({ args: args, title: ses.name() }));
                break;
            default:
                console.log("Invalid arguments:", JSON.stringify(args));
                break;
        }
    }
}
