import React from 'react'
import PropTypes from 'prop-types'

import './index.css'

const UnderConstruction = props => {
  return (
    <div className="container under">
        <div className="wrapper">
            <div className="content">
            <div className="item">
                <h1>COMING SOON</h1>
                {/* <p>This website is under construction.</p> */}
            </div>
            </div>
        </div>
    </div>
  )
}

UnderConstruction.propTypes = {}

export default UnderConstruction