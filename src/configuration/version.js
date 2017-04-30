/**
 * The configuration object's layout version.
 */
const CURRENT_VERSION =
{
	major: 1,
	minor: 0,
	patch: 0
};
/**
 * Determines whether the specified object represents a valid version
 * object.
 *
 * @param obj
 *        The object to test.
 * @returns
 *        True iff the object is a valid version object.
 */
function is_valid_version_object(obj)
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
 * 		A positive integer if first > second,
 *      a negative integer if first < second,
 *      and zero if first == second.
 */
function compare_versions(first, second)
{
	const
		GREATER = 1,
		LESSER = -1,
		EQUAL = 0;

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
			return GREATER;
		}
		else if (first_part < second_part)
		{
			return LESSER;
		}
	}
	return EQUAL;
}

if (module !== 'undefined' &&
	module.exports !== 'undefined')  // support Node.js for testing purposes
{
	module.exports = exports =
	{
		CURRENT_VERSION: CURRENT_VERSION,

		is_valid_version_object: is_valid_version_object,
		compare_versions: compare_versions
	};
}