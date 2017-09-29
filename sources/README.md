# New Tab Tweaker

This WebExtension allows the user to override the browser's behavior when opening a new tab.

Currently there are two main behavior types:
 - Redirection to a specified URL
 - Display of a custom page

The extension's settings persist in `storage.local`.

## Project structure

### `background_scripts/`
Contains all background scripts.

### `common/`
A place for all JavaScript and CSS that is shared by two or more sub-components of the extension.

### `icons/`
Contains icons that are applicable extension-wide.
Currently, all third-party assets that were used in creation of these icons were obtained from <a href="https://iconfinder.com">Iconfinder</a> under a free, no link-back type of license.

### `options_ui/`
Contains resources which are directly related to the extension's options page.

### `url_overrides/newtab/`
Contains resources which are directly related to the new-tab page override.

## Changelog

### 1.7.0
 * Adds new wallpaper scaling options: 'automatic' and 'none'.
 * Adds the options to show/hide top sites.
 
### 1.6.0

 * Adds a wallpaper preview box to the options page.
 * Adds a new wallpaper scaling option: 'fill'.
 * Adds support for plain-text wallpaper URLs (only from localhost).
 * Allow wallpaper imports from Imgur galleries (in addition to albums).
 * Adds feedback for context menu actions through notifications.
 
### 1.5.2

 * Fixes a bug where particularly wide wallpapers were not fully contained in a new tab's frame.
 
### 1.5.1
 * Fixes a bug where the specified duration for the animation of the background/wallpaper would not be saved correctly (sometimes).
 
### 1.5.0
 * Simplifies wallpaper list UI in the options page.
 * Allows download of the wallpaper URL list as a text file.
 * Adds a dark theme to the options page (under the advanced category).
   
### 1.4.1
 * Fixes a bug where the image context menu was enabled even when the display of wallpapers was disabled.
 
### 1.4.0
 * Adds an image-context menu that facilitates specification and/or addition of images to the wallpaper collection.
