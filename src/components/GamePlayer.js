import React, { Component } from 'react';
import _ from 'lodash';
import GameActions from '../actions/GameActions';
import DeckStore from '../stores/DeckStore';

export default class GameDealer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      deck: DeckStore.getAll(),
      dealersCards: DeckStore.getDealer(),
      playersCards: DeckStore.getPlayer(),
      scores: DeckStore.scoreTable(),
      playersScore: DeckStore.getPlayersScore(),
      aces: DeckStore.getAces()
      }
    console.log('GameDeck constructor deck: ',this.state.deck)

    this._onChange = this._onChange.bind(this);
    this._acesEleven = this._acesEleven.bind(this);
    this._twist = this._twist.bind(this);
    this._stick = this._stick.bind(this);

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
        playersScore: DeckStore.getPlayersScore(),
        dealersScore: DeckStore.getDealersScore(),
        playersCards: DeckStore.getPlayer(),
        dealerCards: DeckStore.getDealer(),
        aces: DeckStore.getAces()
    })
    }

    _acesEleven () {
    GameActions.acesEleven();
    }

    _twist () {
    let { deck } = this.state;
    console.log('twist this.state.deck', deck)
    GameActions.playerDeal(deck);
    }

    _stick () {
    let { deck } = this.state
    GameActions.stick(deck)
    }



  render () {
    let { deck, dealersCards, playersCards, playersScore, scores, aces } = this.state;
    console.log('GamePlayer aces = ',aces, 'GamePlayer PlayersScore = ', playersScore)


    if (aces === true){
      return (
        <div className="container btn-group">
        <button className="btn btn-danger" onClick={this._stick} >Stick?</button>
        <button className="btn btn-primary" onClick={this._twist} >Twist?</button>
        <button className="btn btn-info">1st Ace is 1</button>
        <button className="btn btn-warning" onClick={this._acesEleven} >1st Ace is 11</button>
      </div>
        )} else {
      return (
        <div className="container btn-group">
        <button className="btn btn-danger" onClick={this._stick} >Stick?</button>
        <button className="btn btn-primary" onClick={this._twist} >Twist?</button>
      </div>
        )
    }} 
    }
  
 

