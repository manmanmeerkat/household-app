import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Report from './pages/Report';
import NoMatch from './pages/NoMatch';
import AppLayout from './components/layout/AppLayout';
import {theme} from './theme/theme';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { Transaction } from './types/index';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { format } from 'date-fns';
import { formatMonth } from './utils/formatting';

function App() {
  // 引数がFireStoreのエラー型かどうかを判定する関数
  function isFireStoreError(err:unknown): err is { code: string, message: string } {
    return typeof err === 'object' && err !== null && 'code' in err && 'message' in err;
  }

  const[transactions, setTransactions] = useState<Transaction[]>([]);
  const[currentMonth, setCurrentMonth] = useState(new Date());
  const a = format(currentMonth, 'yyyy-MM');


  useEffect(() => {
    const fecheTransactions = async() => {
    try {
      const querySnapshot = await getDocs(collection(db, "Transactions"))
      console.log("qu",querySnapshot)
      const transactionsData = querySnapshot.docs.map((doc) => {
        return { 
          id: doc.id,
          ...doc.data()
        } as Transaction
      });

      console.log("tra",transactionsData)
      setTransactions(transactionsData);
      console.log("tramsa",transactions)
    } catch(err) {
      if(isFireStoreError(err)) {
        console.error("firestoreのエラーは",err.code, "firebaseのエラーメッセージは",err.message)
      } else {
        console.error("一般的なエラーは",err)
      }
    }
    }
    fecheTransactions();
  },[])

  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatMonth(currentMonth))
  })

  console.log("mon",monthlyTransactions)


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home monthlyTransactions={monthlyTransactions} setCurrentMonth={setCurrentMonth}/>} />
          <Route path="/report" element={<Report />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
