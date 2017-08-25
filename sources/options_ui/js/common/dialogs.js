(function()
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
	function open(dialog)
	{
		if (active_dialog !== null) { close(); }

		DOM.shadow.style.display = "flex";

		active_dialog = dialog;
		active_dialog.style.display = "block";
	}
	// Hides the active dialog.
	// It is assumed that it is a child of '#dialog-content'.
	function close()
	{
		if (active_dialog !== null)
		{
			active_dialog.style.display = "none";
			active_dialog = null;
		}
		DOM.shadow.style.display = "none";
	}

	function initialize()
	{
		DOM.shadow  = document.getElementById('dialog-shadow');
		DOM.content = document.getElementById('dialog-content');

		// Close the dialog if the user clicks on anything but the dialog
		// content.
		DOM.shadow.addEventListener('click', close);

		// Clicking the shadow closes the dialog, so don't allow clicks on the
		// content to bubble up to the shadow.
		DOM.content.addEventListener('click', event => event.stopPropagation());
	}

	define({
        initialize: initialize,

        open:  open,
        close: close
    });
})();
