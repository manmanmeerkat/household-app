import FullCalendar from '@fullcalendar/react'
import React from 'react'
import dayGridPlugin from "@fullcalendar/daygrid"
import jaLocale from '@fullcalendar/core/locales/ja'
import "../../calendar.css"
import { EventContentArg } from '@fullcalendar/core'

const Calendar = () => {
  const events = [
    { title: 'Meeting', start: new Date() },
    // { title: 'Man', start: "2024-6-17" , income: 1000, expense: 500, balance: 500}
  
  ]

  // const renderEventContent = (eventInfo: EventContentArg) => {
  //   console.log(eventInfo)
  //   return (
  //     <div>
  //       <div className='money' id="event-income">
  //         {eventInfo.event.extendedProps.income}
  //       </div>

  //       <div className='money' id="event-expense">
  //         {eventInfo.event.extendedProps.expense}
  //       </div>

  //       <div className='money' id="event-balance">
  //         {eventInfo.event.extendedProps.balance}
  //       </div>
  //     </div>
  //   )
  // }
  return (
    <FullCalendar 
      locale={jaLocale}
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
      // eventContent={renderEventContent}
      />
  )
}

export default Calendar