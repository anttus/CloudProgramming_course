

var request = require('request')

var bookList = []

function validateBookId (bookId) {
  if (bookId.length != 12) {
    throw ('bookId should be 12 character long')
  }
  if (bookList.indexOf(bookId) != -1) {
    throw ('book has already been added to the list')
  }
  else return true
}

/* The standard pattern for asynchronous callbacks is for the first parameter to be the error, this should be null if no error is thrown with the second parameter being the data. */
exports.search = (query, callback) => {
  if (typeof query !== 'string' || query.length === 0) {
    callback(new Error('missing query parameter'))
  }
  const url = 'https://www.googleapis.com/books/v1/volumes'
  const query_string = {q: query, maxResults: 3, fields: 'items(id,volumeInfo(title,authors))'}
  request.get({url: url, qs: query_string}, (err, res, body) => {
    if (err) {
      callback(new Error('error making google books request'))
    }
    const json = JSON.parse(body)
    const items = json.items
    console.log(items)
    if (items === undefined) {
      //console.log('found undefined property')
      callback(new Error('no books found matching search'))
      return
    }
    const books = items.map( element => {
      return {id:element.id, title:element.volumeInfo.title, authors:element.volumeInfo.authors}
    })
    /* the first callback parameter is the error, which in this case will be null, the second parameter is the data returned. */
    callback(null, books)
  })
}

/* a synchronous function will either return data or throw an error */
exports.add = bookId => {
  if (validateBookId(bookId))
  bookList.push(bookId)
  //console.log(bookList.length)
  return 'book '+bookId+' added'
}

exports.remove = bookId => {
  if (bookList.indexOf(bookId) != -1) bookList.splice(bookList.indexOf(bookId), 1);
  else throw new Error('no books found matching search');
}

exports.describe = (query, callback) => {
  if (typeof query !== 'string' || query.length === 0) {
    callback(new Error('missing query parameter'))
  }
  const url = 'https://www.googleapis.com/books/v1/volumes'
  const query_string = { q: query, maxResults: 3, fields: 'items(volumeInfo(description))' }
  request.get({ url: url, qs: query_string }, (err, res, body) => {
    if (err) {
      callback(new Error('error making google books request'))
    }
    const json = JSON.parse(body)
    const items = json.items
    console.log(body)
    if (items === undefined) {
      //console.log('found undefined property')
      callback(new Error('no books found matching search'))
      return
    }
    const books = items.map(element => {
      console.log(element)
      return { description: element.volumeInfo.description }
    })
    /* the first callback parameter is the error, which in this case will be null, the second parameter is the data returned. */
    callback(null, books)
  })
}

exports.bookCount = () => {
  return bookList.length
}