(function()
{
    // Set in define().
    let change_listeners;
    const options_ui =
    {
        behavior:     null,
        redirection:  null,
        background:   null,
        wallpaper:    null,
    };

    function get()
    {
        return {
            behavior: options_ui.behavior.get(),

            redirect:
            {
                url: options_ui.redirection.get()
            },
            custom_page:
            {
                background: options_ui.background.get(),
                wallpaper:  options_ui.wallpaper.get()
            }
        };
    }
    function set(options)
    {
        options_ui.behavior.set(options.behavior);
        options_ui.redirection.set(options.redirect.url);
        options_ui.background.set(options.custom_page.background);
        options_ui.wallpaper.set(options.custom_page.wallpaper);
    }

    function initialize()
    {
        options_ui.behavior.initialize();
        options_ui.behavior.add_change_listener(change_listeners.notify);

        options_ui.redirection.initialize();
        options_ui.redirection.add_change_listener(change_listeners.notify);

        options_ui.background.initialize();
        options_ui.background.add_change_listener(change_listeners.notify);

        options_ui.wallpaper.initialize();
        options_ui.wallpaper.add_change_listener(change_listeners.notify);
    }

    define(
    [
        "common_ui/subscription_service",
        "./behavior",
        "./redirection",
        "./background/main",
        "./wallpaper/main"
    ],
    function(subscription_service, behavior, redirection, background, wallpaper)
    {
        options_ui.behavior    = behavior;
        options_ui.redirection = redirection;
        options_ui.background  = background;
        options_ui.wallpaper   = wallpaper;

        change_listeners  = subscription_service.setup();

        return {
            initialize: initialize,

            get: get,
            set: set,

            add_change_listener: change_listeners.add
        };
    });
})();
