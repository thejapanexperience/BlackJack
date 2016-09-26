import AppDispatcher from '../AppDispatcher';
import { EventEmitter } from 'events';
import _ from 'lodash';
import Storage from '../Storage';

let _start = false
let _deck = [];
let _stick = false;
let _deal = false;
let _gameOver = false;
let _dealer = [];
let _dealerImages = [];
let _playerImages = [];
let _player = [];
let _playersScore = 0;
let _dealersScore = 0;
let _aces = false
let _11 = false
let _dealerAces = false
let _scores = {
  "2S":2,
  "3S":3, 
  "4S":4, 
  "5S":5, 
  "6S":6, 
  "7S":7, 
  "8S":8, 
  "9S":9, 
  "10S":10, 
  "JS":10, 
  "QS":10, 
  "KS":10, 
  "AS":1, 
  "2C":2, 
  "3C":3, 
  "4C":4, 
  "5C":5, 
  "6C":6, 
  "7C":7, 
  "8C":8, 
  "9C":9, 
  "10C":10, 
  "JC":10, 
  "QC":10, 
  "KC":10, 
  "AC":1, 
  "2H":2, 
  "3H":3, 
  "4H":4, 
  "5H":5, 
  "6H":6, 
  "7H":7, 
  "8H":8, 
  "9H":9, 
  "10H":10, 
  "JH":10, 
  "QH":10, 
  "KH":10, 
  "AH":1, 
  "2D":2, 
  "3D":3, 
  "4D":4, 
  "5D":5, 
  "6D":6, 
  "7D":7, 
  "8D":8, 
  "9D":9, 
  "10D":10, 
  "JD":10, 
  "QD":10, 
  "KD":10, 
  "AD":1
}

let _images = {
  "2S":"./src/images/2_of_spades.png",
  "3S":"./src/images/3_of_spades.png", 
  "4S":"./src/images/4_of_spades.png", 
  "5S":"./src/images/5_of_spades.png", 
  "6S":"./src/images/6_of_spades.png", 
  "7S":"./src/images/7_of_spades.png", 
  "8S":"./src/images/8_of_spades.png", 
  "9S":"./src/images/9_of_spades.png", 
  "10S":"./src/images/10_of_spades.png", 
  "JS":"./src/images/jack_of_spades.png", 
  "QS":"./src/images/queen_of_spades.png", 
  "KS":"./src/images/king_of_spades.png", 
  "AS":"./src/images/ace_of_spades.png",

  "2C":"./src/images/2_of_clubs.png" , 
  "3C":"./src/images/3_of_clubs.png", 
  "4C":"./src/images/4_of_clubs.png", 
  "5C":"./src/images/5_of_clubs.png", 
  "6C":"./src/images/6_of_clubs.png", 
  "7C":"./src/images/7_of_clubs.png", 
  "8C":"./src/images/8_of_clubs.png", 
  "9C":"./src/images/9_of_clubs.png", 
  "10C":"./src/images/10_of_clubs.png", 
  "JC":"./src/images/jack_of_clubs.png", 
  "QC":"./src/images/queen_of_clubs.png", 
  "KC":"./src/images/king_of_clubs.png", 
  "AC":"./src/images/ace_of_clubs.png",

  "2H":"./src/images/2_of_hearts.png", 
  "3H":"./src/images/3_of_hearts.png", 
  "4H":"./src/images/4_of_hearts.png", 
  "5H":"./src/images/5_of_hearts.png", 
  "6H":"./src/images/6_of_hearts.png", 
  "7H":"./src/images/7_of_hearts.png", 
  "8H":"./src/images/8_of_hearts.png", 
  "9H":"./src/images/9_of_hearts.png", 
  "10H":"./src/images/10_of_hearts.png", 
  "JH":"./src/images/jack_of_hearts.png", 
  "QH":"./src/images/queen_of_hearts.png", 
  "KH":"./src/images/king_of_hearts.png", 
  "AH":"./src/images/ace_of_hearts.png",

  "2D":"./src/images/2_of_diamonds.png", 
  "3D":"./src/images/3_of_diamonds.png", 
  "4D":"./src/images/4_of_diamonds.png", 
  "5D":"./src/images/5_of_diamonds.png", 
  "6D":"./src/images/6_of_diamonds.png", 
  "7D":"./src/images/7_of_diamonds.png", 
  "8D":"./src/images/8_of_diamonds.png", 
  "9D":"./src/images/9_of_diamonds.png", 
  "10D":"./src/images/10_of_diamonds.png", 
  "JD":"./src/images/jack_of_diamonds.png", 
  "QD":"./src/images/queen_of_hearts.png" , 
  "KD":"./src/images/king_of_diamonds.png", 
  "AD":"./src/images/ace_of_diamonds.png"
}

class DeckStore extends EventEmitter {

  constructor() {
    super();
    AppDispatcher.register(action => {

      let { deck } = action.payload;

      switch(action.type) {
        
        case 'RESET':
        _deck = [];
        _start = false
        _stick = false;
        _deal = false;
        _gameOver = false;
        _dealer = [];
        _dealerImages = [];
        _playerImages = [];
        _player = [];
        _playersScore = 0;
        _dealersScore = 0;
        _aces = false;
        _11 = false
        _dealerAces = false
        this.emit('CHANGE');
        break;

        case 'ACES_ELEVEN':
        _playersScore = _playersScore + 10;
        _11 = true;
        this.emit('CHANGE');
        break;

        case 'DECK_CREATE':
        _deck = [...deck];
        _start = true;
        this.emit('CHANGE');
        break;
        
        case 'STICK':
        var dealerAces = false
        for (var y = 0; y < _dealer.length; y++) {
        if (_scores[_dealer[y]] === 1) {
        dealerAces = true; break}}
        if (dealerAces === true && (_dealersScore + 10) < 22 && (_dealersScore + 10) > _playersScore) {
            _dealersScore = _dealersScore + 10
          }
        while (_dealersScore < _playersScore && _playersScore < 22) {
        var temp = _deck.splice(0,1);
        _dealer.push(temp)
        let numD = 0;
        for (var i = 0; i < _dealer.length; i++) {
        numD = _scores[_dealer[i]] + numD
        }
        _dealersScore = numD;}
        _stick = true;
        var dealerImages = []
        for (var l = 0; l < _dealer.length; l++) {
        dealerImages.push(_images[_dealer[l]])}
        console.log(dealerImages)
        _dealerImages = dealerImages
        _gameOver = true
        console.log(_gameOver, _stick)
        this.emit('CHANGE')
        break;

        case 'DEALER_DEAL':
        var temp = _deck.splice(0,1);
        _dealer.push(temp)
        let numD = 0;
        for (var k = 0; k < _dealer.length; k++) {
        numD = _scores[_dealer[k]] + numD
        }
        _dealersScore = numD;
        console.log('dealers Score', _dealersScore);
        var dealerImages = []
        for (var l = 0; l < _dealer.length; l++) {
        dealerImages.push(_images[_dealer[l]])}
        console.log(dealerImages)
        _dealerImages = dealerImages
        _deal = true;
        if (_playersScore < 22 && _dealersScore >21){
          _gameOver = true
        }
        this.emit('CHANGE')
        break;

        case 'PLAYER_DEAL':
        var temp = _deck.splice(0,1);
        _player.push(temp)
        console.log('DeckStore _player', _player)
        var aces = false
        for (var x = 0; x < _player.length; x++) {
        if (_scores[_player[x]] === 1) {
        aces = true; break}}
        if (aces === true) {
          _aces = true;}
        
        let num = 0
        if (_11 === true) {
           num += 10
        }
        for (var i = 0; i < _player.length; i++) {
        num = _scores[_player[i]] + num
        console.log(_scores[_player[i]])
        }
        console.log(num)
        _playersScore = num;
        var playerImages = []
        for (var j = 0; j < _player.length; j++) {
        playerImages.push(_images[_player[j]])}
        console.log(playerImages)
        _playerImages = playerImages
        if (_playersScore < 22 && _dealersScore >21){
          _gameOver = true
        } else if (_playersScore > 21) {
          _gameOver = true
        }
        this.emit('CHANGE')
        break;       
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
    return _deck;
  }

  getAces() {
    return _aces
  }

  getStick() {
    return _stick
  }

  getStart() {
    return _start
  }

  getDeal() {
    return _deal
  }

  getGameOver() {
    return _gameOver
  }

   getDealer() {
    return _dealer;
  }

   getPlayer() {
    return _player;
  }

  getPlayersScore() {
    return _playersScore;
  }

  getDealersScore() {
    return _dealersScore;
  }

  scoreTable() {
    return _scores;
  }

  getPlayersImages() {
    return _playerImages
  }

  getDealersImages() {
    return _dealerImages
  }
}

export default new DeckStore();