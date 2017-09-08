#!/usr/bin/env osascript -l JavaScript

function sessionToObj(winId, tabId) {
    return function(session, sesId) {
        return {
            id:      [winId, tabId, sesId].join(" "),
            title:   session.name(),
            tty:     session.tty(),
            output:  session.isProcessing(),
            profile: session.profileName()
        }
    }
}

function objToItem(obj) {
        var description = obj.tty + (obj.output?" *":"");
        return {
            title: obj.title,
            subtitle: ["Select", description].join(" "),
            arg: ["select", obj.id].join(" "),
            uid: [obj.title, obj.profile].join("/"),
            icon: { path: "icon.png" },
            mods: {
                alt: {
                    arg: ["close", obj.id].join(" "),
                    subtitle: ["Close", description].join(" ")
                }
            }
        }
}

function allSessionObjs(app) {
    var windows = app.windows;
    var results = new Array();
    for (var i = 0; i < windows.length; ++i) {
        var tabs = windows[i].tabs;
        for (var j = 0; j < tabs.length; ++j) {
            results.push(...tabs[j].sessions().map(sessionToObj(i, j)));
        }
    }
    return results;
}

function titleFilter(pattern) {
    var re = new RegExp(pattern.replace(/./g, "$&.*?"));
    return function(obj) {
        return re.exec(obj.title);
    }
}

function ttyFilter(ttyNum) {
    if (ttyNum.length == 0) {
        return function() {return true;};
    } else {
        var re = new RegExp(ttyNum.padStart(3, "0") + "$");
        return function(obj) {
            return re.exec(obj.tty);
        };
    }
}

function run(args) {
    args = args.join(" ").split(" ");
    var titlePattern = String(args[0] || "");
    var ttyPattern = String(args[1] || "");
    var sessionObjs = new Array();
    var app = Application("com.googlecode.iterm2");
    if (app.running()) {
        sessionObjs = allSessionObjs(app).filter(titleFilter(titlePattern)).filter(ttyFilter(ttyPattern));
    }
    return JSON.stringify({items: sessionObjs.map(objToItem)});
}
