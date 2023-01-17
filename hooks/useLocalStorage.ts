import { useEffect } from 'react';
import { useState } from 'react';
export function useLocalStorage<T>(key:string, initialValue:T | (()=>T)){
    
    const[value, setValue] = useState<T>(()=>{
        if(typeof window!=="undefined"){
            const jsonValue = localStorage.getItem(key);
            if(jsonValue != null) return JSON.parse(jsonValue)
            if(typeof initialValue === "function"){
               // return initialValue() //not callable
                return (initialValue as ()=> T)() // function that return the type of T 
            }else{
                return initialValue
            }
        }
       
    })

    useEffect(()=>{
        if(typeof window!=='undefined'){
            localStorage.setItem(key, JSON.stringify(value))
        }
    }, [key, value])

    return [value, setValue] as [typeof value, typeof setValue]
}