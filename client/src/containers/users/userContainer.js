import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { connect } from 'react-redux'


const userContainer = (ComposedComponent) => {
  class UserContainer extends Component {
    render() {
      const {
        dispatch,
        isFetching,
        primary1Color,
        user,
      } = this.props
      const props = {
        dispatch,
        primary1Color,
        user
      }
      return (
        isFetching ? null :  <ComposedComponent {...props} />
      )
    }
  }
  const mapStateToProps = ({
    brand,
    user
  }) => ({
    isFetching: brand.isFetching || user.isFetching ? true : false,
    primary1Color: brand.palette.values.primary1Color,
    user
  })
  UserContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    primary1Color: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired
  }
  return connect(mapStateToProps)(UserContainer)
}

export default userContainer
