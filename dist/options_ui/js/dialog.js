(function() {
	/**
	 * This will contain DOM elements proceeding a call to initialize().
	 */
	const DOM =
	{
		shadow: null,
		content: null
	};
	let active_dialog = null;

	function show_dialog(dialog)
	{
		DOM.shadow.style.display = "block";
		DOM.content.style.display = "block";
		active_dialog = dialog;
		active_dialog.style.display = "block";

	}
	function hide_active_dialog()
	{
		if (active_dialog !== null)
		{
			active_dialog.style.display = "none";
			active_dialog = null;
		}
		DOM.content.style.display = "none";
		DOM.shadow.style.display = "none";
	}

	function initialize()
	{
		DOM.shadow =
			document.getElementById('dialog-shadow');
		DOM.content =
			document.getElementById('dialog-content');

		DOM.shadow.addEventListener('click', hide_active_dialog);

		// Clicking the shadow closes the dialog, so don't allow clicks on the
		// content to bubble up to the shadow.
		DOM.content
			.addEventListener('click', event => event.stopPropagation());

		window.NTT.OptionsUI.Dialog =
		{
			open: show_dialog,
			close: hide_active_dialog
		};
	}

	document.addEventListener('DOMContentLoaded', initialize);
})();
