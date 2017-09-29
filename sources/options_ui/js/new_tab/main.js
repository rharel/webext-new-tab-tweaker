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
        top_sites:    null
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
                wallpaper:  options_ui.wallpaper.get(),
                top_sites:  options_ui.top_sites.get()
            }
        };
    }
    function set(options)
    {
        options_ui.behavior.set(options.behavior);
        options_ui.redirection.set(options.redirect.url);
        options_ui.background.set(options.custom_page.background);
        options_ui.wallpaper.set(options.custom_page.wallpaper);
        options_ui.top_sites.set(options.custom_page.top_sites);
    }

    function initialize()
    {
        for (let component in options_ui)
        {
            if (!options_ui.hasOwnProperty(component)) { continue; }

            options_ui[component].initialize();
            options_ui[component].add_change_listener(change_listeners.notify);
        }
    }

    define(
    [
        "common_ui/subscription_service",
        "./behavior",
        "./redirection",
        "./background/main",
        "./wallpaper/main",
        "./top_sites"
    ],
    function(subscription_service, behavior, redirection, background, wallpaper, top_sites)
    {
        options_ui.behavior    = behavior;
        options_ui.redirection = redirection;
        options_ui.background  = background;
        options_ui.wallpaper   = wallpaper;
        options_ui.top_sites   = top_sites;

        change_listeners  = subscription_service.setup();

        return {
            initialize: initialize,

            get: get,
            set: set,

            add_change_listener: change_listeners.add
        };
    });
})();
