
let attributeEscapes = {
	'&': '&amp;'
	, '"': '&quot;'
	, '<': '&lt;'
}

let evalFunction = new Function('data',
	`with (data.context) {
		try {
			return eval(data.expression);
		} catch (e) {
			return null;
		}
	}`
)

function fetchValue(obj, path) {
	if(typeof obj === 'null' || typeof obj === 'undefined') {
		return null
	}
	return evalFunction.call(this, {
		context: obj
		, expression: path
	})
}


function isOrContains(target, possible) {
	if(typeof possible == 'array') {
		possible.includes(target)
	}
	else {
		return target == possible
	}
}

function escForRegex(val) {
	if(val && val.replace) {
		return val.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
	}
	else {
		return val;
	}
}

function escapeAttributeValue(attr) {
	if(attr === null || attr === undefined) {
		attr = ''
	}
	if(typeof attr !== 'string') {
		attr = '' + attr
	}
	for(let [key, value] of Object.entries(attributeEscapes)) {
		attr = attr.split(key).join(value)
	}
	return attr
}


module.exports = {
	evalFunction
	, attributeEscapes
	, fetchValue
	, isOrContains
	, escForRegex
	, escapeAttributeValue
}
