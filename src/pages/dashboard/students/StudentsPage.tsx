import { useMediaQuery } from '@react-hook/media-query';
import { Add } from 'iconsax-react';
import React from 'react';
import Fab from '../../../components/Fab';
import LottieWidget from '../../../components/LottieWidget';

import noStudentsAnim from '../../../assets/lottie/no-students.json';
import { useStudents } from '../../../provider/StudentsProvider';

export default function StudentsPage() {
    const { students } = useStudents();
    const isPhone = !useMediaQuery('only screen and (min-width: 768px)');

    // Layout when there are no students
    
const NoStudentsLayout = () => (
    <div
      className={`w-full h-full bg-transparent items-center justify-center px-6 py-8 flex flex-col text-white text-center ${
        isPhone ? 'gap-2' : 'gap-10'
      } overflow-x-hidden overflow-y-scroll scholarly-scrollbar relative`}
    >
      <LottieWidget
        lottieAnimation={noStudentsAnim}
        className="w-[40%] h-[40%] object-contain"
      />
      <p>
        There are no students yet in Scholarly.
        <br />
        I'm sure you're eager to see them 😉
      </p>
    </div>
  );

    // Layout when students exist
    const StudentProfileLayout = () => (
        <div className="w-full h-full bg-black text-white p-6 overflow-y-auto scholarly-scrollbar">
            <div className="grid md:grid-cols-2 gap-4">
                {/* Profile Card */}
                <div className="bg-[#121212] rounded-2xl p-6 flex items-center gap-4">
                    <img src="/avatar.png" alt="Profile" className="w-16 h-16 rounded-full" />
                    <div>
                        <h2 className="text-lg font-bold">David Xavier</h2>
                        <p className="text-sm text-gray-400">david_xavier@scholarly.org</p>
                        <p className="text-sm text-gray-400">‪+234 703 968 2384‬</p>
                        <p className="text-sm text-gray-400">Enugu, Enugu</p>
                    </div>
                </div>

                {/* Reports */}
                <div className="bg-[#121212] rounded-2xl p-6">
                    <h3 className="text-lg font-semibold mb-4">Reports</h3>
                    <ul className="text-sm space-y-2">
                        <li className="text-red-500">David has not been attending classes</li>
                        <li className="text-red-500">Hate Speech and Toxic behavior on forum</li>
                        <li className="text-red-500">David does not complete assessments</li>
                    </ul>
                </div>

                {/* Payments */}
                <div className="bg-[#121212] rounded-2xl p-6">
                    <h3 className="text-lg font-semibold mb-4">Payments</h3>
                    <ul className="text-sm space-y-2">
                        <li>#Content - Spring Full <span className="float-right text-green-500">NGN 350,000</span></li>
                        <li>#Content - React Part <span className="float-right text-green-500">NGN 20,000</span></li>
                        <li>#Content - Java Full <span className="float-right text-green-500">NGN 250,000</span></li>
                    </ul>
                </div>

                {/* Cohorts */}
                <div className="bg-[#121212] rounded-2xl p-6">
                    <h3 className="text-lg font-semibold mb-4">Cohorts</h3>
                    <ul className="text-sm space-y-2">
                        <li>Spring23 - Building scalable web backends</li>
                        <li>ReactJS - Building web applications with React</li>
                        <li>NodeJS - Database management with Mongo.</li>
                    </ul>
                </div>
            </div>

            {/* Attendance Heatmap */}
            <div className="mt-6 bg-[#121212] rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">Overall Attendance</h3>
                <div className="grid grid-cols-12 gap-1">
                    {[...Array(144)].map((_, i) => (
                        <div key={i} className="w-4 h-4 rounded-sm" style={{ backgroundColor: i % 4 === 0 ? '#16a34a' : '#1f2937' }}></div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className='w-full h-full bg-transparent'>
            {students.length === 0 ? <NoStudentsLayout /> : <StudentProfileLayout />}
        </div>
    );
}