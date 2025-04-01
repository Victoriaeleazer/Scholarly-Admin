
import React, { createContext, useCallback, useContext, useEffect, useState } from "react"
import { useStompClient } from "./StompClientContext";
import {ApiResponse} from '../interfaces/ApiResponse';
import { getBatches, saveMyBatches, saveBatches, getMyBatches} from "../services/user-storage";
import { distinctList } from "../utils/ArrayUtils";
import {Batch} from "../interfaces/Batch";
import { useParams } from "react-router";
import { useAdmin } from "./AdminProvider";

interface BatchesAPI {
    batches: Batch[],
    myBatches: Batch[],
    setBatches: (batches: Batch[]) => void,
    addBatch: (batce: Batch) => void,
    removeBatch: (batchId: string) => void,
}

const BatchesContext = createContext<BatchesAPI | null>(null);

/**
 * Responsible for reading, adding and overwriting batches globally within the app.
 * 
 * Must be used within `BatchesProvider`
 * @author Teninlanimi Taiwo
 */
export const useBatches = (): BatchesAPI =>{
    const context = useContext(BatchesContext);

    if(!context){
        throw new Error("useBatches must be used within BatchesProvider");
    }

    return context;
}

/**
 * Responsible for reading or listening to an batches on the `batchId`.
 * This can be used anywhere.
 * 
 * Must be used within `BatchesProvider`
 * @author Teninlanimi Taiwo
 */
export const useBatch = (batchId: string) : Batch =>{
    const context = useContext(BatchesContext);

    if(!context){
        throw new Error("useBatch must be used withing BatchesProvider");
    }

    const event = context.batches.find(chat => chat.id === batchId);

    if(!event){
        throw new Error("Batch couldn't be found");
    }

    return event;
}

const batchesCompareFn = (a:Batch, b:Batch)=> (new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

/**
 * Provider responsible for exposing batches context in the app globally.
 * Listens to batch websockets and updates them
 * Must be used within the `AdminProvider` & `StompClientProvider` component
 * @author Teninlanimi Taiwo
 */
export function BatchesProvider({children}: {children?: React.JSX.Element}){
    const {subscribe, publish} = useStompClient();


    const [batches, setBatchesRaw] = useState<Batch[]>(getBatches())

    const [myBatches, setMyBatchesRaw] = useState<Batch[]>(getMyBatches());


    const {admin} = useAdmin();

    // To initialize the events from local storage
    useEffect(()=>{
        setBatches(getBatches())
        setMyBatches(getMyBatches())
    }, [])

    useEffect(()=>{
        saveBatches(batches);
    }, [batches])
    useEffect(()=>{
        saveMyBatches(myBatches);
    }, [myBatches])

    

    useEffect(()=>{      

        subscribe(`/batches`, (message)=>{
            const body = JSON.parse(message.body);

            const data = (body as ApiResponse).data;

            console.log(`Got batches`, data);

            if(!data) return;

            if (Array.isArray(data)) {
                const _chats = data.filter(_c => _c !== undefined).map((chat) => chat as Batch);
                setBatches(_chats);
            } else {
                const chatData = data as Batch;
                addBatch(chatData);
            }
        });

        subscribe(`/batches/${admin?.id}`, (message)=>{
            const body = JSON.parse(message.body);

            const data = (body as ApiResponse).data;

            console.log(`Got Your Batches:`, data);

            if(!data) return;

            if (Array.isArray(data)) {
                const _chats = data.filter(_c => _c !== undefined).map((chat) => chat as Batch);
                setBatches(_chats);
            } else {
                const chatData = data as Batch;
                addBatch(chatData);
            }
        });

        publish(`/scholarly/getBatches/${admin?.id}`)
        publish(`/scholarly/getBatches`)

    }, [admin])
    
    const addBatch = useCallback((batch: Batch)=>{
        setBatchesRaw((prevEvents)=> distinctList([...prevEvents, batch], 'id', batchesCompareFn))

    }, [])

    const setBatches = useCallback((_batches: Batch[])=>{
        setBatchesRaw(distinctList(_batches, 'id'))        
    }, [])

    const setMyBatches = useCallback((_batches: Batch[])=>{
        setMyBatchesRaw(distinctList(_batches, 'id'))        
    }, [])

    const removeBatch = useCallback((batchId: string)=>{
        const capturedChats = [...batches]
        const filtered = capturedChats.filter(batch => batch.id !== batchId);

        setBatchesRaw(distinctList(filtered, 'id', batchesCompareFn));
    }, [])

    return <BatchesContext.Provider value={{  batches, myBatches, addBatch, setBatches, removeBatch}}>
        {children}
    </BatchesContext.Provider>
}