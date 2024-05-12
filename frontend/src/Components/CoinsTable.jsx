import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext'
import { CoinList } from '../config/api'
import { numberWithCommas } from './Banner/Carousel'
import { CircularProgress, Container, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import axios from 'axios'

function CoinsTable() {
    const { currency, symbol } = CryptoState()
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1);

    async function fetchAPI() {
        try {
            setLoading(true)
            const response = await axios.get(CoinList(currency))
            if (response.data) {
                setCoins(response.data)
                setLoading(false)
            }
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    }
    useEffect(() => { fetchAPI() }, [currency])
    if (loading) return <div className="center-both"><CircularProgress /></div>
    if (error) return <div className="center-both"><Typography variant='h7'>{error}</Typography></div>

    function handleSearch() {
        return coins.filter((coin) =>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        )
    }

    return (
        <Container>
            <div className='flex-vh'>
                <Typography variant='h6'>Cryprocurrency Prices by Market Cap</Typography>
                <TextField label='Search for crypto currency...' variant='outlined' fullWidth onChange={e => setSearch(e.target.value)} />

                <TableContainer>
                    <Table>

                        <TableHead>
                            <TableRow>
                                {['Coin', 'Price', '24h Change', 'Market Cap'].map(head => (
                                    <TableCell key={head}>{head}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {handleSearch()
                                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                                .map((row) => {
                                    const profit = row.price_change_percentage_24h > 0;
                                    return (
                                        <TableRow key={row.name}>
                                            <TableCell component="th" scope="row" >
                                                <img src={row?.image} width="40 rem" />
                                                <div>
                                                    <span>{row.symbol}</span>
                                                    <span>{row.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {symbol}{" "}
                                                {numberWithCommas(row.current_price.toFixed(2))}
                                            </TableCell>
                                            <TableCell>
                                                {profit && "+"}
                                                {row.price_change_percentage_24h.toFixed(2)}%
                                            </TableCell>
                                            <TableCell>
                                                {symbol}{" "}
                                                {numberWithCommas(
                                                    row.market_cap.toString().slice(0, -6)
                                                )} M
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>

                <div className="flex-c">
                    <Pagination
                        count={(handleSearch()?.length / 10).toFixed(0)}
                        onChange={(_, value) => {
                            setPage(value);
                            window.scroll(0, 450);
                        }}
                    />
                </div>
            </div>
        </Container>
    )
}

export default CoinsTable
