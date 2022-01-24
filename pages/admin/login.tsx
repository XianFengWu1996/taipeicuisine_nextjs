import { useState } from "react";
import { signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { fbAuth } from "../_app";
import axios from 'axios';
import Router from 'next/router'
import ResponsiveAppBar from "../../components/appbar";

export default function Login () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return <>
        <ResponsiveAppBar />
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
                type="button" 
                value="Login"
                onClick={ async (e) => {
                  try {
                    e.preventDefault();

                    let user = await signInWithEmailAndPassword(
                        fbAuth, 
                        email,
                        password
                    );

                    let token = await user.user.getIdToken();

                    let response = await axios({ 
                        method: 'POST',
                        withCredentials: true,
                        url: "http://localhost:5001/foodorder-43af7/us-central1/admin/login",
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'application/json',
                            'authorization': `Bearer ${token}`
                        }
                    });

                    if(response.status === 200){
                        Router.push('/admin/dashboard')
                    } 
                  } catch (error) {
                    signOut(fbAuth); // if the operation failed, sign the user out
                    console.log(error);
                  }
                }}
            />
               
        </form>

        <input type="button" value="getuser" onClick={(_) => {
            console.log(fbAuth.currentUser);
        }}/>
    </> 
}

// export const getServerSideProps:GetServerSideProps = async(context: GetServerSidePropsContext) => {
//     try {
//         let token = await fbAuth.currentUser?.getIdToken();

//         console.log(token);

//         let response = await axios({ 
//             method: 'POST',
//             url: "http://localhost:5001/foodorder-43af7/us-central1/store/admin/login",
//             headers: {
//                 'Access-Control-Allow-Origin': '*',
//                 'Content-Type': 'application/json',
//                 'authorization': `Bearer ${token}`
//             }
//         });

//         if(response.status === 200){
//             Router.push('/admin/dashboard');
//         }
//     } catch (error) {
//         signOut(fbAuth);
//         console.log(error);
//     }
    
//     return {    
//       props: {}, // will be passed to the page component as props
//     }
//   }