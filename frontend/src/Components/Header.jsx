import { AppBar, Container, MenuItem, Select, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { CryptoState } from '../CryptoContext'

function Header() {
  const { currency, setCurrency } = CryptoState()

  return (
    <div className="header">
      <AppBar color='transparent' position='static'>
      <Container>
        <Toolbar>
          <Typography variant='h6' sx={{flex: '1'}}><Link to={'/'}>Crypto Watch</Link></Typography>
          <Select variant="outlined" value={currency} onChange={e => setCurrency(e.target.value)}>
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"INR"}>INR</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
    </div>
  )
}

export default Header
