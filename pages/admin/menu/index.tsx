import { SelectChangeEvent } from "@mui/material";
import axios from "axios"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import React, { useEffect } from "react";
import { MenuSelect } from "../../../components/admin/menu/menuSelect";
import { MenuTab } from "../../../components/admin/menu/menuTab";
import ResponsiveAppBar from "../../../components/appbar";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { AdminState, getInitialMenuData } from "../../../store/slice/adminSlice";

interface IProps {
    menus: IMenu[],
    error?: {
        msg: string
    }
}

export default function Menu (props:IProps){
    const dispatch = useAppDispatch();
    const admin:AdminState = useAppSelector(state => state.admin)
    const menus = admin.menus;

    const [menuLabel, setMenuLabel] = React.useState(props.menus[0].en_name ?? '');
    const [tabValue, setTabValue] = React.useState(0);

    // handles if the user change the menu
    const handleMenuChange = (e: SelectChangeEvent) => {
        setMenuLabel(e.target.value);
        setTabValue(0);
    };

    // handles if the user change the tab
    const handleTabChange = (_: React.SyntheticEvent<Element, Event>, newValue: number) => {
        setTabValue(newValue);
    };

    useEffect(() => {
        dispatch(getInitialMenuData(props.menus));
    }, [])

    return <div>
        <ResponsiveAppBar />
        <MenuSelect 
            value={menuLabel}
            handleChange={handleMenuChange}
            menus={menus}
        />
        <MenuTab
            menus={menus}
            menuSelect={menuLabel}
            tabValue={tabValue}
            handleTabChange={handleTabChange}
        />
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