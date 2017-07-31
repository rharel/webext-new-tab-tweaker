{
    // This will contain DOM elements proceeding a call to initialize().
    const DOM =
    {
        is_enabled: null,
        duration:   null,
    };

    // Updates activation status of the numeric control based on whether wallpaper animation is
    // enabled or not.
    function update()
    {
        DOM.duration.disabled = !DOM.is_enabled.checked;
    }

    function initialize()
    {
        DOM.is_enabled = document.getElementById('do-animate-wallpaper');
        DOM.duration   = document.getElementById('wallpaper-animation-duration');

        DOM.is_enabled.addEventListener('change', update);
        DOM.duration.addEventListener('change', () =>
        {
            const min = DOM.duration.min,
                  max = DOM.duration.max,
                  x   = DOM.duration.value;

            DOM.duration.value = Math.min(Math.max(x, min), max);
        });
        update();
    }
    document.addEventListener('DOMContentLoaded', initialize);
}
