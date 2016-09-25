import React, { Component } from 'react';
import _ from 'lodash';
import GameActions from '../actions/GameActions';
import DeckStore from '../stores/DeckStore';
import GamePlayer from './GamePlayer'

export default class GameDealer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      deck: DeckStore.getAll(),
      dealersCards: DeckStore.getDealer(),
      playersCards: DeckStore.getPlayer(),
      playersScore: DeckStore.getPlayersScore(),
      dealersScore: DeckStore.getDealersScore()
    }

    this._onChange = this._onChange.bind(this);
    this._initialDeal = this._initialDeal.bind(this);

    }
    componentWillMount() {
      DeckStore.startListening(this._onChange)
    }
  
    componentWillUnmount() {
      DeckStore.stopListening(this._onChange)
    }
  
    _onChange() {
      this.setState ({
        deck: DeckStore.getAll(),
        dealersScore: DeckStore.getDealersScore(),
        playersScore: DeckStore.getPlayersScore()
    })
    }

    _initialDeal() {
      let { deck } = this.state
      for (var i = 0; i < 2; i++) {
      GameActions.dealerDeal(deck);
      } 
      for (var i = 0; i < 2; i++) {
      GameActions.playerDeal(deck);
      }
    }

  render () {
    let { deck } = this.state;
    let { dealersCards } = this.state;
    let { playersCards, playersScore, dealersScore } = this.state;

    console.log('dealers score ', dealersScore)

    return (
      <div className="container">
        <button className="btn btn-warning" id="dealButton" onClick={this._initialDeal}>Deal?</button> 
      </div>
      )} 
    }
  
 

