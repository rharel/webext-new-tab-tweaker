{
    // This will contain DOM elements proceeding a call to initialize().
    const DOM =
    {
        open_dialog: null,
        dialog:      null,
        album_url:   null,
        album_info:  null,
        import_urls: null,
    };

    // Contains candidate URLs to import.
    let candidate_urls = [];

    // Called when the album to import has changed.
    function on_album_selection()
    {
        const Imgur = NTT.Imgur;
        const url   = DOM.album_url.value;

        if (!Imgur.is_valid_album_url(url))
        {
            DOM.import_urls.style.visibility = "hidden";
            DOM.album_info.textContent       = "The URL specified does not seem to point to a " +
                                               "valid album.";
            return;
        }

        DOM.album_info.textContent = "Loading album info...";
        Imgur.get_album_image_urls(
            url,
            // On success
            urls =>
            {
                candidate_urls = urls;

                DOM.album_info.textContent       = `Detected ${urls.length} images.`;
                DOM.import_urls.style.visibility = "visible";
            },
            // On error
            () =>
            {
                DOM.import_urls.style.visibility = "hidden";
                DOM.album_info.textContent       = "Could not retrieve images. " +
                                                   "Make sure the album is not hidden.";
            }
        );
    }
    // Called when the user confirms he/she wants to import the selected album.
    function on_import_confirmation()
    {
        const Wallpaper = NTT.OptionsUI.NewTab.Wallpaper;

        const current_urls = Wallpaper.get_urls();
        const new_urls     = candidate_urls.filter(item => !current_urls.includes(item));

        Wallpaper.set_urls(current_urls.concat(new_urls));
        Wallpaper.on_change();

        NTT.OptionsUI.Dialog.close();
    }

    function initialize()
    {
        DOM.open_dialog = document.getElementById('open-wallpaper-url-import-dialog-button');
        DOM.dialog      = document.getElementById('wallpaper-url-import-dialog');
        DOM.album_url   = document.getElementById('imgur-album-url');
        DOM.album_info  = document.getElementById('imgur-album-info');
        DOM.import_urls = document.getElementById('import-wallpaper-urls-button');

        DOM.open_dialog.addEventListener('click', () =>
        {
            candidate_urls = [];

            DOM.album_url.value              = "";
            DOM.album_info.textContent       = "";
            DOM.import_urls.style.visibility = "hidden";

            NTT.OptionsUI.Dialog.open(DOM.dialog);
        });
        DOM.album_url.addEventListener('input', on_album_selection);
        DOM.import_urls.addEventListener('click', on_import_confirmation);
    }
    document.addEventListener('DOMContentLoaded', initialize);
}
