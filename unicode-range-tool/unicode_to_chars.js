function expandUnicodeRanges(input)
{
	var output = '';
	var ranges = input.split(/\s*,\s*/);
	for (var i = 0; i < ranges.length; i++)
	{
		var range = ranges[i].split(/\s*-\s*/);
		if (!range.length)
		{
			continue;
		}
		if (range.length == 1)
		{
			output += String.fromCharCode(parseInt(range[0].substr(2), 16));
			continue;
		}
		var start = parseInt(range[0].substr(2), 16); //strip "U+"
		var end = parseInt(range[1].substr(2), 16); //strip "U+"
		for (var j = start; j <= end; j++)
		{
			output += String.fromCharCode(j);
		}
	}
	return output;
}

function displayCharList()
{
	var result = expandUnicodeRanges(document.fromUnicode.ranges.value);
	document.fromUnicode.output.value = result;
	return false;
}