import React from 'react'
import PropTypes from 'prop-types'
import classes from './Ingredient.module.css'

const Ingredient = ({ type }) => {
  let ingredient = null
  switch (type) {
    case ('bread-bottom'):
      ingredient = <div className={classes.BreadBottom} />
      break
    case ('bread-top'):
      ingredient = (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1} />
          <div className={classes.Seeds2} />
        </div>
      )
      break
    case ('beef_qtrlb'):
      ingredient = <div className={classes.Meat} />
      break
    case ('cheese_american'):
      ingredient = <div className={classes.Cheese} />
      break
    case ('bacon_american'):
      ingredient = <div className={classes.Bacon} />
      break
    case ('lettuce_romaine'):
      ingredient = <div className={classes.Salad} />
      break
    case ('pickle_dill'):
      ingredient = <div className={classes.Pickle} />
      break
    case ('pastrami_beef'):
      ingredient = <div className={classes.Pastrami} />
      break
    default:
      ingredient = null
  }

  return ingredient
}

Ingredient.propTypes = {
  type: PropTypes.string.isRequired
}

export default Ingredient
