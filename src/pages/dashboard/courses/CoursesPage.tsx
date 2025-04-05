import { useMediaQuery } from '@react-hook/media-query';
import { Add, Image as Photo } from 'iconsax-react';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import Fab from '../../../components/Fab';
import LottieWidget from '../../../components/LottieWidget';

import noCoursesAnim from '../../../assets/lottie/no-courses.json'
import Dialog from '../../../components/Dialog';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { Course } from '../../../interfaces/Course';
import { useMutation } from '@tanstack/react-query';
import { createCourse } from '../../../services/course-repo';
import { delay } from '../../../services/delay';
import { toast } from 'sonner';
import CourseList from './CourseList';
import { useCourses } from '../../../provider/CoursesProvider';

export default function CoursesPage() {
    const {courses, fetch} = useCourses()
    const [dialog, showDialog] = useState(false)
    const courseNameRef = useRef<HTMLInputElement>(null);
    const courseRecommendedPriceRef = useRef<HTMLInputElement>(null);
    const courseDescriptionRef = useRef<HTMLTextAreaElement>(null);

    const [file, setFile] = useState<File | null>(null);
    const [imageSrc, setImageSrc] = useState('');
    const fileSelectRef = useRef<HTMLInputElement>(null);

    const isPhone = !useMediaQuery('only screen and (min-width: 768px)');

    
    
    // The Layout to show there no courses
    const NoCoursePage = ()=>(
        <div className={`w-full h-full bg-transparent items-center justify-center px-6 py-8 flex flex-col text-white text-center ${isPhone?'gap-2':'gap-10'} overflow-x-hidden overflow-y-scroll scholarly-scrollbar relative`}>
            <LottieWidget lottieAnimation={noCoursesAnim} className={`w-[40%] h-[40%] object-contain`} />
            <p>There are no courses yet in Scholarly.<br />Quickly Create One.</p>
        </div>
    )

    const handleImagePick = (e: ChangeEvent<HTMLInputElement>)=>{
        const files = e.target.files ?? [];
        if(files.length <= 0) return;

        const selectedFile = files[0];

        const url = URL.createObjectURL(selectedFile);
        setFile(selectedFile)
        setImageSrc(url);

        
    }

    const formatNumber = (value: string) => {
        // Remove any character except digits and decimal point
        const cleaned = value.replace(/[^\d.]/g, '');

        // Split into whole and decimal parts
        const [wholePart, decimalPart] = cleaned.split('.');

        // Format whole part with commas
        const formattedWhole = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        // Handle final output
        if (decimalPart !== undefined) {
        return formattedWhole + '.' + decimalPart;
        } else if (value.endsWith('.')) {
        return formattedWhole + '.';
        } else {
        return formattedWhole;
        }
    };

    const handleInput = () => {
        if(!courseRecommendedPriceRef.current) return;

        const rawValue = courseRecommendedPriceRef.current.value;
        const formattedValue = formatNumber(rawValue.trim());
        courseRecommendedPriceRef.current.value = formattedValue;
    };

    const createCourseMutation = useMutation({
        mutationFn: async () =>{
            await delay(2_000);
            if(!file){
                throw new Error("Course Profile is required");
            }
            const priceValue = courseRecommendedPriceRef.current!.value.replaceAll(',', '');
            const price = priceValue.length === 0? 0 : Number.parseFloat(priceValue);
            const course = {
                courseName: courseNameRef.current!.value,
                courseDescription: courseDescriptionRef.current!.value,
                recommendedPrice: price
            };

            const result = await createCourse(course, file);
            console.log("Course API: ", result)
            if(result.status !== 200){
                throw new Error(result.data.message)
            }

            return result.data;
        },
        onSuccess: ({message, data})=>{
            toast.success("Created Course", {description: "This course has been created successfully"})
            showDialog(false)
        },
        onError: ({message}) =>{
            toast.error("Error creating course", {description: message ?? "Unknown error occurred when creating course"})

        }
    })

    useEffect(()=>{
        fetch();
    },[])

    // The Layout to show when there courses
    return (
        <div className='w-full h-full'>

            {courses.length === 0 && <NoCoursePage />}
            {courses.length !== 0 && <CourseList />}


            {/* Dialog to Create Course */}
            <Dialog show={dialog} cancelable={false} onClose={()=>showDialog(false)} className='flex w-[700px] gap-10'>
                <div className='w-[330px]'>
                    <input className='hidden' onChange={handleImagePick} ref={fileSelectRef} type='file' multiple={false} accept='image/*' />
                    <p className='text-white mb-4 text-[23px] font-semibold self-start'>Create a Course</p>
                    <form className='flex flex-col items-center justify-center gap-4 text-left w-full' onSubmit={(e)=>{
                        e.preventDefault()
                        createCourseMutation.mutate();
                    }}>
                        

                        {/* Course Name */}
                        <div className='flex flex-col gap-1 w-full'>
                            <p className='text-secondary text-[13px] raleway'>Course Name</p>
                            <input ref={courseNameRef} required multiple={false} className='w-full bg-white bg-opacity-[0.02] px-3 py-3 rounded-[10px] text-[14px] placeholder:text-secondary text-white outline-background outline outline-[2.5px] focus:outline focus:outline-purple' />
                        </div>

                        {/* Course Description */}
                        <div className='flex flex-col gap-1 w-full'>
                            <p className='text-secondary text-[13px] raleway'>Course Description</p>
                            <textarea ref={courseDescriptionRef} required rows={5} className='w-full resize-none scholarly-scrollbar bg-white bg-opacity-[0.02] px-3 py-3 rounded-[10px] text-[14px] placeholder:text-secondary text-white outline-background outline outline-[2.5px] focus:outline focus:outline-purple' />
                        </div>

                        {/* Recommended Price */}
                        <div className='flex flex-col gap-1 w-full'>
                            <p className='text-secondary text-[13px] raleway'>Recommended Price</p>
                            <input inputMode='numeric' ref={courseRecommendedPriceRef} onInput={handleInput} multiple={false} className='w-full bg-white bg-opacity-[0.02] px-3 py-3 rounded-[10px] text-[14px] placeholder:text-secondary text-white outline-background outline outline-[2.5px] focus:outline focus:outline-purple' />
                            <p className='text-secondary text-[11px]'>* The minimum price this course would be charged for when Cohorts are created for students. It can be free</p>
                        </div>

                        <Button className='mt-2' title={'Create Course'} loading={createCourseMutation.isPending} type='submit'  />

                    </form>
                </div>

                <div className='flex flex-col flex-1 flex-center bg-black rounded-[12px]'>
                    {/* Course Profile */}
                    <div className='flex flex-col flex-center -mb-2 gap-4 w-full'>
                        {!file && <div onClick={()=>{
                            if(!fileSelectRef.current) return;
                            fileSelectRef.current.click();
                        }} className='w-[150px] h-[150px] rounded-circle flex cursor-pointer flex-center outline-dashed outline-secondary'>
                            <Photo size={40} className='text-secondary' />
                        </div>}

                        {file && <img onClick={()=>{
                            if(!fileSelectRef.current) return;
                            fileSelectRef.current.click();
                        }} src={imageSrc} className='w-[150px] h-[150px] cursor-pointer rounded-circle object-cover object-center' />}
                        <p className='text-secondary text-[13px] raleway'>{file? "Change Course Photo" : "Select Course Photo"}</p>

                        
                    </div>
                </div>
                

            </Dialog>



            <Fab onClick={()=>showDialog(true)}>
                <Add size={25} />
            </Fab>
        </div>
    );
}
