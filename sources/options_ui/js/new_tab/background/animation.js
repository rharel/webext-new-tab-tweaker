{
    const options = NTT.OptionsUI.NewTab.Background.Animation =
    {
        initialize: null,

        is_enabled:   null,
        enable:       null,
        disable:      null,

        get_duration: null,
        set_duration: null,

        change_listeners: []
    };

    // This will contain DOM elements proceeding a call to initialize().
    const DOM =
    {
        is_enabled: null,
        duration:   null
    };

    options.is_enabled = function() { return DOM.is_enabled.checked;            };
    options.enable     = function() { DOM.is_enabled.checked = true;  update(); };
    options.disable    = function() { DOM.is_enabled.checked = false; update(); };

    options.get_duration = function()      { return clamp(DOM.duration); };
    options.set_duration = function(value) { DOM.duration.value = value; };

    // Updates activation status of the numeric control based on whether animation is
    // enabled or not.
    function update()
    {
        DOM.duration.disabled = !DOM.is_enabled.checked;
    }

    // Invoked when the represented configuration changes.
    function on_change()
    {
        options.change_listeners.forEach(listener => listener());
    }

    function clamp(numeric)
    {
        const min = numeric.min,
              max = numeric.max,
              x   = numeric.value;

        return Math.min(Math.max(x, min), max);
    }

    options.initialize = function()
    {
        DOM.is_enabled = document.getElementById('do-animate-bg-color');
        DOM.duration   = document.getElementById('bg-color-animation-duration');

        DOM.is_enabled.addEventListener('change', () =>
        {
            update();
            on_change();
        });
        DOM.duration.addEventListener('input', on_change);
        DOM.duration.addEventListener('change', () =>
        {
            DOM.duration.value = clamp(DOM.duration);
        });
    };
}
