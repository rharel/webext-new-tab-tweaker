{
    // This will contain DOM elements proceeding a call to initialize().
    const DOM =
    {
        urls:    null,
        preview: null,
    };

    // Gets the line containing current selection start.
    function get_selected_url()
    {
        const text = DOM.urls.value,
              s    = DOM.urls.selectionEnd;

        let i, j;
        for (j = s    ; j < text.length && text[j] !== "\n"; ++j) {}
        for (i = s - 1; i > 0           && text[i] !== "\n"; --i) {}

        return text.substring(i, j).trim();
    }
    const update_preview = function()
    {
        let timeout_id;

        // Updates the preview image based on the selected url.
        return function()
        {
            clearTimeout(timeout_id);

            if (DOM.preview.style.display === "none" ||
                DOM.urls !== document.activeElement)
            {
                return;
            }
            timeout_id = setTimeout(() => DOM.preview.src = get_selected_url(), 500);
        }
    }();

    function initialize()
    {
        DOM.urls    = document.getElementById('wallpaper-urls');
        DOM.preview = document.getElementById('wallpaper-preview');

        ['click', 'keyup'].forEach(event => DOM.urls.addEventListener(event, update_preview));
    }
    document.addEventListener('DOMContentLoaded', initialize);
}
