import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import {Slot, useSegments,useRouter} from "expo-router";
import "../global.css"
import { AuthContextProvider ,useAuth} from '../context/authContext';

const MainLayout=()=>{
    const{isAuthenticated}=useAuth();
    const segment=useSegments();
    const router=useRouter();

    useEffect(()=>{
        if(typeof isAuthenticated==="undefined")return;
        const inApp=segment[0]=='(app)';
        if(isAuthenticated && !inApp){
            router.replace('mainPage')
        }else if(isAuthenticated==false){
            router.replace('signIn');
        }

    },[isAuthenticated]);

    return <Slot/>
}

export default function RootLayout(){
    return(
        <AuthContextProvider>
            <MainLayout/>
        </AuthContextProvider>
    )
}


