import { MouseEventHandler, useState } from "react";
import { signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { fbAuth } from "../_app";
import axios from 'axios';
import Router from 'next/router'
import showSnackbar from '../../components/snackbar'
import { useStore } from "react-redux";

export default function Login () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const adminStore = useStore().getState().admin;

    const login:MouseEventHandler<HTMLInputElement> | undefined = async (e) => {
        try {
            e.preventDefault();

            let user = await signInWithEmailAndPassword(fbAuth, email, password)
            .catch((_) => {
                throw new Error('Please check your email or password')
            });

            let token = await user.user.getIdToken();

            let response = await axios.post("http://localhost:5001/foodorder-43af7/us-central1/admin/login",
            {},{
                headers: { 'authorization': `Bearer ${token}`}
            }).catch((_) => {
                throw new Error('Not authorized')
            });

            console.log(response);

            if(response.status === 200){
                Router.push('/admin/dashboard')
            } 

          } catch (error) {
            signOut(fbAuth); // if the operation failed, sign the user out
            showSnackbar.error((error as Error).message ?? 'Authentication Failed')
          }
    }

    return <>
        <div>{ adminStore.counter }</div>
        <form>
            <input 
                type="text" 
                placeholder="email" 
                onChange={(event) => {
                    setEmail(event.target.value);
                }}/>
            <input 
                type="password" 
                placeholder="password" 
                onChange={(event) => {
                    setPassword(event.target.value);
                }}/>
            <input 
                type="submit" 
                value="Login"
                onClick={login}
            />  
        </form>
    </> 
}