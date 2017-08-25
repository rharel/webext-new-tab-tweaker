(function()
{
    // Set in define().
    let clamp, setup_subscription_service;

    function setup(activation_checkbox, duration_input)
    {
        function is_enabled() { return activation_checkbox.checked; }

        function enable()  { activation_checkbox.checked = true;  on_activation_change(); }
        function disable() { activation_checkbox.checked = false; on_activation_change(); }

        function get_duration()
        {
            const {value, min, max} = duration_input;
            return clamp(value, min, max);
        }
        function set_duration(value) { duration_input.value = value; }

        // Updates the activation status of the duration numeric control based on whether animation
        // is enabled or not.
        function on_activation_change() { duration_input.disabled = !is_enabled(); }

        // Invoked when the represented configuration changes.
        const change_listeners = setup_subscription_service();

        function initialize()
        {
            activation_checkbox.addEventListener('change', () =>
            {
                on_activation_change();
                change_listeners.notify();
            });
            duration_input.addEventListener('input', change_listeners.notify);
            duration_input.addEventListener('change', () =>
            {
                duration_input.value = get_duration();
            });
        }
        return {
            initialize: initialize,

            is_enabled: is_enabled,

            enable:  enable,
            disable: disable,

            get_duration: get_duration,
            set_duration: set_duration,

            add_change_listener: change_listeners.add
        };
    }
    function setup_from_ids(activation_checkbox_id, duration_input_id)
    {
        return setup(
            document.getElementById(activation_checkbox_id),
            document.getElementById(duration_input_id)
        );
    }

    define(["./numeric_utilities", "./subscription_service"],
    function(numeric_utilities, subscription_service)
    {
        clamp = numeric_utilities.clamp;
        setup_subscription_service = subscription_service.setup;

        return {
            setup:          setup,
            setup_from_ids: setup_from_ids
        };
    });
})();
