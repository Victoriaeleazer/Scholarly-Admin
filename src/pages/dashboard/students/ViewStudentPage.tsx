import React from 'react'
import { useNavigate, useParams } from 'react-router';

export default function ViewStudentPage() {
    const {studentId} = useParams<{ studentId: string }>();
    const navigate = useNavigate();
  return (
    <div>{studentId}</div>
  )
}
