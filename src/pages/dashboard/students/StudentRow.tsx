import React from "react";
import { Student } from "../../../interfaces/Student";
import ProfileIcon from "../../../components/ProfileIcon";
import formatDate from "../../../utils/DateFormat";

const StudentRow = ({student} : {student: Student}) => { 
  return (
    <tr className="border-0 bg-tertiary text-center odd:bg-background hover:bg-light-purple hover:bg-opacity-20 transition-colors ease duration-300 text-white font-normal cursor-pointer">
      <td className="px-4 pl-6 py-4">
        <div className="flex items-center">
          <ProfileIcon member={student} className="w-8 h-8 mr-2" width={"32px"} height={"32"} />
          <p>{student.fullName}</p>
        </div>
      </td>
      <td className="px-4 py-2">{student.email}</td>
      <td className="px-4 py-2">{student.phoneNumber}</td>
      <td className="px-4 py-2 pl-6 flex">
          <div className="flex items-center gap-2 overflow-hidden">
                  <ProfileIcon member={student.counselor} className="text-[10px]" width={"32px"} height={"32px"} />
                  <p className='truncate' title={student.counselor.fullName}>{student.counselor.fullName}</p>
          </div>
      </td>
      <td className="px-4 py-2">{formatDate(student.createdAt)}</td>
    </tr>
  );
};

export default StudentRow;