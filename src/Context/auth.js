import { useState, createContext , useEffect  } from "react";
import { db, auth } from "../services/FireBaseConectio";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { doc,getDoc,setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

export const AuthContext = createContext({})


function AuthProvider({children}){
    const [user, setUser] = useState(null)
    const [loadingAuth, setloadingAuth] = useState(false)
    const [loading, setloading] = useState(true)
    
    const navigate = useNavigate()

    useEffect(()=>{
async function loadUser() {
    const storageUser = localStorage.getItem('@ticketsPro')
    if(storageUser){
        setUser(JSON.parse(storageUser))
        setloading(false)
    }
     setloading(false)
}

loadUser()
    }, [])

    async function login(email,senha){
        setloadingAuth(true)
        await signInWithEmailAndPassword(auth, email, senha)
        .then( async (valeu)=>{
            let uid = valeu.user.uid
            const docRef = doc(db, "users", uid)
            const docSnap = await getDoc(docRef)
            let data = {
            uid: uid,
            nome: docSnap.data().nome,
            email: valeu.user.email,
            avartarUrl: docSnap.data().avartarUrl
        };
        setUser(data)
        storageUser(data)
        setloadingAuth(false)
         navigate('/dashboard');
        toast.success('Bem-vindo(a) de volta!')
        })
        .catch((error) =>{
            console.error(error);
            setloadingAuth(false)
            toast.error('Ops algo deu errando')
            
        })
    }

   async function SignUp(email, senha, nome) {
    setloadingAuth(true);
    try {
        const valeu = await createUserWithEmailAndPassword(auth, email, senha);
        const uid = valeu.user.uid;

        const userData = {
            nome: nome,
            avartarUrl: null
        };

        await setDoc(doc(db, "users", uid), userData);

        const data = {
            uid: uid,
            nome: nome,
            email: valeu.user.email,
            avartarUrl: null
        };

        setUser(data);
        storageUser(data);
        navigate('/dashboard');
        toast.success('Seja Bem-vindo(a) ao sistema')

    } catch (error) {
        console.error(error);
    } finally {
        setloadingAuth(false);
    }
}

function storageUser(data) {
    localStorage.setItem('@ticketsPro', JSON.stringify(data));
}

async function logout(){
    await signOut(auth)
    localStorage.removeItem('@ticketsPro')
    setUser(null)
    
}

    return(
       <AuthContext.Provider value={{
        signed:!!user,
        user,
        login,
        SignUp,
        loadingAuth,
        loading,
        logout,

       }}>
        {children}
       </AuthContext.Provider> 
    )
}


export default AuthProvider;