import { createContext, useCallback, useContext, useEffect, useState } from "react";
import React from 'react'
import { Student } from "../interfaces/Student";
import { getAdmins, getCallToken, getStudents, saveAdmins, saveStudents } from "../services/user-storage";
import { useStompClient } from "./StompClientContext";
import { distinctList } from "../utils/ArrayUtils";
import { ApiResponse } from "../interfaces/ApiResponse";
import { useAdmin } from "./AdminProvider";

export interface StudentsAPI{
    students: Student[],
    fetch: ()=>void,
}

const StudentsContext = createContext<StudentsAPI | null>(null);

const studentsCompareFn = (a:Student, b:Student)=> (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());


/**
 * Responsible for reading, and overwriting students details globally within the app.
 * 
 * Must be used within `StompClientProvider`
 * @author Teninlanimi Taiwo
 */
export const useStudents = ()=>{
    const context = useContext(StudentsContext);

    if(!context){
        throw new Error("`useStudents` should be used within StudentsProvider")
    }

    return context;
}

/**
 * Provider, responsible for exposing students details globally within the app.
 * 
 * @author Teninlanimi Taiwo
 */
export function StudentsProvider({children}: {children?: React.JSX.Element}){
    const [students, setStudentsRaw] = useState<Student[]>(getStudents());

    const {publish, subscribe} = useStompClient();

    useEffect(()=>{
        saveStudents(students)
    }, [students])

    

    useEffect(()=>{

        subscribe(`/students`, (message)=>{
            const body = JSON.parse(message.body);

            const data = (body as ApiResponse).data;

            if(!data) return;

            if (Array.isArray(data)) {
                const _students = data.filter(_c => _c !== undefined).map((admin) => admin as Student);
                // We remove this devices admin from the data.
                setStudents(_students);
                
            } else {
                const studentData = data as Student;
                addStudent(studentData);

            }
        });
        publish(`/scholarly/getStudents`)

    }, [])

    const addStudent = useCallback((student: Student)=>{
        setStudentsRaw((studentAdmins)=> distinctList([...studentAdmins, student], 'id', studentsCompareFn))
    }, [])

    const fetch = useCallback(()=>{
        publish(`/scholarly/getStudents`)
    }, [])

    const setStudents = useCallback((_students: Student[])=>{
        setStudentsRaw(distinctList(_students, 'id'))        
    }, [])

    const removeStudent = useCallback((adminId: string)=>{
        const capturedChats = [...students]
        const filtered = capturedChats.filter(batch => batch.id !== adminId);

        setStudentsRaw(distinctList(filtered, 'id', studentsCompareFn));
    }, [])

    return <StudentsContext.Provider value={{students, fetch}} >
        {children}
    </StudentsContext.Provider>
}