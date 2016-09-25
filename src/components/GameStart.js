 import React, { Component } from 'react';
 import uuid from 'uuid';
 import GameActions from '../actions/GameActions';
 import GameDeck from './GameDeck'
 import GameDealer from './GameDealer'
 import DeckStore from '../stores/DeckStore';

 export default class GameStart extends Component {

  constructor(props) {
    super(props);
    this._makeDeck = this._makeDeck.bind(this);
    this.state = {
      deck: DeckStore.getAll()
    }
    this._onChange = this._onChange.bind(this);

  }

  componentWillMount() {
    DeckStore.startListening(this._onChange)
  }

  componentWillUnmount() {
    DeckStore.stopListening(this._onChange)
  }

  _onChange() {
    this.setState ({
      deck: DeckStore.getAll()
    })
  }


  _makeDeck(e) {
    e.preventDefault();
    
    let suits = ['S', 'C', 'H', 'D'];
    let ranks = [2,3,4,5,6,7,8,9,10, 'J', 'Q', 'K', 'A']

    let deck = suits.map(suit => {
      return ranks.map(rank => {
        return rank + suit
      })
    })
  
    deck = _.flatten(deck);
    deck = _.shuffle(deck);
    
    GameActions.create(deck);
  }

  render () {

        const { deck } = this.state;


/*    let {deck} = this.state;
    console.log(deck)
*/
    return (
      <div>
      <form  onSubmit={this._makeDeck} className="form-inline text-center">
       <button className="btn btn-success">Start Game!</button>
       <hr/>

      </form>
      </div>
      )
  }
 }