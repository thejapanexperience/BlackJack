import AppDispatcher from '../AppDispatcher';
import { EventEmitter } from 'events';
import _ from 'lodash';
import Storage from '../Storage';

let _dealer = [];

class DeckStore extends EventEmitter {

  constructor() {
    super();
    AppDispatcher.register(action => {

      let { deck } = action.payload;
      console.log('DeckStore deck',deck)
      
      switch(action.type) {
        
        case 'DEALER_DEAL':
        let dealersCards = deck.push
        _deck.shift();
        console.log('new _deck : ',_deck)
        this.emit('CHANGE')
        
        
        this.emit('CHANGE')
      }

    });

    this.on('CHANGE',() => {
      Storage.write('dealers hand', _dealer)
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

  getDealer() {
    return_dealer
  }

}

export default new DeckStore();