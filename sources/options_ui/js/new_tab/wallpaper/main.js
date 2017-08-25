(function()
{
    // Set in define().
    let change_listeners;
    const options =
    {
        animation:              null,
        url_list:               null,
        url_list_download:      null,
        url_list_image_preview: null,
        url_list_imgur_import:  null
    };

    // This will contain DOM elements proceeding a call to initialize().
    const DOM =
    {
        is_enabled: null,
        panels:     []
    };

    function get()
    {
        return {
            is_enabled: DOM.is_enabled.checked,

            urls: options.url_list.get(),

            do_animate:         options.animation.is_enabled(),
            animation_duration: options.animation.get_duration()
        };
    }
    function set(cfg)
    {
        DOM.is_enabled.checked = cfg.is_enabled;

        options.url_list.set(cfg.urls);

        if (cfg.do_animate) { options.animation.enable();  }
        else                { options.animation.disable(); }

        options.animation.set_duration(cfg.animation_duration);

        update_wallpaper_option_panels_visibility();
    }

    // Updates the display of relevant panels depending on whether a wallpaper is enabled or not.
    function update_wallpaper_option_panels_visibility()
    {
        const value = DOM.is_enabled.checked ? "block" : "none";
        DOM.panels.forEach(panel => { panel.style.display = value; });
    }

    function initialize()
    {
        DOM.is_enabled = document.getElementById('do-display-wallpaper');
        DOM.panels     = document.querySelectorAll('.requires-wallpaper');

        DOM.is_enabled.addEventListener('change', () =>
        {
            update_wallpaper_option_panels_visibility();
            change_listeners.notify();
        });

        options.animation.initialize();
        options.animation.add_change_listener(change_listeners.notify);

        options.url_list.initialize();
        options.url_list.add_change_listener(change_listeners.notify);

        options.url_list_download.initialize();
        options.url_list_image_preview.initialize();
        options.url_list_imgur_import.initialize();
    }

    define(
    [
        "common_ui/subscription_service",
        "./animation",
        "./url_list",
        "./url_list_download",
        "./url_list_image_preview",
        "./url_list_imgur_import"
    ],
    function(subscription_service,
             animation, url_list, url_list_download, url_list_image_preview, url_list_imgur_import)
    {
        options.animation              = animation;
        options.url_list               = url_list;
        options.url_list_download      = url_list_download;
        options.url_list_image_preview = url_list_image_preview;
        options.url_list_imgur_import  = url_list_imgur_import;

        change_listeners = subscription_service.setup();

        return {
            initialize: initialize,

            get: get,
            set: set,

            add_change_listener: change_listeners.add
        };
    });
})();
