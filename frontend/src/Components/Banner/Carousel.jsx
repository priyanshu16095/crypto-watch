import React, { useEffect, useState } from 'react'
import { TrendingCoins } from '../../config/api'
import { CryptoState } from '../../CryptoContext'
import axios from 'axios'
import { Typography } from '@mui/material'
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function Carousel() {
  const [error, setError] = useState('')
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    try {
      const response = await axios.get(TrendingCoins(currency));
      if (response.data) {
        setTrending(response.data)
      }
    } catch (error) {
      setError(error.message)
    }
  };

  useEffect(() => { fetchTrendingCoins() }, [currency]);
  if (error) return <div className="flex-c"><Typography variant='h7'>{error}</Typography></div>

  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;

    return (
      <Link to={`/coins/${coin.id}`}>
        <div className="flex-vh">
          <img src={coin?.image} width={'60rem'} />
          <span>{coin?.symbol}</span>
          <div className="flex-h">
          <span>
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
          <span>{symbol} {numberWithCommas(coin?.current_price.toFixed(2))}</span>
          </div>
        </div>
      </Link>
    );
  });

  const responsive = {
    0: { items: 2 },
    512: { items: 4 }
  };

  return (
    <div>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  );
}

export default Carousel
