(function()
{
    // These will contain DOM elements proceeding a call to initialize().
    let
		tb_redirect_radio,
		tb_redirect_options_panel;
    let
		tb_custom_page_radio,
		tb_custom_page_options_panel;
	let
		active_panel;
	let
		tb_cp_bg_image_source,
		tb_cp_bg_image_options_panel;

	/**
	 * Sets the active panel to the specified value.
	 *
	 * @param panel
	 * 		The panel to activate.
	 */
    function set_active_panel(panel)
	{
		active_panel.style.display = "none";
		active_panel = panel;
		active_panel.style.display = "block";
	}
    /**
     * Activates the appropriate options panel based on the selected tab
     * behavior.
     */
    function update_active_options_panel()
    {
    	if (tb_redirect_radio.checked)
		{
			set_active_panel(tb_redirect_options_panel);
		}
    	else if (tb_custom_page_radio.checked)
    	{
    		set_active_panel(tb_custom_page_options_panel);
    	}
    }

	/**
	 * Updates the visibility of secondary background image options based on
	 * the value of the background image type dropdown.
	 */
    function update_background_image_options_visibility()
	{
		if (tb_cp_bg_image_source.value === "none")
		{
			tb_cp_bg_image_options_panel.style.display = "none";
		}
		else
		{
			tb_cp_bg_image_options_panel.style.display = "block";
		}
	}

    /**
     * Initializes element variables.
     */
    function initialize()
    {
    	tb_redirect_radio = document.getElementById('tb-redirect-radio');
    	tb_custom_page_radio = document.getElementById('tb-custom-page-radio');

    	tb_redirect_options_panel =
			document.getElementById('tb-redirect-options-panel');
		tb_custom_page_options_panel =
			document.getElementById('tb-custom-page-options-panel');

        active_panel = tb_redirect_options_panel;

        tb_redirect_radio
			.addEventListener('click', update_active_options_panel);
        tb_custom_page_radio
			.addEventListener('click', update_active_options_panel);

		update_active_options_panel();

		tb_cp_bg_image_source =
			document.getElementById('tb-cp-bg-image-source');
		tb_cp_bg_image_options_panel =
			document.getElementById('tb-cp-bg-image-options-panel');

		tb_cp_bg_image_source
			.addEventListener('click', update_background_image_options_visibility);

		update_background_image_options_visibility();
    }

    document.addEventListener('DOMContentLoaded', initialize);

	if (window.CustomNewTab === undefined)
	{
		window.CustomNewTab = {};
	}
    window.CustomNewTab.OptionsUIControls =
	{
		update: () =>
		{
			update_active_options_panel();
			update_background_image_options_visibility();
		}
	};
})();
