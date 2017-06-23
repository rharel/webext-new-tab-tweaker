/**
 * Updates the configuration object's layout to the one specified in the
 * most recent version, but only if the most recent version's layout is incompatible with the
 * old one.
 *
 * @param cfg
 *		The previous version's configuration object.
 * @returns
 * 		An up-to-date configuration object based on the previous one.
 * @note
 * 		If the previous object is compatible with the current version,
 * 	    it is returned instead as-is.
 */
function update(cfg)
{
	const Ordering = NTT.Ordering;
	const Version  = NTT.Configuration.Version;

	// (currently there is no need for migrations, but perhaps in the future).

	return cfg;
}
window.NTT.Configuration.update = update;
