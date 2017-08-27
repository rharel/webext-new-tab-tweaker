NTT.Notifications = {
	notification_ids: [],
	notify: function(notification_id, message){
		var title = browser.runtime.getManifest().name;
		
		// Do not display the same message twice by using a notification_id
		browser.notifications.create(notification_id,
		{
			type: "basic",
			iconUrl: browser.extension.getURL("icons/main_64.png"),
			title: title,
			message: message
		});

		// Add notificationId to notificationIds, so we can clear it later
		NTT.Notifications.notification_ids.push(notification_id);

		setTimeout(function()
		{
			// Clear the first (oldest) notification
			browser.notifications.clear(NTT.Notifications.notification_ids.shift());
		}, 2200);
	}
}