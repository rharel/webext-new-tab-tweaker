(function()
{
    // Set in define().
    let change_listeners;
    const options =
    {
        animation: null
    };

    // This will contain DOM elements proceeding a call to initialize().
    const DOM =
    {
        color: null
    };

    function get()
    {
        return {
            color: DOM.color.value,

            do_animate:         options.animation.is_enabled(),
            animation_duration: options.animation.get_duration()
        };
    }
    function set(cfg)
    {
        DOM.color.value = cfg.color;

        if (cfg.do_animate) { options.animation.enable();  }
        else                { options.animation.disable(); }

        options.animation.set_duration(cfg.animation_duration);
    }

    function initialize()
    {
        DOM.color = document.getElementById("bg-color");
        DOM.color.addEventListener("input", change_listeners.notify);

        options.animation.initialize();
        options.animation.add_change_listener(change_listeners.notify);
    }

    define(["common_ui/subscription_service", "./animation"],
    function(subscription_service, animation)
    {
        options.animation = animation;

        change_listeners = subscription_service.setup();

        return {
            initialize: initialize,

            get: get,
            set: set,

            add_change_listener: change_listeners.add
        };
    });
})();
