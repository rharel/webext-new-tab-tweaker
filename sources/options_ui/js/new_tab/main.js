{
    const options = NTT.OptionsUI.NewTab =
    {
        Behavior:    null,
        Redirection: null,
        Background:  null,
        Wallpaper:   null,

        initialize: null,

        get: null,
        set: null,

        change_listeners: []
    };

    options.get = function()
    {
        return {
            behavior: options.Behavior.get(),

            redirect:
            {
                url: options.Redirection.get()
            },
            custom_page:
            {
                background: options.Background.get(),
                wallpaper:  options.Wallpaper.get()
            }
        };
    };
    options.set = function(cfg)
    {
        options.Behavior.set(cfg.behavior);
        options.Redirection.set(cfg.redirect.url);
        options.Background.set(cfg.custom_page.background);
        options.Wallpaper.set(cfg.custom_page.wallpaper);
    };

    // Invoked when the represented configuration changes.
    function on_change()
    {
        options.change_listeners.forEach(listener => listener());
    }

    options.initialize = function()
    {
        options.Behavior.initialize();
        options.Behavior.change_listeners.push(on_change);

        options.Redirection.initialize();
        options.Redirection.change_listeners.push(on_change);

        options.Background.initialize();
        options.Background.change_listeners.push(on_change);

        options.Wallpaper.initialize();
        options.Wallpaper.change_listeners.push(on_change);
    };
}
