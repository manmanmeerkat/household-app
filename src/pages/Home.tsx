import { Box } from '@mui/material'
import React, { useState } from 'react'
import MonthlySummary from '../components/layout/MonthlySummary'
import Calendar from '../components/layout/Calendar'
import TransactionMenu from '../components/layout/TransactionMenu'
import TransanctionForm from '../components/layout/TransactionForm'
import { Transaction } from '../types'
import { format } from 'date-fns'

interface HomeProps {
  monthlyTransactions: Transaction[],
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>
}

const Home = ({monthlyTransactions,setCurrentMonth}: HomeProps) => {
  const today = format(new Date(), 'yyyy-MM-dd');
  console.log("today",today)
  const [currentDay, setCurrentDay] = useState(today);
  const [isEntryDrawerOpen,setIsEntryDrawerOpen] = useState(false);

   const dailyTransactions = monthlyTransactions.filter((transaction) => {
    return transaction.date === currentDay;
  }
  );
  
  const closeForm = () => {
    setIsEntryDrawerOpen(!isEntryDrawerOpen)
  };

  //フォームの開閉処理
  const handleAddTransactionForm = () => {
    setIsEntryDrawerOpen(!isEntryDrawerOpen)
  };

  return (
    <Box sx={{display: "flex"}}>
        {/* 左側コンテンツ */}
        <Box sx={{flexGrow: 1, bgcolor: ""}}>
            <MonthlySummary monthlyTransactions={monthlyTransactions} />
          <Calendar 
          monthlyTransactions={monthlyTransactions} 
          setCurrentMonth={setCurrentMonth}
          setCurrentDay={setCurrentDay}
          currentDay={currentDay}
          today={today}
          />
        </Box>
        {/* 右側コンテンツ */}
        <Box>
            <TransactionMenu 
            dailyTransactions={dailyTransactions} 
            currentDay={currentDay}
            onAddTransactionForm={handleAddTransactionForm}
            />
            <TransanctionForm 
            onCloseForm={closeForm}
            isEntryDrawerOpen={isEntryDrawerOpen}
            currentDay={currentDay}
            />
        </Box>
    </Box>
  )
}

export default Home