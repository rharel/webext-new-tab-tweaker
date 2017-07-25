{
	// This will contain DOM elements proceeding a call to initialize().
	const DOM =
	{
		shadow: null,
		content: null
	};
	// Contains the currently active dialog element (or null if no dialog is active).
	let active_dialog = null;

	// Displays the specified element as a dialog.
	// It is assumed that it is a child of '#dialog-content'.
	function activate_dialog(dialog)
	{
		if (active_dialog !== null)
		{
			hide_active_dialog();
		}

		DOM.shadow.style.display  = "block";
		DOM.content.style.display = "block";

		active_dialog = dialog;
		active_dialog.style.display = "block";
	}
	// Hides the active dialog.
	// It is assumed that it is a child of '#dialog-content'.
	function hide_active_dialog()
	{
		if (active_dialog !== null)
		{
			active_dialog.style.display = "none";
			active_dialog = null;
		}
		DOM.content.style.display = "none";
		DOM.shadow.style.display  = "none";
	}

	function initialize()
	{
		DOM.shadow  = document.getElementById('dialog-shadow');
		DOM.content = document.getElementById('dialog-content');

		// Close the dialog if the user clicks on anything but the dialog
		// content.
		DOM.shadow.addEventListener('click', hide_active_dialog);

		// Clicking the shadow closes the dialog, so don't allow clicks on the
		// content to bubble up to the shadow.
		DOM.content.addEventListener('click', event => event.stopPropagation());

		NTT.OptionsUI.Dialog =
		{
			open:  activate_dialog,
			close: hide_active_dialog
		};
	}
	document.addEventListener('DOMContentLoaded', initialize);
}
