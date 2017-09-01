(function()
{
    // The extension's client ID for the API.
    const CLIENT_ID = "fa33f3c2374faf9";

    // URL validation methods.
    function is_album_url(url)
    {
        return /^(https?:\/\/)?(www\.)?imgur\.com\/a\/.+$/.test(url);
    }
    function is_gallery_url(url)
    {
        return /^(https?:\/\/)?(www\.)?imgur\.com\/gallery\/.+$/.test(url);
    }

    // Extracts a resource (album/gallery) hash from a URL.
    function extract_resource_hash(url)
    {
        return url.replace(/^(https?:\/\/)?(www\.)?imgur\.com\/(a|gallery)\//, '');
    }

    // Extracts image URLs from the API response for an album's images query.
    function get_urls_from_album_images_model(images)
    {
        return images.map(item => item.link);
    }
    // Extracts image URLs from the API response for a gallery query.
    function get_urls_from_gallery_model(gallery)
    {
        function get_urls_from_gallery_item(item)
        {
            if (item.is_album)
            {
                return get_urls_from_album_images_model(item.images);
            }
            else
            {
                return [item.link];
            }
        }
        if (gallery.hasOwnProperty("items"))
        {
            return gallery.items.reduce((urls, item) =>
            {
                return urls.concat(get_urls_from_gallery_item(item));
            }, []);
        }
        else
        {
            return get_urls_from_gallery_item(gallery);
        }
    }

    // Extract all image URLs from the given resource URL. The resource in question is either an
    // album or gallery.
    // On success, invokes the specified callback with the retrieved urls. Invokes the specified
    // error callback otherwise.
    function get_resource_image_urls(resource_url, on_success, on_error)
    {
        resource_url = resource_url.trim();

        const hash = extract_resource_hash(resource_url);
        let endpoint, get_urls;
        if (is_album_url(resource_url))
        {
            endpoint = `https://api.imgur.com/3/album/${hash}/images`;
            get_urls = get_urls_from_album_images_model;
        }
        else if (is_gallery_url(resource_url))
        {
            endpoint = `https://api.imgur.com/3/gallery/${hash}`;
            get_urls = get_urls_from_gallery_model;
        }
        else
        {
            if (on_error !== undefined) { on_error(resource_url); }
            return;
        }

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () =>
        {
            if (xhr.readyState === XMLHttpRequest.DONE)
            {
                if (xhr.status === 200)  // success
                {
                    const data = JSON.parse(xhr.responseText).data;
                    on_success(get_urls(data));
                }
                else if (on_error !== undefined)
                {
                    on_error(resource_url);
                }
            }
        };
        xhr.open("GET", endpoint);
        xhr.setRequestHeader("Authorization", `Client-ID ${CLIENT_ID}`);
        xhr.send();
    }

    define({
        is_album_url:            is_album_url,
        is_gallery_url:          is_gallery_url,
        extract_resource_hash:   extract_resource_hash,
        get_resource_image_urls: get_resource_image_urls
    });
})();
