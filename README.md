# ^tty workflow for Alfred

A JXA-based workflow for [Alfred](http://www.alfredapp.com/) Powerpack users to quickly switch between or close iTerm windows, tabs and panes based on title and tty, or trigger your preferred ssh workflow when no open session is found (supports both [isometry/alfred-ssh](https://github.com/isometry/alfred-ssh) and [deanishe/alfred-ssh](https://github.com/deanish/alfred-ssh)).

## Releases
- [Latest for Alfred 3.x](https://github.com/isometry/alfred-tty/releases/latest)

## Requirements

- [Alfred](http://www.alfredapp.com/) (version 3.0+)
- [Alfred Powerpack](http://www.alfredapp.com/powerpack/)
- [iTerm2](https://www.iterm2.com/) (version 3.1+)
- macOS Sierra or newer (strictly, Mac OS X 10.10+, but untested on <10.12)

## Usage

Trigger the workflow with the keyword `tty`, or via hotkey, followed by some characters from the title of an open window, tab or pane; press `Enter` to activate the selected window/tab/pane, `Alt-Enter` to close it, or `Cmd-Enter` to trigger your ssh workflow. For example, enter `tty as3` to switch to a tab with the title `user@azure-server-03`.

If no active terminal matches, or you use the `Cmd`-modifier, trigger your preferred ssh workflow, e.g. `⇄ ssh as3`.
By default, the ssh workflow is assumed to be `net.isometry.alfred.ssh` (i.e. [isometry/alfred-ssh](https://github.com/isometry/alfred-ssh), version 2.3+). Override by setting the `ssh_workflow` and `ssh_trigger` variables; for [deanishe/alfred-ssh](https://github.com/deanish/alfred-ssh), set the `ssh_workflow` variable to `net.deanishe.alfred-ssh`.

In order to make working with more than one window/tab/pane with the same title easier, the tty is displayed beneath the result, and can be provided as a second argument to the trigger. For example, enter `tty lo 3` to select the the session with title `localhost` running on `/dev/ttys003`.

To select by tty alone, use two spaces between the trigger and the tty number. For example, `tty  4` will select `/dev/ttys004`.

Optionally associate a hotkey trigger to further accelerate operation, e.g. `Ctrl+Cmd+T`, or change the trigger word via the `keyword` variable.

Combine with an [iTerm2](https://www.iterm2.com/) profile configured as ssh protocol handler (e.g. "Name":=`$$USER$$@$$HOST$$`, "Command":=`$$` and "Schemes handled":=`ssh`) and an [alfred-ssh](https://github.com/isometry/alfred-ssh) workflow to make opening and jumping between remote sessions across many windows, tabs and panes easy.
