import { Button, Typography } from "@mui/material"
import { motion, Variants } from "framer-motion"
import { ChangeEvent, useState } from "react"
import { AiOutlineMail } from "react-icons/ai"
import { BiLockAlt } from "react-icons/bi"
import {  handleEmailLogin, handleSignUp } from "../../utils/functions/auth"
import { AuthTextField } from "./AuthTextfield"
import { PulseLoader} from 'react-spinners'
import { useAppDispatch } from "../../store/store"
import { setShowLoginDialog } from "../../store/slice/settingSlice"
import { ForgotPassword } from "./forgotPassword"
import { handleCatchError } from "../../utils/errors/custom"
import snackbar from "../snackbar"

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

    const handleOnLogin = async () => {
      try {
          // to handle login on this component
          setLoading(true);

          if(!loading){
              if(props.isLogin){
                  await handleEmailLogin({ 
                      email: state.email,
                      password: state.password,
                  })
                  dispatch(setShowLoginDialog(false));
              } else {
                  if(state.password !== state.confirmPassword){
                    throw new Error('Password does not match');
                  }
                  await handleSignUp({ email: state.email, password: state.password})
                  snackbar.success("You've successfully signed up, please verify your email")
                  dispatch(setShowLoginDialog(false));
              }
          }
      } catch (error) {
            handleCatchError(error as Error, `${props.isLogin ? 'Failed to Login' : 'Failed to signup'}`)
      } finally {
            setLoading(false);
      }
    }

    const handleRenderLogInButton = () => {
        if(loading){
            return <PulseLoader loading={loading} color="#ef5350" size={10}/>
        }
        return props.isLogin ? 'Log In' : 'Sign Up'
    }
    

    const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);
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
                ? <>
                    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                        <Button variant="text" onClick={() => setShowForgotPassword(!showForgotPassword)}>Forgot Password?</Button>
                        <Typography>Dont have an account? <Button variant="text" onClick={props.toggleType}>Sign Up</Button></Typography>
                    </div>

                    { showForgotPassword && <ForgotPassword onClose={() => setShowForgotPassword(false)}/> }
                </>
                :  <div>
                    <Typography>Already have an account? <Button variant="text" onClick={props.toggleType}>Log In</Button></Typography>
                </div>
            }
            
        </motion.div>
    </>
}
