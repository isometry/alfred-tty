# ^TTY workflow for Alfred

A JXA-based workflow for [Alfred](http://www.alfredapp.com/) Powerpack users to quickly switch between or close iTerm windows, tabs and panes based on title and tty.

## Releases
- [Latest for Alfred 3.x](https://github.com/isometry/alfred-tty/releases/latest)

## Prerequisites

- [Alfred](http://www.alfredapp.com/) (version 3.x)
- The [Alfred Powerpack](http://www.alfredapp.com/powerpack/)
- macOS Sierra or newer (strictly, Mac OS X 10.10+, but untested on <10.12)

## Usage

Type `tty` in Alfred followed by some characters from the title of an open window, tab or pane; press `Enter` to activate the selected window/tab/pane, or Alt-Enter` to close it. For example, enter `tty as3` to switch to a tab with the title `user@azure-server-03`.

In order to make working with more than one window/tab/pane with the same title easier, the tty is displayed beneath the result, and can be provided as a second argument to the trigger. For example, enter `tty lo 3` to select the the session with title `localhost` running on `/dev/ttys003`.

To select by tty alone, use two spaces between the trigger and the tty number. For example, `tty  4` will select `/dev/ttys004`.

Optionally associate a hotkey trigger to further accelerate operation, e.g. Ctrl+Alt+T.

Combine with an ssh protocol handler [iTerm2](https://www.iterm2.com/) profile (e.g. "Name"=`$$USER$$@$$HOST$$`, "Command"=`$$` and "Schemes handled"=`ssh`) and an ssh workflow (e.g. [alfred-ssh](https://github.com/isometry/alfred-ssh)) to make opening and jumping between remote sessions across many windows, tabs and panes easy.
