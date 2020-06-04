import React from 'react'
import { v1 as uuid } from 'uuid'
import { compose } from 'recompose'
import { withFirebase } from 'src/services/Firebase'
import { withErrorHandler } from 'src/services/Error'
import BuildControls from '../BuildControls'
import Burger from '../Burger'
import Modal from '../Modal'
import Spinner from '../Spinner'
import { Summary as OrderSummary } from '../Order'

const BASE_PRICE = 4

class Builder extends React.Component {
  state = {
    order: {
      selections: {},
      totalPrice: 0
    },
    ingredients: [],
    orderInvalid: false,
    orderInProcess: false,
    submissionError: false,
    submissionSending: false
  }


  validateOrderState = (order) => {
    const total = Object.keys(order.selections)
      .map(key => order.selections[key])
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
    this.setState({
      submissionError: false,
      submissionSending: true
    })

    const data = {
      orderRefId: uuid(),
      customer: {
        phone: '5554443210',
        email: 'billy@example.com',
        name: 'Billy Mays'
      },
      deliveryPreference: 'fastest',
      order: this.state.order.selections,
      totalPrice: this.state.order.totalPrice,
      createdAt: this.props.firebase.fieldValue.serverTimestamp(),
    }

    console.log('[ORDER] begin order submit', data)
    this.props.firebase.orders()
    .add(data)
    .then(docRef => {
      console.log('[ORDER] order submit complete', { orderId: docRef.id })
      this.setState({
        orderInProcess: false,
        submissionSending: false
      })
    })
    .catch(error => {
      console.error('[ORDER] order submit failed', error)
      this.setState({
        submissionError: true,
        submissionSending: false
      })
    })
  }

  handleMoreIngredientPress = (ing) => {
    // selections may not have an entry for each ingredient
    const oldCount = this.state.order.selections[ing] || 0
    const oldPrice = this.state.order.totalPrice
    const ingredient = this.state.ingredients.find(it => it.name === ing)
    // TODO: what happens if the ingredient is not found?

    const newPrice = oldPrice + ingredient.price
    const updatedCount = oldCount + 1
    const updatedOrder = {
      ...this.state.order
    }
    updatedOrder.selections[ing] = updatedCount
    updatedOrder.totalPrice = newPrice

    this.setState({ order: updatedOrder })
    this.validateOrderState(updatedOrder)
  }

  handleLessIngredientPress = (ing) => {
    // selections may not have an entry for each ingredient
    const oldCount = this.state.order.selections[ing] || 0
    const oldPrice = this.state.order.totalPrice
    const ingredient = this.state.ingredients.find(it => it.name === ing)
    // TODO: what happens if the ingredient is not found?

    if (oldCount <= 0) {
      return
    }

    const newPrice = oldPrice - ingredient.price
    const updatedCount = oldCount - 1
    const updatedOrder = {
      ...this.state.order
    }
    updatedOrder.selections[ing] = updatedCount
    updatedOrder.totalPrice = newPrice

    this.setState({ order: updatedOrder })
    this.validateOrderState(updatedOrder)
  }

  componentDidMount () {
    if (this.state.ingredients.length === 0) {
      console.log('[BUILDER] ingredients list empty, begin fetch ingredients')
      this.props.firebase.ingredients()
      .where('status', '==', 'ACTIVE')
      .get()
      .then((snapshot) => {
        console.log('[BUILDER] ingredients list fetched, load builder')
        const ingredients = []
        snapshot.forEach(doc => {
          ingredients.push(doc.data())
        })

        this.setState({ ingredients })
        return ingredients
      })
      .then((ingredients) => {
        const defaults = ingredients.filter(it => it.qtyDef > 0)
        const selections = defaults.reduce((obj, it) =>
          ({ ...obj, [it.name]: it.qtyDef }), {})
        const totalPrice = defaults.reduce((sum, it) =>
          sum + (it.qtyDef * it.price), BASE_PRICE)

        this.setState({
          order: {
            selections,
            totalPrice
          }
        })
      })
      .catch((error) => {
        console.error('[BUILDER] error when fetching ingredients', error)
      })
    }
  }

  render () {
    const quantities = this.state.ingredients.reduce(
      (acc, it) => ({ ...acc, [it.name]: it }), {})
    const lessDisabledInfo = {}
    const moreDisabledInfo = {}
    for (const key in quantities) {
      const qtyIng = this.state.order.selections[key] || 0
      lessDisabledInfo[key] = qtyIng <= quantities[key].qtyMin
      moreDisabledInfo[key] = qtyIng >= quantities[key].qtyMax
    }

    return (
      <>
        <Modal
          show={this.state.orderInProcess}
          onBackdropClick={this.handleCancelOrder}
        >
          {this.state.submissionSending ? (
            <Spinner />
          ) : (
            <OrderSummary
              onCancelOrder={this.handleCancelOrder}
              onContinueOrder={this.handleContinueOrder}
              selections={this.state.order.selections}
              totalPrice={this.state.order.totalPrice}
              ingredients={this.state.ingredients}
            />
          )}
        </Modal>
        <Burger selections={this.state.order.selections} />
        <BuildControls
          onLessIngredientClick={this.handleLessIngredientPress}
          onMoreIngredientClick={this.handleMoreIngredientPress}
          onOrderButtonClick={this.handleProcessOrder}
          lessDisabledInfo={lessDisabledInfo}
          moreDisabledInfo={moreDisabledInfo}
          orderIsInvalid={this.state.orderInvalid}
          totalPrice={this.state.order.totalPrice}
          ingredients={this.state.ingredients}
        />
      </>
    )
  }
}

const enhance = compose(
  withErrorHandler,
  withFirebase
)

export default enhance(Builder)
