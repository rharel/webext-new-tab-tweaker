const
	assert = require('assert'),
	Ordering = require('../../src/common/ordering.js');

describe('ordering enumeration', function()
{
	it ('should have the correct relations between members', function()
	{
		assert.strictEqual(0, Ordering.Equal);
		assert(Ordering.Greater > Ordering.Equal);
		assert(Ordering.Less < Ordering.Equal);
	});
});
