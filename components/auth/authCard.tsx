import { Button, Typography } from "@mui/material"
import { motion, Variants } from "framer-motion"
import { ChangeEvent, useState } from "react"
import { AiOutlineMail } from "react-icons/ai"
import { BiLockAlt } from "react-icons/bi"
import { handleEmailLogin } from "../../utils/functions/auth"
import { AuthTextField } from "./AuthTextfield"
import { PulseLoader} from 'react-spinners'
import { useAppDispatch } from "../../store/store"
import { setShowLoginDialog } from "../../store/slice/settingSlice"
import Router from "next/router"

interface IAuthCardProps {
    isLogin: boolean,
    toggleType: () => void,
    animateVariant: string,
}

export const AuthCard = (props: IAuthCardProps) => {

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

    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const handleSuccess = () => {
        setLoading(false);
        dispatch(setShowLoginDialog(false));
    } 

    const handleFail = () => {
        setLoading(false);
    }

    const handleOnLogin = async () => {
        // to handle login on this component
        setLoading(true);

        if(!loading){
            await handleEmailLogin({ 
                email: state.email,
                password: state.password,
                handleSuccess: handleSuccess,
                handleFail: handleFail,
                query: Router.query,  
            })
        }
    }

    const handleRenderLogInButton = () => {
        if(loading){
            return <PulseLoader loading={loading} color="#ef5350" size={10}/>
        }
        return props.isLogin ? 'Log In' : 'Sign Up'
    }
    
    return <>
        <motion.div
            animate={props.animateVariant}
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
            <Button variant="outlined" size="large" sx={{ my: 1}} onClick={handleOnLogin}>{handleRenderLogInButton()}</Button>
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