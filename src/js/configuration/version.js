/**
 * The configuration object's layout version.
 */
const CURRENT = create(1, 3, 0);
/**
 * Creates a new version object.
 *
 * @param major
 * 		The major change-set version number.
 * @param minor
 * 		The minor change-set version number.
 * @param patch
 * 		The patch version number.
 */
function create(major, minor, patch)
{
	return {
		major: major,
		minor: minor,
		patch: patch
	};
}
/**
 * Determines whether the specified object represents a valid version
 * object.
 *
 * @param obj
 *        The object to test.
 * @returns
 *        True iff the object is a valid version object.
 */
function is_valid(obj)
{
	/**
	 * Determines whether the specified object is a (non-strict) positive
	 * integer.
	 *
	 * @param obj
	 *        The object to test.
	 * @returns
	 *        True iff the object is a (non-strict) positive integer.
	 */
	function is_positive_integer(obj)
	{
		return Number.isInteger(obj) && obj >= 0;
	}
	return (
		is_positive_integer(obj.major) &&
		is_positive_integer(obj.minor) &&
		is_positive_integer(obj.patch)
	);
}
/**
 * Determines whether one version is greater, lesser, or equal than/to
 * another.
 *
 * @param first
 * 		The first version object.
 * @param second
 * 		The second version object.
 * @returns
 * 		An ordering descriptor with relation to 'first' and 'second'.
 */
function compare(first, second)
{
	const Ordering = NTT.Ordering;
	const
		parts_of_first = [first.major, first.minor, first.patch],
		parts_of_second = [second.major, second.minor, second.patch];

	for (let i = 0; i < 3; ++i)
	{
		const
			first_part = parts_of_first[i],
			second_part = parts_of_second[i];

		if (first_part > second_part)
		{
			return Ordering.Greater;
		}
		else if (first_part < second_part)
		{
			return Ordering.Less;
		}
	}
	return Ordering.Equal;
}
/**
 * Represent the specified version as a string.
 *
 * @param version
 * 		The version object to represent.
 * @returns
 *		A human-readable string representing the specified version.
 */
function as_string(version)
{
	return `${version.major}.${version.minor}.${version.patch}`;
}

window.NTT.Configuration.Version =
{
	CURRENT: CURRENT,

	create: create,
	is_valid: is_valid,
	compare: compare,
	as_string: as_string
};
