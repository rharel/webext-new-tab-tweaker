(function() {
"use strict";

/**
 * Generates a random integer on the interval [min, max].
 *
 * @param min
 * 		Interval minimum bound.
 * @param max
 * 		Interval maximum bound.
 * @returns
 * 		An integer within [min, max].
 */
function integer_in_range(min, max)
{
	if (min > max)
	{
		const buffer = max;
		max = min;
		min = buffer;
	}

	return min + Math.floor(Math.random() * (max - min + 1));
}

window.NTT.RNG =
{
	integer_in_range: integer_in_range
};
}());
