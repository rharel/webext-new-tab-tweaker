(function()
{
    // These will contain DOM elements proceeding a call to initialize().
    let redirect_tab_radio, redirect_tab_panel;
	let color_tab_radio, color_tab_panel;
    let image_tab_radio, image_tab_panel;
	let active_panel;

	/**
	 * Activates the specified options panel, and deactivates all others.
	 *
	 * @param panel
	 * 		The panel to activate.
	 */
    function activate_options_panel(panel)
	{
		active_panel.style.display = "none";
		active_panel = panel;
		active_panel.style.display = "block";
	}

    /**
     * Activates the appropriate options panel based on the selected background
     * type.
     */
    function update_active_options_panel()
    {
    	if (redirect_tab_radio.checked)
		{
			activate_options_panel(redirect_tab_panel);
		}
    	else if (color_tab_radio.checked)
    	{
    		activate_options_panel(color_tab_panel);
    	}
        else if (image_tab_radio.checked)
        {
        	activate_options_panel(image_tab_panel);
        }
    }

    /**
     * Initializes element variables.
     */
    function initialize()
    {
    	redirect_tab_radio = document.getElementById('redirect-tab-radio');
    	color_tab_radio = document.getElementById('color-tab-radio');
        image_tab_radio = document.getElementById('image-tab-radio');

        redirect_tab_panel = document.getElementById('redirect-tab-options');
        color_tab_panel = document.getElementById('color-tab-options');
        image_tab_panel = document.getElementById('image-tab-options');

        active_panel = color_tab_panel;

        redirect_tab_radio.addEventListener('click', update_active_options_panel);
        color_tab_radio.addEventListener('click', update_active_options_panel);
        image_tab_radio.addEventListener('click', update_active_options_panel);
    }

    document.addEventListener('DOMContentLoaded', initialize);

    if (!window.CustomNewTab)
    {
    	window.CustomNewTab = {};
    }
    if (!window.CustomNewTab.OptionsPage)
    {
    	window.CustomNewTab.OptionsPage = {};
    }

    window.CustomNewTab.OptionsPage.update = update_active_options_panel;
})();
