 import React, { Component } from 'react';
 import GameStart from './GameStart'
 import GameDealer from './GameDealer'
 import GamePlayer from './GamePlayer'
 import GameDeck from './GameDeck'
 import WinOrLose from './WinOrLose'
 import DeckStore from '../stores/DeckStore'
 import GameActions from '../actions/GameActions';



 export default class Layout extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      deck: DeckStore.getAll(),
      dealersScore: DeckStore.getDealersScore(),
      playersScore: DeckStore.getPlayersScore(),
      playersImages: DeckStore.getPlayersImages(),
      dealersImages: DeckStore.getDealersImages(),
      stick: DeckStore.getStick(),
      start: DeckStore.getStart(),
      deal: DeckStore.getDeal(),
      gameOver: DeckStore.getGameOver()
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
        deck: DeckStore.getAll(),
        dealersScore: DeckStore.getDealersScore(),
        playersScore: DeckStore.getPlayersScore(),
        playersImages: DeckStore.getPlayersImages(),
        dealersImages: DeckStore.getDealersImages(),
        stick: DeckStore.getStick(),
        start: DeckStore.getStart(),
        deal: DeckStore.getDeal(),
        gameOver: DeckStore.getGameOver()
    })
    }

    _reset() {
          GameActions.reset()
    }


  render() { 

    const { images, dealersImages, playersImages, stick, deal, start, gameOver } = this.state;

    if (start === false) {
      return (
        <div className="container">
        <br/>
        <div id="gameContainer" className="container">
        <h1 id="title" className="text-center">Black Jack</h1>
        <GameStart />
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        </div>
        </div>
      )
    } else if(gameOver === true){

    return (
      <div className="container">
      <br/>
      <div id="gameContainer" className="container">
        <h1 id="title" className="text-center">Black Jack</h1>
        <GameStart />
        <GameDealer />
        <div className="container">
        <table>
          <thead>
            <tr id="dealersHand">
              <th className="handTitles">Dealers Hand</th>
              <th id="dealer1"><img className="cards" src={dealersImages[0]} alt=""/></th>
              <th id="dealer2"><img className="cards" src={dealersImages[1]} alt=""/></th>
              <th id="dealer3"><img className="cards" src={dealersImages[2]} alt=""/></th>
              <th id="dealer4"><img className="cards" src={dealersImages[3]} alt=""/></th>
              <th id="dealer5"><img className="cards" src={dealersImages[4]} alt=""/></th>
              <th id="dealer6"><img className="cards" src={dealersImages[5]} alt=""/></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><br/> </td>
            </tr>
            <tr>
              <td className="handTitles">Players Hand</td>
              <td id="player1"><img className="cards" src={playersImages[0]} alt=""/></td>
              <td id="player2"><img className="cards" src={playersImages[1]} alt=""/></td>
              <td id="player3"><img className="cards" src={playersImages[2]} alt=""/></td>
              <td id="player4"><img className="cards" src={playersImages[3]} alt=""/></td>
              <td id="player5"><img className="cards" src={playersImages[4]} alt=""/></td>
              <td id="player6"><img className="cards" src={playersImages[5]} alt=""/></td>
            </tr>
          </tbody>
        </table>
        </div>
        <GameDeck />
        <GamePlayer />
        <WinOrLose />       
        <div>
          <hr/>
          <form onClick={this._reset} className="form-inline text-center">
          <button className="btn btn-primary">Replay?</button>
          </form>
          <br/>
          <br/>
          <br/>
          <br/>
      </div>
      </div>
      </div>
      )
    } else if (deal === false){
      return (
      <div className="container">
      <br/>
      <div id="gameContainer" className="container">
        <h1 id="title" className="text-center">Black Jack</h1>
        <GameStart />
        <GameDealer />
        <div className="container">
        <table>
          <thead>
            <tr id="dealersHand">
              <th className="handTitles">Dealers Hand</th>
              <th id="dealer1"><img className="cards" src={dealersImages[0]} alt=""/></th>
              <th id="dealer2"><img className="cards" src={dealersImages[1]} alt=""/></th>
              <th id="dealer3"><img className="cards" src={dealersImages[2]} alt=""/></th>
              <th id="dealer4"><img className="cards" src={dealersImages[3]} alt=""/></th>
              <th id="dealer5"><img className="cards" src={dealersImages[4]} alt=""/></th>
              <th id="dealer6"><img className="cards" src={dealersImages[5]} alt=""/></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> <br/></td>
            </tr>
            <tr>
              <td className="handTitles">Players Hand</td>
              <td id="player1"><img className="cards" src={playersImages[0]} alt=""/></td>
              <td id="player2"><img className="cards" src={playersImages[1]} alt=""/></td>
              <td id="player3"><img className="cards" src={playersImages[2]} alt=""/></td>
              <td id="player4"><img className="cards" src={playersImages[3]} alt=""/></td>
              <td id="player5"><img className="cards" src={playersImages[4]} alt=""/></td>
              <td id="player6"><img className="cards" src={playersImages[5]} alt=""/></td>
            </tr>
          </tbody>
        </table>
        </div>
        <GameDeck />
        <br/>
        <GamePlayer />
        <WinOrLose />
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      </div>
      </div>)
    } else {
      return (
      <div className="container">
      <br/>
      <div id="gameContainer" className="container">
        <h1 id="title" className="text-center">Black Jack</h1>
        <GameStart />
        <GameDealer />
        <div className="container">
        <table>
          <thead>
            <tr id="dealersHand">
              <th className="handTitles">Dealers Hand</th>
              <th id="dealer1"><img className="cards" src="./src/images/back.png" alt=""/></th>
              <th id="dealer2"><img className="cards" src={dealersImages[1]} alt=""/></th>
              <th id="dealer3"><img className="cards" src={dealersImages[2]} alt=""/></th>
              <th id="dealer4"><img className="cards" src={dealersImages[3]} alt=""/></th>
              <th id="dealer5"><img className="cards" src={dealersImages[4]} alt=""/></th>
              <th id="dealer6"><img className="cards" src={dealersImages[5]} alt=""/></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> <br/></td>
            </tr>
            <tr>
              <td className="handTitles">Players Hand</td>
              <td id="player1"><img className="cards" src={playersImages[0]} alt=""/></td>
              <td id="player2"><img className="cards" src={playersImages[1]} alt=""/></td>
              <td id="player3"><img className="cards" src={playersImages[2]} alt=""/></td>
              <td id="player4"><img className="cards" src={playersImages[3]} alt=""/></td>
              <td id="player5"><img className="cards" src={playersImages[4]} alt=""/></td>
              <td id="player6"><img className="cards" src={playersImages[5]} alt=""/></td>
            </tr>
          </tbody>
        </table>
        </div>
        <GameDeck />
        <br/>
        <GamePlayer />
        <WinOrLose />
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      </div>
      </div>)
    }
  }
 }





 