{
	// The extension's client ID for the Imgur API.
	const CLIENT_ID = "fa33f3c2374faf9";

	// Returns true iff the specified album URL is valid.
	function is_valid_album_url(url)
	{
		return /^(https?:\/\/)?(www\.)?imgur\.com\/a\/.+$/.test(url);
	}
	// Extracts the album hash from an album URL.
	function extract_album_hash(url)
	{
		return url.replace(/^(https?:\/\/)?(www\.)?imgur\.com\/a\//, '');
	}

	// Gets a list of all image URLs of the specified album through an XHR.
	// On success, invokes the specified callback with the retrieved urls.
	function get_album_image_urls(album_url, on_success, on_error)
	{
		album_url = album_url.trim();

		if (!is_valid_album_url(album_url) &&
			on_error !== undefined)
		{
			on_error();
		}

		const album_hash = extract_album_hash(album_url);

		const xhr = new XMLHttpRequest();
		xhr.onreadystatechange = () =>
		{
			if (xhr.readyState === XMLHttpRequest.DONE)
			{
				if (xhr.status === 200)  // success
				{
					const data = JSON.parse(xhr.responseText).data;
					const urls = data.map(item => item.link);
					on_success(urls);
				}
				else if (on_error !== undefined)
				{
					on_error();
				}
			}
		};
		xhr.open("GET", `https://api.imgur.com/3/album/${album_hash}/images`);
		xhr.setRequestHeader("Authorization", `Client-ID ${CLIENT_ID}`);
		xhr.send();
	}

	NTT.OptionsUI.Imgur =
	{
		is_valid_album_url:   is_valid_album_url,
		extract_album_hash:   extract_album_hash,
		get_album_image_urls: get_album_image_urls
	};
}
