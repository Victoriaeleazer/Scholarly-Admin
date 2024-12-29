import React, { useEffect, useState } from 'react'
import FadeSlideUp from '../../components/FadeSlideUp'
import { Admin } from '../../interfaces/Admin'
import { getAdminUserData, hasAdminUserData } from '../../services/user-storage'
import { useNavigate } from 'react-router'
import { Bar, Line, Pie } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement)

export default function DashboardPage() {
  const [admin, setAdmin] = useState<Admin | null>(null)
  const navigate = useNavigate()

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
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Student Enrollment',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  }

  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Performance',
        data: [65, 59, 80, 81, 56, 55],
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

  const courseData = {
    labels: ['Computer Science', 'Mechanical Engineering', 'Electrical Engineering', 'Business Administration'],
    datasets: [
      {
        label: 'Course Distribution',
        data: [25, 15, 30, 30],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverOffset: 4,
      },
    ],
  }

  return (
    <div className='text-white bg-transparent px-6 py-8 w-full h-full overflow-x-hidden'>
      <FadeSlideUp className='select-none font-light text-4xl'>
        Welcome, {admin?.role.charAt(0).toUpperCase() + admin?.role.substring(1)}{' '}
        <span className='font-extrabold'>{admin?.fullName}</span>
      </FadeSlideUp>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-8'>
        <div className='bg-white p-4 rounded-lg shadow-md '>
          <h2 className='text-2xl font-bold mb-4 text-black'>Student Enrollment</h2>
          <Bar data={barData} options={{ maintainAspectRatio: false }} />
        </div>
        <div className='bg-white p-4 rounded-lg shadow-md'>
          <h2 className='text-2xl font-bold mb-4 text-black'>Performance Over Time</h2>
          <Line data={lineData} options={{ maintainAspectRatio: false, scales: { x: { type: 'category' }, y: { type: 'linear', beginAtZero: true } } }} />
        </div>
        <div className='bg-white p-4 rounded-lg shadow-md'>
          <h2 className='text-2xl font-bold mb-4 text-black'>Distribution of Votes</h2>
          <Pie data={pieData} options={{ maintainAspectRatio: false }}  />
        </div>
        <div className='bg-white p-4 rounded-lg shadow-md'>
          <h2 className='text-2xl font-bold mb-4 text-black'>Course Distribution</h2>
          <Pie data={courseData} options={{ maintainAspectRatio: false }}  />
        </div>
      </div>
    </div>
  )
}