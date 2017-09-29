(function()
{
    // Set in define().
    let configuration, background, wallpaper, top_sites;

    // This will contain DOM elements proceeding a call to initialize().
    const DOM =
    {
        customize_page_button: null
    };

    // Applies redirection behavior.
    function apply_redirection_options(options)
    {
        let url = options.url;

        if (!url.startsWith("http://") &&
            !url.startsWith("https://"))
        {
            url = `http://${url}`
        }

        window.location.replace(url);
    }
    // Applies custom page behavior.
    function apply_custom_page_options(options)
    {
        background.apply_options(options.background);
        wallpaper.apply_options(options.wallpaper);
        top_sites.apply_options(options.top_sites)
    }
    // Applies the specified configuration to the page.
    function apply_options(options)
    {
        const TabBehavior = configuration.TabBehavior;

        if (options.new_tab.behavior === TabBehavior.Redirect &&
            options.new_tab.redirect.url !== window.location)
        {
            apply_redirection_options(options.new_tab.redirect);
        }
        else if (options.new_tab.behavior === TabBehavior.DisplayCustomPage)
        {
            apply_custom_page_options(options.new_tab.custom_page);
        }
    }
    function initialize()
    {
        background.initialize();
        wallpaper.initialize();

        configuration.storage.load().then(apply_options);

        DOM.customize_page_button = document.getElementById('customize-button');
        DOM.customize_page_button.addEventListener('click', event =>
        {
            event.stopPropagation();
            browser.runtime.openOptionsPage();
        });
    }

    requirejs.config(
    {
        paths:
        {
            "common": "../../../common/js",
        }
    });
    define(
    [
        "common/after_page_load",
        "common/configuration",

        "./background",
        "./wallpaper/main",
        "./top_sites"
    ],
    function(after_page_load,
             configuration_module,
             background_module, wallpaper_module, top_sites_module)
    {
        configuration = configuration_module;
        background    = background_module;
        wallpaper     = wallpaper_module;
        top_sites     = top_sites_module;

        after_page_load.do(initialize);
    });
})();
