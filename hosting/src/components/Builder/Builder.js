import React from 'react'
import BuildControls from '../BuildControls'
import Burger from '../Burger'
import Modal from '../Modal'
import { Summary as OrderSummary } from '../Order'

const INGREDIENT_PRICES = {
  pickle: 0.05,
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
  pastrami: 1.5
}

class Builder extends React.Component {
  state = {
    ingredients: {
      pickle: 0,
      salad: 0,
      bacon: 0,
      pastrami: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    orderInvalid: true,
    orderInProcess: false
  }


  validateOrderState = (ingredients) => {
    const total = Object.keys(ingredients)
      .map(key => ingredients[key])
      .reduce((sum, it) => sum + it, 0)

    const orderInvalid = total < 1
    console.log('[ORDER] validate order', { orderInvalid })
    this.setState({ orderInvalid })
  }

  handleCancelOrder = () => {
    console.log('[ORDER] cancel order')
    this.setState({ orderInProcess: false })
  }

  handleProcessOrder = () => {
    console.log('[ORDER] begin order process')
    this.setState({ orderInProcess: true })
  }

  handleContinueOrder = () => {
    console.log('[ORDER] continue order', { ...this.state.ingredients })
    alert('You Continue!') // TODO
  }

  handleAddIngredient = (type) => {
    const oldCount = this.state.ingredients[type]
    const oldPrice = this.state.totalPrice

    const priceAddition = INGREDIENT_PRICES[type]
    const newPrice = oldPrice + priceAddition

    const updatedCount = oldCount + 1
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    })

    this.validateOrderState(updatedIngredients)
  }

  handleRemoveIngredient = (type) => {
    const oldCount = this.state.ingredients[type]
    const oldPrice = this.state.totalPrice

    if (oldCount <= 0) {
      return
    }

    const priceDeduction = INGREDIENT_PRICES[type]
    const newPrice = oldPrice - priceDeduction

    const updatedCount = oldCount - 1
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    })

    this.validateOrderState(updatedIngredients)
  }

  render () {
    const disabledInfo = { ...this.state.ingredients }
    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    return (
      <>
        <Modal
          show={this.state.orderInProcess}
          onCancelOrder={this.handleCancelOrder}
        >
          <OrderSummary
            totalPrice={this.state.totalPrice}
            ingredients={this.state.ingredients}
            onCancelOrder={this.handleCancelOrder}
            onContinueOrder={this.handleContinueOrder}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          onRemoveIngredientClick={this.handleRemoveIngredient}
          onAddIngredientClick={this.handleAddIngredient}
          onOrderButtonClick={this.handleProcessOrder}
          orderIsInvalid={this.state.orderInvalid}
          price={this.state.totalPrice}
          disabled={disabledInfo}
        />
      </>
    )
  }
}

export default Builder
