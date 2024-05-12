import { Container, Typography } from '@mui/material'
import React from 'react'
import Carousel from './Carousel'

function Banner() {
  return (
    <Container>
      <div className='flex-v2'>
        <div className='flex-vh'>
          <Typography variant='h4'>Crypto Watch</Typography>
          <Typography variant='sub-title'>Unlock the Power of Crypto: Discover, Track, and Explore with Ease!</Typography>
        </div>
        <Carousel />
      </div>
    </Container>
  )
}

export default Banner
