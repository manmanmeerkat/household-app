import { Box } from '@mui/material'
import React from 'react'
import MonthlySummary from '../components/layout/MonthlySummary'
import Calendar from '../components/layout/Calendar'
import TransactionMenu from '../components/layout/TransactionMenu'
import TransanctionForm from '../components/layout/TransactionForm'
import { Transaction } from '../types'

interface HomeProps {
  monthlyTransactions: Transaction[],
}

const Home = ({monthlyTransactions}: HomeProps) => {
  return (
    <Box sx={{display: "flex"}}>
        {/* 左側コンテンツ */}
        <Box sx={{flexGrow: 1, bgcolor: ""}}>
            <MonthlySummary monthlyTransactions={monthlyTransactions} />
            <Calendar />
        </Box>
        {/* 右側コンテンツ */}
        <Box>
            <TransactionMenu />
            <TransanctionForm />
        </Box>
    </Box>
  )
}

export default Home