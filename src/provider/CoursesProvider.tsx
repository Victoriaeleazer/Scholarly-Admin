
import React, { createContext, useCallback, useContext, useEffect, useState } from "react"
import { useStompClient } from "./StompClientContext";
import {ApiResponse} from '../interfaces/ApiResponse';
import {getCourses, saveCourses} from "../services/user-storage";
import { distinctList } from "../utils/ArrayUtils";
import {Course} from "../interfaces/Course";

interface CourseAPI {
    courses: Course[],
    fetch: ()=>void,
    // myBatches: Course[],
    // setBatches: (batches: Course[]) => void,
    // addBatch: (batce: Course) => void,
    // removeBatch: (batchId: string) => void,
}

const CourseContext = createContext<CourseAPI | null>(null);

/**
 * Responsible for reading, adding and overwriting courses globally within the app.
 * 
 * Must be used within `CoursesProvider`
 * @author Teninlanimi Taiwo
 */
export const useCourses = (): CourseAPI =>{
    const context = useContext(CourseContext);

    if(!context){
        throw new Error("useCourses must be used within CoursesProvider");
    }

    return context;
}

/**
 * Responsible for reading or listening to a course on the `courseId`.
 * This can be used anywhere.
 * 
 * Must be used within `CoursesProvider`
 * @author Teninlanimi Taiwo
 */
export const useCourse = (courseId: string) : Course =>{
    const context = useContext(CourseContext);

    if(!context){
        throw new Error("useCourses must be used within CoursesProvider");
    }

    const event = context.courses.find(chat => chat.id === courseId);

    if(!event){
        throw new Error("Course couldn't be found");
    }

    return event;
}

const coursesCompareFn = (a:Course, b:Course)=> (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

/**
 * Provider responsible for exposing courses context in the app globally.
 * Listens to batch websockets and updates them
 * Must be used within the `StompClientProvider` component
 * @author Teninlanimi Taiwo
 */
export function CoursesProvider({children}: {children?: React.JSX.Element}){
    const {subscribe, publish} = useStompClient();


    const [courses, setCoursesRaw] = useState<Course[]>(getCourses())


    // To initialize the courses from local storage
    useEffect(()=>{
        setCourses(getCourses())
    }, [])

    useEffect(()=>{
        saveCourses(courses);
    }, [courses])

    

    useEffect(()=>{

        subscribe(`/courses`, (message)=>{
            const body = JSON.parse(message.body);

            const data = (body as ApiResponse).data;

            console.log(`Got courses`, data);

            if(!data) return;

            if (Array.isArray(data)) {
                const _chats = data.filter(_c => _c !== undefined).map((chat) => chat as Course);
                setCourses(_chats);
            } else {
                const chatData = data as Course;
                addCourse(chatData);
            }
        });

        publish(`/scholarly/getCourses`)

    }, [])
    
    const addCourse = useCallback((course: Course)=>{
        setCoursesRaw((prevCourses)=> distinctList([...prevCourses, course], 'id', coursesCompareFn))
    }, [])

    const fetch = useCallback(()=>{
        publish(`/scholarly/getCourses`)
    }, [])

    const setCourses = useCallback((_courses: Course[])=>{
        setCoursesRaw(distinctList(_courses, 'id'))        
    }, [])

    const removeCourse = useCallback((courseId: string)=>{
        const capturedChats = [...courses]
        const filtered = capturedChats.filter(batch => batch.id !== courseId);

        setCoursesRaw(distinctList(filtered, 'id', coursesCompareFn));
    }, [])

    return <CourseContext.Provider value={{ courses, fetch}}>
        {children}
    </CourseContext.Provider>
}