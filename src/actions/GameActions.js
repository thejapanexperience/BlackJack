import AppDispatcher from '../AppDispatcher';

const GameActions = {
  
  create(deck) {
    AppDispatcher.dispatch({
      type: 'DECK_CREATE',
      payload: { deck }
    })
  },


  stick(deck) {
    AppDispatcher.dispatch({
      type: 'STICK',
      payload: { deck }
    })
  },

  reset(deck) {
    AppDispatcher.dispatch({
      type: 'RESET',
      payload: { deck }
    })
  },

  acesEleven(deck) {
    AppDispatcher.dispatch({
      type: 'ACES_ELEVEN',
      payload: { deck }
    })
  },

  dealerDeal(deck) {
    AppDispatcher.dispatch({
      type: 'DEALER_DEAL',
      payload: { deck }
    })
  },

  playerDeal(deck) {
    AppDispatcher.dispatch({
      type: 'PLAYER_DEAL',
      payload: { deck }
    })
  },

  playersScore(score) {
    AppDispatcher.dispatch({
      type: 'PLAYER_SCORE',
      payload: { score }
    })
    console.log('GameActions playersScore', score)
  }

}

export default GameActions;
