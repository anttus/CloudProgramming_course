'use strict'
/*istanbul ignore next*/
/* global expect */

var list = require("../modules/shopping")

describe('Shopping List', function () {

	/* this code is run before each of the tests */
	beforeEach(() => {
		list.add('bread')
		list.add('bread')
		list.add('butter')
	})

	/* this code is fun after EACH test */
	afterEach(() => {
		list.clear()
	})

	it('should add a new item', () => {
		list.add('cheese')
		expect(list.count()).toBe(3)
	})

	it('should increment the qty if item exists', () => {
		list.add('bread')
		expect(list.count()).toBe(2)
	})

  it('should return an array containing all items in order of entry', () => {
    const items = list.getAll()
    expect(items[0].title).toBe('bread')
    expect(items[0].qty).toBe(2)
    expect(items[1].title).toBe('butter')
    expect(items[1].qty).toBe(1)
  })

  /* by placing an 'x' in front of the function name we set its status to 'pending' which means the test won't run. In this way we can write lots of tests but focus on passing one test at a time. */
	it('should be able to return a shopping item', () => {
		expect(list.getItem('bread').title).toBe('bread')
		expect(list.getItem('bread').qty).toBe(2)
	})

	it('should throw an error if item not in list', () => {
		try {
			let jam = list.getItem('jam')
			expect(true).toBe(false) // we want to fail test if this line is run.
		} catch(err) {
			expect(err.message).toBe('item not in list')
		}
	})

	it('should delete first item', () => {
		list.removeItem('bread')
		expect(list.count()).toBe(1)
		const items = list.getAll()
		expect(items[0].title).toBe('butter')
	})

	it('should delete last item', () => {
		list.removeItem('butter')
		expect(list.count()).toBe(1)
		const items = list.getAll()
		expect(items[0].title).toBe('bread')
	})

	it('should throw error if item not in list', () => {
		try {
			list.removeItem('jam')
			expect(true).toBe(false)
		} catch(err) {
			expect(err.message).toBe('item not in list')
		}
	})

	it('should decrement two cheese from the list', () => {
		try {
			list.add('cheese')
			list.add('cheese')
			list.add('cheese')
			list.decrement('cheese', 2)
			expect(list.getItem('cheese').qty).toBe(1)
		} catch(err) {
			expect(err.message).toBe('item not in list')
		}
	})

	it('should throw error because item is not in list', () => {
		try {
			list.decrement('cheese', 1)
		} catch(err) {
			expect(err.message).toBe('item not in list')
		}
	})

	it('should throw an error for not using two arguments', () => {
		try {
			list.add('cheese')
			list.decrement('cheese')
		} catch(err) {
			expect(err.message).toBe('function requires two parameters')
		}
	})

	it('should throw error because the second argument is not a number', () => {
		try {
			list.add('cheese')
			list.decrement('cheese', 'one')
		} catch (err) {
			expect(err.message).toBe('second parameter should be a number')
		}
	})

	it('should delete the item if the decrement value is larger than qty of the item', () => {
		try {
			list.add('cheese')
			list.decrement('cheese', 2)
		} catch (err) {
			expect(err.message).toBe('item not found')
		}
	})

})
