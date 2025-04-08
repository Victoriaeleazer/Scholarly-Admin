import { AxiosResponse } from "axios";
import { Course } from "../interfaces/Course";
import { apiGateway } from "./api-core";
import { ApiResponse } from "../interfaces/ApiResponse";

type CoursePayload = {
    courseName:string,
    coursePhoto?: string,
    courseDescription: string,
    recommendedPrice: number
}

export async function createCourse(payload: CoursePayload, coursePhoto: Blob){
    const formData = new FormData();
        formData.append("file", coursePhoto);
        formData.append("type", 'image');
        const uploadResult = await apiGateway.post("/upload/uploadFile", formData, {headers:{"Content-Type":"multipart/form-data"}}) as AxiosResponse<ApiResponse, any>;
        if(uploadResult.status !== 200){
            return uploadResult;
        }

        const newPayload = {...payload, coursePhoto: uploadResult.data.data} as CoursePayload;
        const result = await apiGateway.post("/course/createCourse", newPayload) as AxiosResponse<ApiResponse, any>;

        return result;
    
    
}