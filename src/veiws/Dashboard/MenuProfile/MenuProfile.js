import React, { useState } from 'react'
import PropTypes from 'prop-types'
import PageContainer from '../../../components/Container/pageContainer'
import { Main } from '../../../constant'

const MenuProfile = props => {
    const [data , setData ] = useState(Main().MyProfile)
  return (
    <PageContainer title={data.title} description={data.description}>
        sami
    </PageContainer>
  )
}

MenuProfile.propTypes = {}

export default MenuProfile