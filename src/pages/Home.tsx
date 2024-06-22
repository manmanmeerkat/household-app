import { Box } from '@mui/material'
import React, { useState } from 'react'
import MonthlySummary from '../components/layout/MonthlySummary'
import Calendar from '../components/layout/Calendar'
import TransactionMenu from '../components/layout/TransactionMenu'
import TransanctionForm from '../components/layout/TransactionForm'
import { Transaction } from '../types'
import { format, set } from 'date-fns'
import { Schema } from '../validations/schema'

interface HomeProps {
  monthlyTransactions: Transaction[],
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>
  onSaveTransaction: (transaction: Schema) => Promise<void>
  onDeleteTransaction: (transactionId: string) => Promise<void>
  onUpdateTransaction: (transaction: Schema, transactionId: string) => Promise<void>
}

const Home = ({
  monthlyTransactions,
  setCurrentMonth, 
  onSaveTransaction,
  onDeleteTransaction,
  onUpdateTransaction
}: HomeProps) => {
  const today = format(new Date(), 'yyyy-MM-dd');
  console.log("today",today)
  const [currentDay, setCurrentDay] = useState(today);
  const [isEntryDrawerOpen,setIsEntryDrawerOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

   const dailyTransactions = monthlyTransactions.filter((transaction) => {
    return transaction.date === currentDay;
  }
  );
  
  const closeForm = () => {
    setIsEntryDrawerOpen(!isEntryDrawerOpen);
    setSelectedTransaction(null);
  };

  //フォームの開閉処理
  const handleAddTransactionForm = () => {
    if (selectedTransaction) {
      setSelectedTransaction(null);
    } else {
      setIsEntryDrawerOpen(!isEntryDrawerOpen)
    }
  };
  
  const handleSelectTransaction = (transaction: Transaction) => {
    setIsEntryDrawerOpen(true);
    setSelectedTransaction(transaction);
  }
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
            onSelectTransaction={handleSelectTransaction}
            />
            <TransanctionForm 
            onCloseForm={closeForm}
            isEntryDrawerOpen={isEntryDrawerOpen}
            currentDay={currentDay}
            onSaveTransaction={onSaveTransaction}
            selectedTransaction={selectedTransaction}
            onDeleteTransaction={onDeleteTransaction}
            setSelectedTransaction={setSelectedTransaction}
            onUpdateTransaction={onUpdateTransaction}
            />
        </Box>
    </Box>
  )
}

export default Home