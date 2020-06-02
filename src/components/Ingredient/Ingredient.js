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
    case ('meat'):
      ingredient = <div className={classes.Meat} />
      break
    case ('cheese'):
      ingredient = <div className={classes.Cheese} />
      break
    case ('bacon'):
      ingredient = <div className={classes.Bacon} />
      break
    case ('salad'):
      ingredient = <div className={classes.Salad} />
      break
    case ('pickle'):
      ingredient = <div className={classes.Pickle} />
      break
    case ('pastrami'):
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
