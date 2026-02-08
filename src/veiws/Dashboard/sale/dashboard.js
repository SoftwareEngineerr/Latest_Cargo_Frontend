import React from 'react'
import PropTypes from 'prop-types'
import IncomingOrders from './component/incomingOrders'
import OutgoingOrder from './component/outgoingOrders'

const Cargo = (props) => {
  return (
    <>
        <IncomingOrders />
        <OutgoingOrder />
    </>
  )
}

Cargo.propTypes = {}

export default Cargo