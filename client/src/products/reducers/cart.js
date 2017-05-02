export const searchCart = (state = '', action) => {
  switch (action.type) {
    case 'SEARCH_CARTS':
      return action.searchCartsText
    default:
      return state
  }
}


export const cart = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return action.cart
    case 'FETCH_CART':
      return action.cart
    case 'UPDATE_CART':
      return action.cart
    case 'DELETE_CART':
      return { }
    case 'ERROR':
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}
