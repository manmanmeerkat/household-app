import FullCalendar from '@fullcalendar/react'
import React from 'react'
import dayGridPlugin from "@fullcalendar/daygrid"
import jaLocale from '@fullcalendar/core/locales/ja'
import "../../calendar.css"
import { DatesSetArg, EventContentArg } from '@fullcalendar/core'
import { Balance, CalendarContent, Transaction } from '../../types'
import { calculateDailyBalances } from '../../utils/financeCalculations'
import { formatCurrency } from '../../utils/formatting'
import interactionPlugin from '@fullcalendar/interaction'

interface CalendarProps {
  monthlyTransactions: Transaction[],
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>
}

const Calendar = ({ monthlyTransactions,setCurrentMonth }:CalendarProps) => {
  const events = [
    { title: 'Birthday fds ', start: '2024-06-17', income: 1000, expense: 500, balance: 500 },  
  ]

  // FullCalendarのイベントを作成する関数
  

  const dailyBalances = calculateDailyBalances(monthlyTransactions)
console.log("dafd",dailyBalances)

const createCalendarEvents = (dailyBalances: Record<string, Balance>): CalendarContent[] => {
  return Object.keys(dailyBalances).map((date) => {
    const { income, expense, balance } = dailyBalances[date];
    return {
      start: date,
      income: formatCurrency(income),
      expense: formatCurrency(expense),
      balance: formatCurrency(balance),
    };
  }
  );
}

const calendarEvents = createCalendarEvents(dailyBalances)
console.log("cal",calendarEvents)


  const renderEventContent = (eventInfo: EventContentArg) => {
    console.log(eventInfo)
    return (
      <div>
        <div className='money' id="event-income">
          {eventInfo.event.extendedProps.income}
        </div>

        <div className='money' id="event-expense">
          {eventInfo.event.extendedProps.expense}
        </div>

        <div className='money' id="event-balance">
          {eventInfo.event.extendedProps.balance}
        </div>
      </div>
    )
  }

  const handleDateSet = (datesetInfo:DatesSetArg) => {
    setCurrentMonth(datesetInfo.view.currentStart)
  }

  return (
    <FullCalendar 
      locale={jaLocale}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={calendarEvents}
      eventContent={renderEventContent}
      datesSet={handleDateSet}
      />
  )
}

export default Calendar