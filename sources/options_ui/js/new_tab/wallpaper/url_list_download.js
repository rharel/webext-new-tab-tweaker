(function()
{
    // This will contain DOM elements proceeding a call to initialize().
    const DOM =
    {
        urls:     null,
        download: null,
    };

    // Offers the URL list as a text file.
    function download_as_text(event)
    {
        const text = DOM.urls.value;

        if (text.length === 0) { return; }

        const uri         = encodeURIComponent(text);
        DOM.download.href = `data:text/plain;charset=utf-8,${uri}`;
    }

    function initialize()
    {
        DOM.urls     = document.getElementById('wallpaper-urls');
        DOM.download = document.getElementById('download-wallpaper-urls');

        DOM.download.addEventListener('click', download_as_text);
    }

    define({ initialize: initialize });
})();
