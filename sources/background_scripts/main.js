NTT = {};

NTT.notifyIds = [];

NTT.notify = function(message){
	var title = browser.runtime.getManifest().name;
	// Do not display the same message twice by creating a notifyId
	var notifyId = message.substring(0, 20);

	browser.notifications.create(notifyId,
	{
		type: "basic",
		iconUrl: browser.extension.getURL("icons/main_64.png"),
		title: title,
		message: message
	});

	// Add notifyId to notifyIds, so we can clear it later
	NTT.notifyIds.push(notifyId);

	setTimeout(function(){
		// Clear the first (oldest) notification
		browser.notifications.clear(NTT.notifyIds.shift());
	}, 2200);
}
