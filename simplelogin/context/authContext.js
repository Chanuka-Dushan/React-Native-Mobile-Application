import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth,db } from "../firebaseConfig";
import { doc,getDoc,setDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
                setUser(user);
                updateUserData(user.uid)
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        });

        return () => unsub(); // Ensure to unsubscribe on unmount
    }, []);

    const updateUserData=async (userId)=>{
        const docRef=doc(db,"users",userId);
        const docSnap=await getDoc(docRef);
        if(docSnap.exists()){
            let data=docSnap.data();
            setUser({...user,...data});
        }
    }

    const login = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            return{success:true};
        } catch (e) {
            let message=e.message;
            if(msg.includes('(auth/invalid-credential)')){
                msg="Wrong Credentials";
                return {success:false,msg};
            }
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            return {success:true};
        } catch (e) {
            return {success:false,msg:e.message,error:e};
        }
    };

    const register = async (email, password, username) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log('response.user : ', response?.user);
            
            await setDoc(doc(db,"users",response?.user?.uid),{
                username,
                userId:response?.user?.uid,
            });
            return {success:true,data:response?.user};
        } catch (e) {
            let msg=e.message;
                if(msg.includes('(auth/email-already-in-use)')){
                    msg="Email is already in use";
                }
            return {success:false,msg:e.message};
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const value = useContext(AuthContext);
    if (!value) {
        throw new Error("useAuth must be used within AuthContextProvider");
    }
    return value;
};
