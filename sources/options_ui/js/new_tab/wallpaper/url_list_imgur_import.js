(function()
{
    // Set in define().
    let imgur, wallpaper_urls, dialog;

    // This will contain DOM elements proceeding a call to initialize().
    const DOM =
    {
        open_dialog:   null,
        dialog:        null,
        resource_url:  null,
        resource_info: null,
        import_urls:   null,
    };

    // Contains candidate URLs to import.
    let candidate_urls = [];

    // Called when the resource to import has changed.
    function on_resource_selection()
    {
        const url = DOM.resource_url.value;

        if (!imgur.is_album_url(url) &&
            !imgur.is_gallery_url(url))
        {
            DOM.import_urls.style.visibility = "hidden";
            DOM.resource_info.textContent    = "The URL specified does not seem to point to a " +
                                               "valid album or gallery.";
            return;
        }

        DOM.resource_info.textContent = "Loading info...";
        imgur.get_resource_image_urls(url,
            // On success
            urls =>
            {
                candidate_urls = urls;

                DOM.resource_info.textContent    = `Detected ${urls.length} images.`;
                DOM.import_urls.style.visibility = "visible";
            },
            // On error
            () =>
            {
                DOM.import_urls.style.visibility = "hidden";
                DOM.resource_info.textContent    = "Could not retrieve images. " +
                                                   "Make sure the album/gallery is not hidden.";
            }
        );
    }
    // Called when the user confirms he/she wants to import the selected resource.
    function on_import_confirmation()
    {
        const current_urls = wallpaper_urls.get();
        const new_urls     = candidate_urls.filter(item => !current_urls.includes(item));

        wallpaper_urls.set(current_urls.concat(new_urls), true);

        dialog.close();
    }

    function initialize()
    {
        DOM.open_dialog   = document.getElementById("open-wallpaper-url-import-dialog-button");
        DOM.dialog        = document.getElementById("wallpaper-url-import-dialog");
        DOM.resource_url  = document.getElementById("imgur-resource-url");
        DOM.resource_info = document.getElementById("imgur-resource-info");
        DOM.import_urls   = document.getElementById("import-wallpaper-urls-button");

        DOM.open_dialog.addEventListener("click", () =>
        {
            candidate_urls = [];

            DOM.resource_url.value           = "";
            DOM.resource_info.textContent    = "";
            DOM.import_urls.style.visibility = "hidden";

            dialog.open(DOM.dialog);
        });
        DOM.resource_url.addEventListener("input", on_resource_selection);
        DOM.import_urls.addEventListener("click", on_import_confirmation);
    }

    define(
    [
        "common_ui/dialogs",
        "./imgur",
        "./url_list"
    ],
    function(dialogs_module, imgur_module, url_list_module)
    {
        dialog         = dialogs_module;
        imgur          = imgur_module;
        wallpaper_urls = url_list_module;

        return { initialize: initialize };
    });
})();
