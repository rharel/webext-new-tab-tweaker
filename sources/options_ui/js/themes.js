(function() {
    const Theme = NTT.Configuration.Theme;

    // Set in define().
    let change_listeners;

    // This will contain DOM elements proceeding a call to initialize().
    const DOM =
    {
        theme: null,
        light: null,
        dark:  null
    };

    function get()
    {
        if (DOM.light.checked) { return Theme.Light; }
        else                   { return Theme.Dark;  }
    }
    function set(value)
    {
        if (value === Theme.Light)
        {
            DOM.dark.checked  = false;
            DOM.light.checked = true;
        }
        else if (value === Theme.Dark)
        {
            DOM.light.checked = false;
            DOM.dark.checked  = true;
        }
        update_theme_stylesheet();
    }

    // Applies the theme which corresponds to the selected radio button.
    function update_theme_stylesheet()
    {
        DOM.theme.href = `css/themes/${get()}.css`;
    }

    function initialize()
    {
        DOM.theme = document.getElementById('theme');
        DOM.light = document.getElementById('light-theme-button');
        DOM.dark  = document.getElementById('dark-theme-button');

        [DOM.light, DOM.dark].forEach(item =>
        {
            item.addEventListener('change', () =>
            {
                update_theme_stylesheet();
                change_listeners.notify();
            });
        });
    }

    define(["subscription_service"],
    function(subscription_service)
    {
        change_listeners  = subscription_service.setup();

        return {
            initialize: initialize,

            get: get,
            set: set,

            add_change_listener: change_listeners.add
        };
    });
})();
