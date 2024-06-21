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
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { format } from 'date-fns';
import { formatMonth } from './utils/formatting';
import { Schema } from './validations/schema';

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

  // 月ごとの取引データを取得
  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatMonth(currentMonth))
  })

  // 取引データを保存
  const handleSaveTransaction = async (transaction: Schema) => {
    console.log("transaction",transaction)
    try {
      //firestoreにデータを保存
      const docRef = await addDoc(collection(db, "Transactions"), transaction);
    
      const newTransaction = {
        id: docRef.id,
        ...transaction
      } as Transaction;
      setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
    } catch(err) {
      if(isFireStoreError(err)) {
        console.error("firestoreのエラーは",err.code, "firebaseのエラーメッセージは",err.message)
      } else {
        console.error("一般的なエラーは",err)
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={
            <Home 
              monthlyTransactions={monthlyTransactions} 
              setCurrentMonth={setCurrentMonth}
              onSaveTransaction={handleSaveTransaction}
              />} />
          <Route path="/report" element={<Report />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
