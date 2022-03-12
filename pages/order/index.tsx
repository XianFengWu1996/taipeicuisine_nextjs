import { Button, Dialog, DialogContent, Divider, TextField, Typography } from "@mui/material";
import axios from "axios";
import { motion, Variants } from "framer-motion";
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { AuthDialog } from "../../components/auth/authDialog";
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


    return <div style={{ width: '100%'}}>
        <PublicAppBar />
        <MenuSelect />
        <MenuTab />

        <AuthDialog />
      
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