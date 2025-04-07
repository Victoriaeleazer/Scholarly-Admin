import { AxiosResponse } from "axios";
import { ApiResponse } from "../interfaces/ApiResponse";
import { apiGateway } from "./api-core";
import { Admin } from "../interfaces/Admin";

export type CohortPayload={
    batchName: string,
    course: string,
    faculty:string, // More strictly an admin
    startPeriod: string,
    endPeriod: string,
    recommendedPrice: number,
    members: string[],
    timetable:string[],
}

export async function createCohort(cohort: CohortPayload, admin: Admin){
    const pathVariables = `${admin.id}/${cohort.faculty}`;
    const result = await apiGateway.post(`/batches/createBatch/${pathVariables}`, cohort) as AxiosResponse<ApiResponse, any>;
    
    return result;
}