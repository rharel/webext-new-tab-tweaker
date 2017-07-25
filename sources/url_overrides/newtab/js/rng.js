{
	// Generates a random integer on the interval [min, max].
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

	NTT.RNG =
	{
		integer_in_range: integer_in_range
	};
}
