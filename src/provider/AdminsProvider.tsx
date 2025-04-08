import { createContext, useCallback, useContext, useEffect, useState } from "react";
import React from 'react'
import { Admin } from "../interfaces/Admin";
import { getAdmins, getCallToken, saveAdmins } from "../services/user-storage";
import { useStompClient } from "./StompClientContext";
import { distinctList } from "../utils/ArrayUtils";
import { ApiResponse } from "../interfaces/ApiResponse";
import { useAdmin } from "./AdminProvider";

export interface AdminsAPI{
    admins: Admin[],
    fetch: ()=>void,
}

const AdminsContext = createContext<AdminsAPI | null>(null);

const adminsCompareFn = (a:Admin, b:Admin)=> (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());


/**
 * Responsible for reading, and overwriting admin (user) details globally within the app.
 * 
 * Must be used within `AdminProvider`
 * @author Teninlanimi Taiwo
 */
export const useAdmins = ()=>{
    const context = useContext(AdminsContext);

    if(!context){
        throw new Error("`useAdmins` should be used within AdminsProvider")
    }

    return context;
}

/**
 * Provider, responsible for exposing admin (user) details globally within the app.
 * 
 * @author Teninlanimi Taiwo
 */
export function AdminsProvider({children}: {children?: React.JSX.Element}){
    const {admin, setAdmin} = useAdmin()
    const [admins, setAdminsRaw] = useState<Admin[]>(getAdmins());

    const {publish, subscribe} = useStompClient();

    useEffect(()=>{
        saveAdmins(admins)
    }, [admins])

    

    useEffect(()=>{

        subscribe(`/admins`, (message)=>{
            const body = JSON.parse(message.body);

            const data = (body as ApiResponse).data;

            if(!data) return;

            if (Array.isArray(data)) {
                const _admins = data.filter(_c => _c !== undefined).map((admin) => admin as Admin);
                // We remove this devices admin from the data.
                setAdmins(_admins.filter(_admin => _admin.id !== admin?.id));

                
                // We update this devices admin.
                const _admin = _admins.find(_admin => _admin.id === admin?.id);
                if(!_admin) return;
                _admin['token'] = getCallToken() ?? admin?.token!;
                _admin['tokenExpiration'] = admin?.tokenExpiration!;
                setAdmin(_admin);
                
            } else {
                const adminData = data as Admin;

                if(adminData.id === admin?.id){
                    adminData['token'] = getCallToken() ?? admin?.token!;
                    adminData['tokenExpiration'] = admin?.tokenExpiration!;
                    setAdmin(adminData);
                    return;
                }
                addAdmin(adminData);

            }
        });
        publish(`/scholarly/getAdmins`)

    }, [])

    const addAdmin = useCallback((admin: Admin)=>{
        setAdminsRaw((prevAdmins)=> distinctList([...prevAdmins, admin], 'id', adminsCompareFn))
    }, [])

    const fetch = useCallback(()=>{
        publish(`/scholarly/getAdmins`)
    }, [])

    const setAdmins = useCallback((_admins: Admin[])=>{
        setAdminsRaw(distinctList(_admins, 'id'))        
    }, [])

    const removeAdmins = useCallback((adminId: string)=>{
        const capturedChats = [...admins]
        const filtered = capturedChats.filter(batch => batch.id !== adminId);

        setAdminsRaw(distinctList(filtered, 'id', adminsCompareFn));
    }, [])

    return <AdminsContext.Provider value={{admins, fetch}} >
        {children}
    </AdminsContext.Provider>
}