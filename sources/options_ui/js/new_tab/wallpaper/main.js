{
    const options = NTT.OptionsUI.NewTab.Wallpaper =
    {
        URLs:      null,
        Animation: null,

        initialize: null,

        get: null,
        set: null,

        change_listeners: []
    };

    // This will contain DOM elements proceeding a call to initialize().
    const DOM =
    {
        is_enabled: null,
        panels:     []
    };

    options.get = function()
    {
        return {
            is_enabled: DOM.is_enabled.checked,

            urls: options.URLs.get(),

            do_animate:         options.Animation.is_enabled(),
            animation_duration: options.Animation.get_duration()
        };
    };
    options.set = function(cfg)
    {
        DOM.is_enabled.checked = cfg.is_enabled;

        options.URLs.set(cfg.urls);

        if (cfg.do_animate) { options.Animation.enable();  }
        else                { options.Animation.disable(); }

        options.Animation.set_duration(cfg.animation_duration);

        update();
    };

    // Updates the display of relevant panels depending on whether a wallpaper is enabled or not.
    function update()
    {
        const value = DOM.is_enabled.checked ? "block" : "none";
        DOM.panels.forEach(panel => { panel.style.display = value; });
    }

    // Invoked when the represented configuration changes.
    function on_change()
    {
        options.change_listeners.forEach(listener => listener());
    }

    options.initialize = function()
    {
        DOM.is_enabled = document.getElementById('do-display-wallpaper');
        DOM.panels     = document.querySelectorAll('.requires-wallpaper');

        DOM.is_enabled.addEventListener('change', () =>
        {
            update();
            on_change();
        });

        options.URLs.initialize();
        options.URLs.change_listeners.push(on_change);

        options.Animation.initialize();
        options.Animation.change_listeners.push(on_change);
    };
}
