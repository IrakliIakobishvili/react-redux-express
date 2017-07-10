import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import renderHTML from 'react-render-html'

import CardItemContainer from '../../containers/cards/CardItemContainer'
import ProductItemContainer from '../../containers/products/ProductItemContainer'
import SlideList from '../slides/SlideList'

class SectionItem extends Component {
  state = {
    image: null,
    loading: false
  }
  componentDidMount() {
    const { image } = this.props.item
    if (image) {
      this.setState({ loading: true })
      const img = new Image()
      const src = image.src
      img.src = src
      img.onload = () => this.setState({ image: src, loading: false })
    }
  }
  renderComponents = (components) => {
    const componentList = (component) => {
      const { type, componentId } = component
      switch(type) {
        case 'Card':
          return <CardItemContainer key={component._id} componentId={componentId}  />
        case 'Product':
          return <ProductItemContainer key={component._id} componentId={componentId} />
        default:
          return
      }
    }
    return components.map(component => componentList(component))
  }
  renderContents = (section) => {
    const slides = section.components.filter(value => value.type === 'Slide')
    const values = section.values || {}
    const text = values.text || null
    const height = values.height || null
    const backgroundColor = values.backgroundColor || null
    const margin = values.margin || null
    const padding = values.padding || null
    const backgrounds = section.image ? {
      backgroundImage: `url(${section.image.src})`,
      backgroundAttachment: values.backgroundAttachment,
      transition: 'opacity .9s ease-in-out',
      backgroundPosition: 'center center',
      backgroundRepeat:  'no-repeat',
      backgroundSize:  'cover',
      zIndex: -1
    } : null
    return (
      <div style={{
        height,
        ...backgrounds,
        backgroundColor,
        overflow: 'hidden',
      }}>
        <section style={{ margin, padding }}>
          {text && <div className="cards">{renderHTML(text)}</div>}
        </section>
        <div>
          {this.renderComponents(section.components)}
        </div>
        { slides.length ? <SlideList slides={slides} /> : null }
      </div>
    )
  }
  render() {
    const { image, loading } = this.state
    const { section } = this.props
    return (
      !loading && image ?
      <CSSTransitionGroup
        transitionName="image"
        transitionAppear={true}
        transitionAppearTimeout={900}
        transitionEnter={false}
        transitionLeave={false}
      >
        {this.renderContents(section)}
      </CSSTransitionGroup>
      :
      <div>
        {this.renderContents(section)}
      </div>
    )
  }
}

export default SectionItem