import React, { Component } from 'react';
import _ from 'lodash';
import GameActions from '../actions/GameActions';
import DeckStore from '../stores/DeckStore';

export default class WinOrLose extends Component {

  constructor(props) {
    super(props);
    this.state = {
      deck: DeckStore.getAll(),
      dealersCards: DeckStore.getDealer(),
      playersCards: DeckStore.getPlayer(),
      scores: DeckStore.scoreTable(),
      playersScore: DeckStore.getPlayersScore(),
      dealersScore: DeckStore.getDealersScore(),
      dealersScore: DeckStore.getDealersScore(),
      stick: DeckStore.getStick(),
      aces: DeckStore.getAces()
      }
    console.log('GameDeck constructor deck: ',this.state.deck)

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
        deck: DeckStore.getAll(),
        playersScore: DeckStore.getPlayersScore(),
        dealersScore: DeckStore.getDealersScore(),
        stick: DeckStore.getStick()
    })
    }


  render () {
    let {playersScore, dealersScore, stick } = this.state;


    if (playersScore > 21){
    return (
      <div className="text-center">
        <h1 id="message" >You Lose!</h1>
      </div>
      )} else if (playersScore < 21 && playersScore < dealersScore && dealersScore < 22 && stick === true) {
      return (
         <div className="text-center">
        <h1 id="message">You Lose (;﹏;)</h1>
      </div>
      )}else if (playersScore === dealersScore && stick === true) {
      return (
         <div className="text-center">
        <h1 id="message">You Lose (;﹏;)</h1>
      </div>
      )} else if (playersScore < 22 && dealersScore >21) {
        return (
          <div className="text-center">
          <h1 id="message">You Win ｡^‿^｡</h1>
          </div>
        )} else {
        return (
          <div className="text-center">
          <h1 id="message">How Exciting (★^O^★)</h1>
          </div>
          )}
      }
 
  }
  
 

