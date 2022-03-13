import { Button, Dialog, DialogContent, Divider, TextField, Typography } from "@mui/material";
import { motion, Variants } from "framer-motion";
import { ChangeEvent, useState } from "react";
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import { BiLock, BiLockAlt } from "react-icons/bi"

import { AuthTextField } from "./AuthTextfield";

export const AuthDialog = () => {
 

    const [isLogin, setIsLogin] = useState(true);



 

    return   <Dialog
    open
    fullWidth
>
    <DialogContent sx={{ display: 'flex', flexDirection: 'column',}}>
   
        <AuthCard isLogin={isLogin} toggleType={() => setIsLogin(!isLogin)} />

        <AuthCard isLogin={!isLogin} toggleType={() => setIsLogin(!isLogin)} />


    

        <Divider style={{width:'100%'}} />

        <Typography>Other Login</Typography>

        <Button sx={{ backgroundColor: 'lightpink', color: '#fff', marginY: 1}}>GOOGLE</Button>
        <Button  sx={{ backgroundColor: 'black',  color: '#fff', marginY: 1}}>APPLE</Button>
        <Button  sx={{ backgroundColor: 'lightblue',  color: '#fff', marginY: 1}}>FACEBOOK</Button>


    </DialogContent>
</Dialog>
}

interface IAuthCardProps {
    isLogin: boolean,
    toggleType: () => void,
}

const AuthCard = (props: IAuthCardProps) => {

    const variants : Variants  = {
        hide: {
            rotateY: 180,
            // opacity: 0,
            display: 'none',
        },
        show: {
            rotateY: 0,
            // opacity: 1,
            display: 'flex',
        }
    }

    const [state, setState] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    })

    const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    return <>
        <motion.div
            animate={props.isLogin ? 'show': 'hide'}
            transition={{ duration: 1, ease: 'easeOut' }}
            variants={variants}
            style={{ display: 'flex', flexDirection: 'column'}}
        >
         <Typography>{ props.isLogin ? 'Login' : 'Sign Up'}</Typography>
            <AuthTextField 
                type="email"
                name="email"
                label="Email"
                value={state.email}
                onChange={handleOnChange}
                icon={<AiOutlineMail />}
            />

            <AuthTextField 
                type="password"
                name="password"
                label="Password"
                value={state.password}
                onChange={handleOnChange}
                icon={<BiLockAlt />}
            />

            {
                !props.isLogin ? 
                    <AuthTextField 
                        type="password"
                        name="confirmPassword"
                        label="Confirm Password"
                        value={state.confirmPassword}
                        onChange={handleOnChange}
                        icon={<BiLockAlt />}
                    /> : null
            }
            <Button variant="outlined" size="large" sx={{ my: 1}}>{props.isLogin ? 'Log In' : 'Sign Up'}</Button>

            {
                props.isLogin 
                ? <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <Button variant="text">Forgot Password?</Button>
                    <Typography>Dont have an account? <Button variant="text" onClick={props.toggleType}>Sign Up</Button></Typography>
                </div>
                :  <div>
                    <Typography>Already have an account? <Button variant="text" onClick={props.toggleType}>Log In</Button></Typography>
                </div>
            }
            
        </motion.div>
    </>
}