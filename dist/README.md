# New Tab Tweaker 1.1.0

This WebExtension allows the user to override the browser's behavior when opening a new tab.

Currently there are two main behavior types:
 - Redirection to a specified URL
 - Display of a custom page

The extension's settings persist in `storage.local`.

## Changelog

### 1.1.0
 * Wallpaper image URL
    * Increased maximum character-length to `2048`, up from `512`.
    * No longer complains about values that do not end with one of: `.gif`, `.jpg`, `.png`, or `.svg`.
### 1.0.2
 * Initial experimental public release.

## Project structure

### `icons/`
Contains icons that are applicable extension-wide.
Currently, all third-party assets that were used in creation of these icons were obtained from <a href="https://iconfinder.com">Iconfinder</a> under a free, no link-back type of license.

### `js/`
A place for all JavaScript code that is shared by two or more sub-components of the extension.

### `options_ui/`
Contains resources which are directly related to the extension's options page.

### `url_overrides/newtab/`
Contains resources which are directly related to the new-tab page override.