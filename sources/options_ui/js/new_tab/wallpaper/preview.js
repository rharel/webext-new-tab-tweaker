{
    // This will contain DOM elements proceeding a call to initialize().
    const DOM =
    {
        urls:          null,
        preview_image: null,
        preview:  null,
    };

    // Gets the line containing current selection end.
    function get_selected_url()
    {
        const text = DOM.urls.value,
              s    = DOM.urls.selectionEnd;

        let i, j;
        for (j = s    ; j < text.length && text[j] !== "\n"; ++j) {}
        for (i = s - 1; i > 0           && text[i] !== "\n"; --i) {}

        return text.substring(i, j).trim();
    }
    // Updates the preview image based on the selected url.
    const update_preview = function()
    {
        let timeout_id;

        return function()
        {
            clearTimeout(timeout_id);

            if (DOM.preview.style.display === "none" ||
                DOM.urls !== document.activeElement)
            {
                return;
            }
            DOM.preview.style.opacity = "0";
            timeout_id = setTimeout(() => DOM.preview_image.src = get_selected_url(), 500);
        }
    }();

    function initialize()
    {
        DOM.urls          = document.getElementById('wallpaper-urls');
        DOM.preview_image = document.getElementById('wallpaper-preview-image');
        DOM.preview  = document.getElementById('wallpaper-preview');

        ['click', 'keyup', 'input'].forEach(event =>
        {
            DOM.urls.addEventListener(event, update_preview)
        });
        DOM.preview_image.addEventListener('load', () =>
        {
            DOM.preview.href = DOM.preview_image.src;
            setTimeout(() => { DOM.preview.style.opacity = "1"; }, 50);
        });
    }
    document.addEventListener('DOMContentLoaded', initialize);
}
