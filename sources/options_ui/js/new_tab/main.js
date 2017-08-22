(function()
{
    // Set in define().
    let change_listeners;
    const options =
    {
        behavior:     null,
        redirection:  null,
        background:   null,
        wallpaper:    null,
    };

    function get()
    {
        return {
            behavior: options.behavior.get(),

            redirect:
            {
                url: options.redirection.get()
            },
            custom_page:
            {
                background: options.background.get(),
                wallpaper:  options.wallpaper.get()
            }
        };
    }
    function set(cfg)
    {
        options.behavior.set(cfg.behavior);
        options.redirection.set(cfg.redirect.url);
        options.background.set(cfg.custom_page.background);
        options.wallpaper.set(cfg.custom_page.wallpaper);
    }

    function initialize()
    {
        options.behavior.initialize();
        options.behavior.add_change_listener(change_listeners.notify);

        options.redirection.initialize();
        options.redirection.add_change_listener(change_listeners.notify);

        options.background.initialize();
        options.background.add_change_listener(change_listeners.notify);

        options.wallpaper.initialize();
        options.wallpaper.add_change_listener(change_listeners.notify);
    }

    define(["subscription_service",
            "./behavior", "./redirection", "./background/main", "./wallpaper/main"],
    function(subscription_service, behavior, redirection, background, wallpaper)
    {
        options.behavior    = behavior;
        options.redirection = redirection;
        options.background  = background;
        options.wallpaper   = wallpaper;

        change_listeners  = subscription_service.setup();

        return {
            initialize: initialize,

            get: get,
            set: set,

            add_change_listener: change_listeners.add
        };
    });
})();
