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

### 1.5.0
 * Simplifies wallpaper list UI in the options page.
 * Allows download of the wallpaper URL list as a text file.
   
### 1.4.1
 * Fixes a bug where the image context menu was enabled even when the display of wallpapers was disabled.
 
### 1.4.0
 * Adds an image-context menu that facilitates specification and/or addition of images to the wallpaper collection.

### 1.3.1
 * Minor bug fix.
 
### 1.3.0
 * Avoids picking the same wallpaper consecutively when there is more than one image specified.
 * Adds the option to import wallpaper URLs from an Imgur album.
 
### 1.2.0
 * Allows for more than one URL to be specified as wallpaper image. If indeed multiple URLs are specified, a new tab will display one of them, chosen at random.
 
### 1.1.3
 * Fixes two bugs that caused the wallpaper image to sometimes disregard the fade-in animation duration setting.
 
### 1.1.2
 * Dispose of webpack from build process.
 
### 1.1.1
 * Removed all debug logs to console.

### 1.1.0
 * Extension no longer marked as experimental.
 * Looser restrictions on wallpaper image URLs:
    * Increased maximum character-length to `2048`, up from `512`.
    * No more complaints about values that do not end with one of: `.gif`, `.jpg`, `.png`, or `.svg`.
 * The options page can now be accessed through a New Tab: just hover the cursor near the bottom edge of the window and a link will be revealed.
 
### 1.0.2
 * Initial experimental public release.
