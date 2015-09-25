'use strict'

const http = require('http')
const JSONAPISerializer = require('jsonapi-serializer');

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Types': 'application/json'
  })

  var data = [{
    id: 1,
    firstName: 'Sandro',
    lastName: 'Munda',
    books: {
      _id: 21,
      title: 'test', 
      isbn: 'isbn'
    }
  }];

  var users = new JSONAPISerializer('users', data, {
    topLevelLinks: { self: 'http://localhost:3000/api/users' },
    attributes: ['firstName', 'lastName', 'books'],
    books: {
      ref: '_id',
      attributes: ['title', 'isbn'],
      relationshipLinks: {
        "self": "http://example.com/relationships/books",
        "related": "http://example.com/books"
      },
      includedLinks: {
        self: function (dataSet, book) {
          return 'http://example.com/books/' + book.id;
        }
      }
    }
  });

  res.write(JSON.stringify(users))
  res.end()
})

server.listen(3000, () => {
  console.log('Server listen on 3000')
})