(function()
{
    // This will contain DOM elements proceeding a call to initialize().
    const DOM =
    {
        background: null
    };

    // Fades-in the background color over the specified duration (in seconds).
    function fade_in_background(color, duration)
    {
        if (duration > 0)
        {
            DOM.background.style.transition =
                `background-color ${duration}s ease`;

            // Allow the DOM some time to update before initiating animation,
            // otherwise it may be skipped.
            setTimeout(() =>
            {
                DOM.background.style.backgroundColor = color;
            }, 50);
        }
        else
        {
            DOM.background.style.backgroundColor = color;
        }
    }
    // Applies the specified options to the page.
    function apply_options(options)
    {
        fade_in_background(
            options.color,
            options.do_animate ? options.animation_duration : 0
        );
    }

    function initialize()
    {
        DOM.background = document.getElementById('background');
    }

    define({
        initialize:    initialize,
        apply_options: apply_options
    });
})();
