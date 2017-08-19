requirejs.config(
{
    paths:
    {
        "common": "common/js",
    }
});
requirejs(
[
    "common/configuration",
    "background_scripts/image_context_menu"
]);
NTT = {};
