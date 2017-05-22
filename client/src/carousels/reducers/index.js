import { type } from '../actions/index'

const carousels = (state = {
  isFetching: true,
  items: [{
    values: null
  }]
}, action) => {
  switch (action.type) {
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
      console.log(action.item._id)
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
    case `ERROR_${type}`:
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}

export default carousels