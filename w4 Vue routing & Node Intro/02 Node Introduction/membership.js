'use strict'
const readline = require('readline-sync')

const type = String(
	readline.question('membership type (basic, premium, gold): ')
).trim()
const years = Number(readline.question('years required: '))
let cost;

try {
	if (Number.isNaN(years) || years < 1) {
		throw 'invalid number of years requested'
	}
	switch (type) {
	case 'basic':
		cost = 10.0
		break
	case 'premium':
		cost = 15.0
		break
	case 'gold':
		cost = 20.0
		break
	default:
		throw 'invalid membership type'
	}
	cost *= years
	if (years > 1) {
		cost *= 0.8
	}
	console.log('membership cost is £' + cost)
} catch (err) {
	console.log(err)
}
