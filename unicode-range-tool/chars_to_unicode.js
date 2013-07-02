function toUnicodeRange(input)
{
	var output = '';
	var chars = input.split('').sort();
	var rangeStart = NaN;
	var lastCode = NaN;
	
	function endRange()
	{
		//end last range if present
		if (output.length)
		{
			if (rangeStart == lastCode)
			{
				output += ',';
			}
			else
			{
				output += '-U+' + lastCode.toString(16).toUpperCase() + ',';
			}
		}
	}
	
	for (var i = 0; i < chars.length; i++)
	{
		var char = chars[i];
		var code = char.charCodeAt(0);
		if (code == lastCode)
		{
			continue;
		}
		if (code != lastCode + 1)
		{
			endRange();
			
			//start new range
			output += 'U+' + code.toString(16).toUpperCase();
			rangeStart = code;
		}
		lastCode = code;
	}
	endRange();
	return output.substr(0, output.length - 1);
}

function expandCharRanges(input)
{
	var output = '';
	var ranges = input.split(/\s*,\s*/);
	for (var i = 0; i < ranges.length; i++)
	{
		var range = ranges[i].split(/\s*-\s*/);
		if (range.length < 2)
		{
			continue;
		}
		var start = range[0].charCodeAt(0);
		var end = range[1].charCodeAt(0);
		for (var j = start; j <= end; j++)
		{
			output += String.fromCharCode(j);
		}
	}
	return output;
}

function displayUnicodeRange()
{
	var ranges = [];
	var result = toUnicodeRange(expandCharRanges(document.toUnicode.ranges.value));
	result && ranges.push(result);
	result = toUnicodeRange(document.toUnicode.input.value);
	result && ranges.push(result);
	document.toUnicode.output.value = ranges.join(',');
	return false;
}