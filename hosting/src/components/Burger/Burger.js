import React from 'react'
import PropTypes from 'prop-types'
import Ingredient from '../Ingredient'
import classes from './Burger.module.css'

const Burger = ({ ingredients }) => {
  const transformedIngredients = Object.keys(ingredients)
    .map(key =>
      [...Array(ingredients[key])].map((_, i) => (
        <Ingredient key={`${key}-${i}`} type={key} />
      ))
    )
    .reduce((arr, el) => {
      return arr.concat(el)
    }, [])

  if (transformedIngredients.length === 0) {
    transformedIngredients.push(<p key='add-0'>Please start adding ingredients!</p>)
  }

  // console.log('TRANSfORMED', transformedIngredients)

  return (
    <div className={classes.Burger}>
      <Ingredient type='bread-top' />
      {transformedIngredients}
      <Ingredient type='bread-bottom' />
    </div>
  )
}

Burger.propTypes = {
  ingredients: PropTypes.shape({

  }).isRequired
}

export default Burger
