import { createContext, useCallback, useContext, useEffect, useState } from "react";
import React from 'react'
import { Admin } from "../interfaces/Admin";
import { hasAdminUserData, getAdminUserData } from "../services/user-storage";

export interface AdminAPI{
    admin: Admin | null,
    setAdmin: (admin: Admin | null) => void,
}

const AdminContext = createContext<AdminAPI | null>(null);


/**
 * Responsible for reading, and overwriting admin (user) details globally within the app.
 * 
 * Must be used within `AdminProvider`
 * @author Teninlanimi Taiwo
 */
export const useAdmin = ()=>{
    const context = useContext(AdminContext);

    if(!context){
        throw new Error("`useAdmin` should be used within AdminProvider")
    }

    return context;
}

/**
 * Provider, responsible for exposing admin (user) details globally within the app.
 * 
 * @author Teninlanimi Taiwo
 */
export function AdminProvider({children}: {children?: React.JSX.Element}){
    const [admin, setAdminRaw] = useState<Admin | null>(getAdminUserData())

    // To initialize the students from local storage
    useEffect(()=>{
        if(hasAdminUserData()){
            setAdmin(getAdminUserData())
        }
    }, [])

    const setAdmin = useCallback((_admin: Admin | null)=>{
        setAdminRaw(_admin)
    }, [])
    return <AdminContext.Provider value={{admin, setAdmin}} >
        {children}
    </AdminContext.Provider>
}