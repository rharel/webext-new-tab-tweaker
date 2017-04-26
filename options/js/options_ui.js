(function()
{   // These will contain form-elements proceeding a call to initialize().
    let solid_bg_radio, solid_bg_options;
    let image_bg_radio, image_bg_options, active_bg_options;

    /**
     * Activates the solid color background-type options panel, and deactivates
     * all others.
     */
    function activate_solid_bg_options()
    {   active_bg_options.style.display = "none";
        active_bg_options = solid_bg_options;
        active_bg_options.style.display = "block";
    }
    /**
     * Activates the image background-type options panel, and deactivates
     * all others.
     */
    function activate_image_bg_options()
    {   active_bg_options.style.display = "none";
        active_bg_options = image_bg_options;
        active_bg_options.style.display = "block";
    }

    /**
     * Activates the appropriate options panel based on the selected background
     * type.
     */
    function update_active_options_panel()
    {   if (solid_bg_radio.checked)
        {   activate_solid_bg_options();
        }
        else if (image_bg_radio.checked)
        {   activate_image_bg_options();
        }
    }

    /**
     * Initializes element variables.
     */
    function initialize()
    {   solid_bg_radio = document.getElementById('solid-bg-radio');
        image_bg_radio = document.getElementById('image-bg-radio');

        solid_bg_options = document.getElementById('solid-bg-options');
        image_bg_options = document.getElementById('image-bg-options');
        active_bg_options = solid_bg_options;

        solid_bg_radio.addEventListener('click', update_active_options_panel);
        image_bg_radio.addEventListener('click', update_active_options_panel);

        window.options_ui = { update: update_active_options_panel };
    }
    document.addEventListener('DOMContentLoaded', initialize);
})();
