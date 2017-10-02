(function()
{
    // Set in define().
    let TopSitesVisibility;
    let change_listeners;

    // This will contain DOM elements proceeding a call to initialize().
    const DOM =
    {
        show:            null,
        show_on_request: null,
        hide:            null
    };

    function get()
    {
        if (DOM.show.checked)
        {
            return { visibility: TopSitesVisibility.Show };
        }
        else if (DOM.show_on_request.checked)
        {
            return { visibility: TopSitesVisibility.ShowOnRequest };
        }
        else
        {
            return { visibility: TopSitesVisibility.Hide };
        }
    }
    function set(value)
    {
        for (let button in DOM)
        {
            if (!DOM.hasOwnProperty(button)) { continue; }
            DOM[button].checked = DOM[button].value === value.visibility;
        }
    }

    function initialize()
    {
        DOM.show            = document.getElementById("show-top-sites-button");
        DOM.show_on_request = document.getElementById("show-top-sites-on-request-button");
        DOM.hide            = document.getElementById("hide-top-sites-button");

        [DOM.show, DOM.show_on_request, DOM.hide].forEach(item =>
        {
            item.addEventListener("change", change_listeners.notify);
        });
    }

    define(["common/configuration", "common_ui/subscription_service"],
    function(configuration, subscription_service)
    {
        TopSitesVisibility = configuration.TopSitesVisibility;
        change_listeners   = subscription_service.setup();

        return {
            initialize: initialize,

            get: get,
            set: set,

            add_change_listener: change_listeners.add
        };
    });
})();
