import { ReactNode } from "react";

export interface DashboardNav{
    name:string,
    link:string,
    icon:ReactNode,
    selectedIcon?:ReactNode
}