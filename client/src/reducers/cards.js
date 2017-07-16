import { type } from '../actions/cards'

const cards = (state = {
  isFetching: true,
  items: []
}, action) => {
  switch (action.type) {
    case `STOP_EDIT_${type}`:
    console.log('hitting stop')
      return {
        ...state,
        items: state.items.map(item => item._id === action._id ?
          { ...item, editing: false } :
          item
        )
      }
    case `REQUEST_${type}S`:
      return {
        ...state,
        isFetching: true
      }
    case `RECEIVE_${type}S`:
      return {
        ...state,
        isFetching: false,
        items: action.items
      }
    case `ADD_${type}`:
      return {
        ...state,
        isFetching: false,
        items: [
          ...state.items,
          action.item
        ]
      }
    case `UPDATE_${type}`:
      return {
        ...state,
        items: state.items.map(item => item._id === action.item._id ?
          { ...item, ...action.item } :
          item
        )
      }
    case `DELETE_${type}`:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action._id)
      }
    case `DELETE_${type}S`:
      return {
        ...state,
        items: state.items.filter(item => action.items.indexOf(item._id) === -1)
      }
    case `ERROR_${type}`:
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}

export default cards
