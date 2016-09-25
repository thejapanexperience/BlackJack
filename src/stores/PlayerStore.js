import AppDispatcher from '../AppDispatcher';
import { EventEmitter } from 'events';
import _ from 'lodash';
import Storage from '../Storage';

let _deck = [""];

class DeckStore extends EventEmitter {

  constructor() {
    super();
    console.log('_deck: ', _deck)
    AppDispatcher.register(action => {

      let { deck } = action.payload;
      console.log('DeckStore deck',deck)
      
      switch(action.type) {
        
        case 'DECK_CREATE':
        _deck.push(deck);
        _deck.shift();
        console.log('new _deck : ',_deck)
        this.emit('CHANGE')
        
        
        this.emit('CHANGE')
      }

    });

    this.on('CHANGE',() => {
      Storage.write('deck', _deck)
    });

  } 

  startListening(cb) {
    this.on('CHANGE', cb);
  }

  stopListening(cb) {
    this.removeListener('CHANGE', cb)
  }

  getAll() {
    console.log('getAll _deck', _deck)
    return _deck;
  }
}

export default new DeckStore();