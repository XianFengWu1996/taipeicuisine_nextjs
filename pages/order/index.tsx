import { Button, Dialog, DialogContent, Divider, TextField, Typography } from "@mui/material";
import axios from "axios";
import { motion, Variants } from "framer-motion";
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { MenuSelect } from "../../components/menu/menuSelect";
import { MenuTab } from "../../components/menu/menuTab";
import { PublicAppBar } from "../../components/order/appbar/appbar";
import { getInitialMenuData } from "../../store/slice/menuSlice";
import { useAppDispatch } from "../../store/store";


interface IOrderPageProps {
    menus: IMenu[],
    expiration: number,
}

export default function OrderPage (props: IOrderPageProps){
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(props.menus){
            dispatch(getInitialMenuData({ menus: props.menus, expiration: props.expiration }))
        }
    })

    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [confirmPass, setConfirmPass] = useState('');
    const [state, setState] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    })

    const [isLogin, setIsLogin] = useState(true);

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

    const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    return <div style={{ width: '100%'}}>
        <PublicAppBar />
        <MenuSelect />
        <MenuTab />

        <Dialog
            open
            fullWidth
        >
            <DialogContent sx={{ display: 'flex', flexDirection: 'column',}}>
                <motion.div
                    animate={isLogin ? 'show': 'hide'}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    variants={variants}
                    style={{ display: 'flex', flexDirection: 'column'}}
                >
                    <Typography>Login</Typography>
                    <TextField
                        type={'email'}
                        variant="outlined"
                        label="Email"
                        name="email"
                        required
                        sx={{ marginY: 1.5}}
                        value={state.email}
                        onChange={handleOnChange}
                    />

                    <TextField
                        type={'password'}
                        variant="outlined"
                        label="Password"
                        name="password"
                        required
                        sx={{ marginY: 1.5}}
                        value={state.password}
                        onChange={handleOnChange}
        
                    />

                    <Button variant="outlined" sx={{ my: 1}}>Login</Button>

                    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                        <Button variant="text">Forgot Password?</Button>
                        <Typography>Dont have an account? <Button variant="text" onClick={() => setIsLogin(!isLogin)}>Sign Up</Button></Typography>
                    </div>
                </motion.div>

                <motion.div
                    animate={isLogin ? 'hide': 'show'}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    variants={variants}
                    style={{ display: 'flex', flexDirection: 'column'}}
                >
                    <Typography>Sign Up</Typography>
                    <TextField
                        type={'email'}
                        variant="outlined"
                        label="Email"
                        name="email"
                        required
                        sx={{ marginY: 1.5}}
                        value={state.email}
                        onChange={handleOnChange}
                    />

                    <TextField
                        type={'password'}
                        variant="outlined"
                        label="Password"
                        name="password"
                        required
                        sx={{ marginY: 1.5}}
                        value={state.password}
                        onChange={handleOnChange}
                    />

                    <TextField
                        type={'password'}
                        variant="outlined"
                        label="Confirm Password"
                        name="confirmPassword"
                        required
                        sx={{ marginY: 1.5}}
                        value={state.confirmPassword}
                        onChange={handleOnChange}
                    />

                    <Button variant="outlined">Sign Up</Button>

                    <div>
                        Already have an account? <Button variant="text" onClick={() => setIsLogin(!isLogin)}>Log In</Button>
                    </div>
                </motion.div>


            

                <Divider style={{width:'100%'}} />

                <Typography>Other Login</Typography>

                <Button sx={{ backgroundColor: 'lightpink', color: '#fff', marginY: 1}}>GOOGLE</Button>
                <Button  sx={{ backgroundColor: 'black',  color: '#fff', marginY: 1}}>APPLE</Button>
                <Button  sx={{ backgroundColor: 'lightblue',  color: '#fff', marginY: 1}}>FACEBOOK</Button>


            </DialogContent>
        </Dialog>
    </div>
}

// export const getServerSideProps:GetServerSideProps = async(ctx: GetServerSidePropsContext) => {
//     let response = await axios.get('http://localhost:5001/foodorder-43af7/us-central1/store/menus');
//     if(response.status !== 200){
//         throw new Error('Failed to get store data')
//     }

//     let menus: IMenu[] = [];
//     menus.push(response.data.special)
//     menus.push(response.data.fullday);
//     menus.push(response.data.lunch);

//     return {
//         props: { menus, expiration: response.data.expiration }
//     }     
// }