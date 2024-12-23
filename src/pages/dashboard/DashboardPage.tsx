import React, { useEffect, useState } from 'react'
import FadeSlideUp from '../../components/FadeSlideUp'
import { Admin } from '../../interfaces/Admin'
import { getAdminUserData, hasAdminUserData } from '../../services/user-storage'
import { useNavigate } from 'react-router'

export default function DashboardPage() {
  const [admin, setAdmin] = useState<Admin | null>(null)

  const navigate = useNavigate();

  // We initialize the admin.
  // If the admin data isn't stored we redirect to the login page
  useEffect(()=>{
    if(hasAdminUserData()){
      setAdmin(getAdminUserData())
      return;
    }
    navigate('../login', {replace:true})

  }, [])

  if(!admin){
    return (<p></p>);
  }
  return (
    <div className='text-white bg-transparent px-6 py-8 w-full h-fit overflow-x-hidden overflow-y-scroll scholarly-scrollbar'>
      <FadeSlideUp className='select-none font-light text-4xl'>Welcome, {admin?.role.charAt(0).toUpperCase() + admin?.role.substring(1)} <span className='font-extrabold'>{admin?.fullName}</span> </FadeSlideUp>
      {/* <FadeSlideUp delay={5000} slideDirection='left'>Hello</FadeSlideUp> */}

      <div className="w-64 bg-purple text-white h-screen p-5">
            <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
            <ul>
                <li><a href="#" className="block py-2 px-4 hover:bg-black rounded">Dashboard</a></li>
                <li><a href="#" className="block py-2 px-4 hover:bg-black rounded">Students</a></li>
                <li><a href="#" className="block py-2 px-4 hover:bg-black rounded">Courses</a></li>
                <li><a href="#" className="block py-2 px-4 hover:bg-black rounded">Reports</a></li>
            </ul>
        </div>

        {/* <!-- Main Content --> */}
        <div className="flex-1 p-6">
            {/* <!-- Header --> */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-semibold">Student Management Dashboard</h1>
                <div className="flex items-center space-x-4">
                    <div className="text-white">Hello, Admin</div>
                    {/* <img src="https://www.gravatar.com/avatar/00000000000000000000000000000000" alt="Avatar"
                        className="w-8 h-8 rounded-full"> */}
                </div>
            </div>

            {/* <!-- Graphs and Charts --> */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* <!-- Enrollment Trend Chart --> */}
                <div className="bg-purple shadow rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">Student Enrollment Trend</h3>
                    <canvas id="enrollmentChart"></canvas>
                </div>

                {/* <!-- Course Distribution Chart --> */}
                <div className="bg-purple shadow rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">Course Distribution</h3>
                    <canvas id="courseChart"></canvas>
                </div>
            </div>

            {/* <!-- Student Table --> */}
            <div className="overflow-x-auto bg-black shadow rounded-lg">
                <table className="min-w-full table-auto text-sm">
                    <thead className="bg-purple text-left ">
                        <tr>
                            <th className="px-4 py-2">Student ID</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Course</th>
                            <th className="px-4 py-2">Info</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b hover:bg-black">
                            <td className="px-4 py-2">1</td>
                            <td className="px-4 py-2">random</td>
                            <td className="px-4 py-2">random6@example.com</td>
                            <td className="px-4 py-2">Computer Science</td>
                            <td className="px-4 py-2 text-white hover:underline cursor-pointer">View</td>
                        </tr>
                        <tr className="border-b hover:bg-">
                            <td className="px-4 py-2">2</td>
                            <td className="px-4 py-2">random</td>
                            <td className="px-4 py-2">random21@example.com</td>
                            <td className="px-4 py-2">Mechanical Engineering</td>
                            <td className="px-4 py-2 text-white hover:underline cursor-pointer">View</td>
                        </tr>
                        <tr className="border-b hover:bg-">
                            <td className="px-4 py-2">3</td>
                            <td className="px-4 py-2">random</td>
                            <td className="px-4 py-2">random55@example.com</td>
                            <td className="px-4 py-2">Electrical Engineering</td>
                            <td className="px-4 py-2 text-white hover:underline cursor-pointer">View</td>
                        </tr>
                        <tr className="border-b hover:bg-">
                            <td className="px-4 py-2">4</td>
                            <td className="px-4 py-2">random</td>
                            <td className="px-4 py-2">random123@example.com</td>
                            <td className="px-4 py-2">Business Administration</td>
                            <td className="px-4 py-2 text-white hover:underline cursor-pointer">View</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* <!-- Add Student Button --> */}
            <div className="mt-6 flex justify-end">
                <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-purple">Add Student</button>
            </div>
        </div>

    {/* <!-- Chart.js Script for Enrollment Trend --> */}
    {/* <script>
    var enrollmentCtx = document.getElementById('enrollmentChart').getContext('2d');
    var enrollmentChart = new Chart(enrollmentCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'New Enrollments',
                data: [5, 8, 12, 7, 10, 14, 18],
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'category',  // Explicitly set x-axis type to 'category'
                    beginAtZero: true
                },
                y: {
                    type: 'linear',   // Explicitly set y-axis type to 'linear'
                    beginAtZero: true
                }
            }
        }
    });
</script> */}


    {/* <!-- Chart.js Script for Course Distribution --> */}
    {/* <script>
        var courseCtx = document.getElementById('courseChart').getContext('2d');
        var courseChart = new Chart(courseCtx, {
            type: 'pie',
            data: {
                labels: ['Computer Science', 'Mechanical Engineering', 'Electrical Engineering', 'Business Administration'],
                datasets: [{
                    label: 'Course Distribution',
                    data: [25, 15, 30, 30],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
            }
        });
    </script> */}
    </div>
  )
}
