import React from 'react'
import Banner from '../Components/Banner/Banner'
import Carousel from '../Components/Banner/Carousel'
import CoinsTable from '../Components/CoinsTable'

const Home = () => {
  return (
    <div className='home'>
      <Banner />
      <CoinsTable />
    </div>
  )
}

export default Home
