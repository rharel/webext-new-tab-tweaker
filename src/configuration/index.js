if (window.CustomNewTab === undefined)
{
	window.CustomNewTab = {};
}
window.CustomNewTab.Configuration =
{
	CURRENT_VERSION: CURRENT_VERSION,

	is_valid_version_object: is_valid_version_object,
	compare_versions: compare_versions,

	TabBehavior: TabBehavior,
	ImageSource: ImageSource,

	DEFAULT_REDIRECTION_CONFIGURATION: DEFAULT_REDIRECTION_CONFIGURATION,
	DEFAULT_CUSTOM_PAGE_CONFIGURATION: DEFAULT_CUSTOM_PAGE_CONFIGURATION,
	DEFAULT_CONFIGURATION: DEFAULT_CONFIGURATION,

	validate: validate,

	load: load,
	save: save
};
