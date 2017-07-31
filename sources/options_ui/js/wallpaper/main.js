{
    // This will contain DOM elements proceeding a call to initialize().
    const DOM =
    {
        is_enabled: null,
        panels:     [],
    };

    // Updates the visibility of relevant panels depending on whether a wallpaper is enabled or not.
    function update()
    {
        const value = DOM.is_enabled.checked ? "block" : "none";
        DOM.panels.forEach(panel => { panel.style.display = value; });
    }

    function initialize()
    {
        DOM.is_enabled = document.getElementById('do-display-wallpaper');
        DOM.panels     = document.querySelectorAll('.requires-wallpaper');

        DOM.is_enabled.addEventListener('change', update);
        update();
    }
    document.addEventListener('DOMContentLoaded', initialize);
}
