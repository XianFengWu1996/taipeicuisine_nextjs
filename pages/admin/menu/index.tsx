import { SelectChangeEvent } from "@mui/material";
import axios from "axios"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import React, { useEffect } from "react";
import { MenuSelect } from "../../../components/admin/menu/menuSelect";
import { MenuTab } from "../../../components/admin/menu/menuTab";
import ResponsiveAppBar from "../../../components/appbar";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { getInitialMenuData, handleOnMenuChange, handleOnTabChange, MenuState } from "../../../store/slice/menuSlice";

interface IProps {
    menus: IMenu[],
    error?: {
        msg: string
    }
}

export default function Menu (props:IProps){
    const dispatch = useAppDispatch();
    const menus: MenuState = useAppSelector(state => state.menus)

    // handles if the user change the menu
    const handleMenuChange = (e: SelectChangeEvent) => {
        console.log(e.target.value);
    };

    // handles if the user change the tab
    const handleTabChange = (_: React.SyntheticEvent<Element, Event>, newValue: number) => {
        console.log(newValue);
        dispatch(handleOnTabChange(newValue));
    };

    useEffect(() => {
        dispatch(getInitialMenuData(props.menus));
    }, [])

    return <div>
        <ResponsiveAppBar />
        <MenuSelect />
        {/* <MenuTab
            menus={menus.menus}
            menuSelect={menus.currentSelectedMenu}
            tabValue={menus.currentSelectedTab}
            handleTabChange={handleTabChange}
        /> */}
    </div>
}

export const getServerSideProps:GetServerSideProps = async(ctx: GetServerSidePropsContext) => {
    try{        
        let response = await axios.get('http://localhost:5001/foodorder-43af7/us-central1/store/menus');

        if(response.status !== 200){
            throw new Error('Failed to get store data')
        }

        let menus: IMenu[] = [];
        menus.push(response.data.special);
        menus.push(response.data.fullday);
        menus.push(response.data.lunch);

        return {
            props: {
                menus
            }
        }      
    } catch (error) {
        return {
            props: {
                error: {
                    msg: (error as Error).message ?? 'Authentication fail'
                }
            }
        }
    }
}