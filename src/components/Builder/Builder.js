import React from 'react'
import BuildControls from '../BuildControls'
import Burger from '../Burger'

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class Builder extends React.Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4
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
  }

  render () {
    const disabledInfo = { ...this.state.ingredients }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    return (
      <>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          disabled={disabledInfo}
          addIngredient={this.handleAddIngredient}
          removeIngredient={this.handleRemoveIngredient}
          price={this.state.totalPrice}
        />
      </>
    )
  }
}

export default Builder
