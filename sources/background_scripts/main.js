requirejs.config(
{
    paths:
    {
        "common": "../common/js",
    }
});
requirejs(
[
    "common/configuration",
    "./image_context_menu"
]);
