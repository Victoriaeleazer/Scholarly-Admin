import React, { useEffect, useState } from 'react'
import FadeSlideUp from '../../components/FadeSlideUp'
import { Admin } from '../../interfaces/Admin'
import { getAdminUserData, hasAdminUserData } from '../../services/user-storage'
import { useNavigate } from 'react-router'
import { Bar, Line, Pie } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler } from 'chart.js'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { Book1, People, Personalcard } from 'iconsax-react'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler)




export default function DashboardPage() {
  const [admin, setAdmin] = useState<Admin | null>(null)
  const navigate = useNavigate()

  
  //calender
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  
  const handleMonthYearChange = (month: number, year: number) => {
    setCurrentDate(new Date(year, month, 1));
    setIsPickerOpen(false); // Close the picker after selection
  };
  const [currentDate, setCurrentDate] = useState(new Date());
  const [reminders, setReminders] = useState<{ date: string; description: string }[]>([
    { date: '2025-04-16', description: 'Project deadline' },
    { date: '2025-04-20', description: 'Team meeting' },
    
  ]);
  const today = new Date();

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const startDay = startOfMonth.getDay();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const renderDays = () => {
    const days: JSX.Element[] = [];
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty-day"></div>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const dayDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const reminder = reminders.find((r) => r.date === dayDate);
      const isToday =
        today.getDate() === i &&
        today.getMonth() === currentDate.getMonth() &&
        today.getFullYear() === currentDate.getFullYear();
  
      days.push(
        <div key={i} className={`day ${isToday ? 'today' : ''}`} title={reminder?.description || ''}>
          {i}
          {reminder && <div className="reminder-dot"></div>}
        </div>
      );
    }
    return days;
  };
//calender



  useEffect(() => {
    if (hasAdminUserData()) {
      setAdmin(getAdminUserData())
      return
    }
    navigate('../login', { replace: true })
  }, [])

  if (!admin) {
    return <p></p>
  }

  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Student Enrollment',
        data: [65, 59, 80, 81, 56, 55, 40, 30, 20, 10, 5, 1],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  }

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Performance',
        data: [65, 59, 80, 81, 56, 55, 40, 30, 20, 10, 40, 1],
        fill: true,
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        borderColor: 'rgba(76, 175, 80, 1)',
        tension: 0.3,
      },
    ],
  }

  const pieData = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1,
      },
    ],
  }



  const calendarTileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      return 'text-black '
    }
  }

  function setSelectedDate(value: string): void {
    throw new Error('Function not implemented.')
  }

  return (
    <div className='text-white bg-transparent px-6 py-8 w-full h-fit overflow-x-hidden overflow-y-scroll scholarly-scrollbar'>
      <FadeSlideUp className='select-none font-light text-4xl'>
        Welcome, {admin?.role.charAt(0).toUpperCase() + admin?.role.substring(1)}{' '}
        <span className='font-extrabold'>{admin?.fullName}</span>
      </FadeSlideUp>

      
      <div className='grid grid-cols-4 gap-4 mb-4 py-3'>
      <div className='bg-tertiary text-white p-4 rounded-lg shadow-md flex gap-2'>
        <People size="32" color="#560677" />
          <h3 className='text-lg font-bold '>Total Students <span className='border-l border-white pl-2 text-2xl ml-1'>75</span></h3>
        </div>

        <div className='bg-tertiary text-white p-4 rounded-lg shadow-md flex gap-2'>
        <Personalcard size="32" color="#560677"/>
          <h3 className='text-lg font-bold'>Total Teachers <span className='border-l border-white pl-2 text-2xl ml-1'>50</span></h3>
        </div>

        <div className='bg-tertiary text-white p-4 rounded-lg shadow-md flex gap-2'>
        <Book1 size="32" color="#560677"/>
          <h3 className='text-lg font-bold'>Total Courses <span className='border-l border-white pl-2 text-2xl ml-1'>130</span> </h3>
        </div>

        

      </div>
      

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-8'>
        <div className='bg-tertiary text-secondary max-h-[400px] p-4 rounded-lg shadow-md '>
          <h2 className='text-2xl font-bold mb-4 text-white'>Student Enrollment</h2>
          <Bar data={barData} options={{ plugins: { legend: { display: false } } }} />
        </div>
        <div className='bg-tertiary p-4 max-h-[400px] rounded-lg shadow-md text-secondary'>
          <h2 className='text-2xl font-bold mb-4 text-white'>Performance Over Time</h2>
          <Line data={lineData} options={{ maintainAspectRatio: true, plugins: { legend: { display: false }, filler: { propagate: true }, colors: { forceOverride: true } }, scales: { x: { type: 'category' }, y: { type: 'linear', beginAtZero: true } } }} />
        </div>


<div className="calendar-container">
<div className="calendar-header">
  <button onClick={handlePrevMonth}>&lt;</button>
  <h2 onClick={() => setIsPickerOpen(!isPickerOpen)} className="month-year-picker">
    {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
  </h2>
  <button onClick={handleNextMonth}>&gt;</button>
</div>
      <div className="calendar-days">
        {daysOfWeek.map((day) => (
          <div key={day} className="day-name">
            {day}
          </div>
        ))}
        {renderDays()}
      </div>
    </div>


    {isPickerOpen && (
  <div className="month-year-menu">
    <div className="year-selector">
      <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1))}>
        &lt;
      </button>
      <span>{currentDate.getFullYear()}</span>
      <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1))}>
        &gt;
      </button>
    </div>
    <div className="month-selector">
      {months.map((month, index) => (
        <button
          key={month}
          onClick={() => handleMonthYearChange(index, currentDate.getFullYear())}
          className={index === currentDate.getMonth() ? 'selected' : ''}
        >
          {month}
        </button>
      ))}
    </div>
  </div>
)}
        
        


      {/* <div className='grid grid-cols-2 gap-4 '>
         <div className='bg-tertiary p-4 max-h-[400px] rounded-lg shadow-md'>
          <h2 className='text-2xl font-bold mb-4 text-white'>Notice Board</h2>
        </div> 
        
        
  
      { <div className='bg-tertiary p-4 max-h-[400px] rounded-lg shadow-md'>
          <h2 className='text-2xl font-bold mb-4 text-white'>Recent Activities</h2>
      </div> }
      </div> */}
      
     
    </div>
    </div>
  )
}