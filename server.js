'use strict'

const http = require('http')
const Presenter = require('yayson')().Presenter

class ItemsPresenter extends Presenter {

  constructor() {
    super();
    this.type = 'items'
  }

  attributes(props) {
    let attrs = super.attributes(props)
    attrs.start = Date.now()
    return attrs
  }  

  relationships() {
    return {
      event: EventsPresenter
    }  
  }

}

class EventsPresenter extends Presenter {

  constructor() {
    super();
    this.type = 'events'
  }

  attributes(props) {
    let attrs = super.attributes(props)
    attrs.ok = 'yes'
    return attrs
  } 

  relationships() {
    return {
      item: ItemsPresenter
    } 
  } 

}

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Types': 'application/json'
  })

  let item = {
    id: 1,
    name: "item1",
    event: null
  }
  let event = {
    id: 2,
    name: 'event21',
    item: item
  }
  item.event = event

  const json = ItemsPresenter.toJSON(item)
  console.log(json)
  res.write(JSON.stringify(json))
  res.end()
})

server.listen(3000, () => {
  console.log('Server listen on 3000')
})