{
    const options = NTT.OptionsUI.NewTab.Background =
    {
        Animation: null,

        initialize: null,

        get: null,
        set: null,

        change_listeners: []
    };

    // This will contain DOM elements proceeding a call to initialize().
    const DOM =
    {
        color: null
    };

    options.get = function()
    {
        return {
            color: DOM.color.value,

            do_animate:         options.Animation.is_enabled(),
            animation_duration: options.Animation.get_duration()
        };
    };
    options.set = function(cfg)
    {
        DOM.color.value = cfg.color;

        if (cfg.do_animate) { options.Animation.enable();  }
        else                { options.Animation.disable(); }

        options.Animation.set_duration(cfg.animation_duration);
    };

    // Invoked when the represented configuration changes.
    function on_change()
    {
        options.change_listeners.forEach(listener => listener());
    }

    options.initialize = function()
    {
        DOM.color = document.getElementById('bg-color');
        DOM.color.addEventListener('input', on_change);

        options.Animation.initialize();
        options.Animation.change_listeners.push(on_change);
    };
}
