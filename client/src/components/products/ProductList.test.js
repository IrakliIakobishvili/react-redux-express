import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'
import uuidV1 from 'uuid/v1'

import ProductList from './ProductList'
import Product from './Product'

describe('ProductList', () => {
  it('should exist', () => {
    expect(ProductList).toExist()
  })
  it('should render one Product component for each todo item', () => {
    const products = [
      { uuid: uuidV1(), name: 'Play with Westie', description: 'A priceless offering', price: 30000 },
      { uuid: uuidV1(), name: 'Walk Pepper', description: 'An enjoyable stroll with the bear', price: 2000 },
      { uuid: uuidV1(), name: 'Eat dinner', description: 'A nice break from the day', price: 1000 },
    ]
    const productList = TestUtils.renderIntoDocument(<ProductList products={products} />)
    const productsComponents = TestUtils.scryRenderedComponentsWithType(productList, Product)
    expect(productsComponents.length).toBe(products.length)
  })
})
