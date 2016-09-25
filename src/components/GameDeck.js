import React, { Component } from 'react';
import _ from 'lodash';
import GameActions from '../actions/GameActions';
import DeckStore from '../stores/DeckStore';

export default class GameDeck extends Component {

  constructor(props) {
    super(props);
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

  render () {
    let { deck } = this.state;
    return (
        <div></div>
      )
  }
 }

