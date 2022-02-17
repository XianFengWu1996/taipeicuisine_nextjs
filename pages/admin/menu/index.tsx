import axios from "axios"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import React, { useEffect } from "react";
import { MenuSelect } from "../../../components/admin/menu/menuSelect";
import { MenuTab } from "../../../components/admin/menu/menuTab";
import ResponsiveAppBar from "../../../components/appbar";
import { useAppDispatch } from "../../../store/store";
import { getInitialMenuData } from "../../../store/slice/menuSlice";
import { handleAdminNotAuthRedirect, serverSideCheckAuth } from "../../../utils/functions/errors";
import { isNotAuthError } from "../../../components/error/custom";

interface IProps {
    menus: IMenu[],
    error: {
        msg: string,
        code: number
    }
}

export default function Menu ({ menus, error }:IProps){
    const dispatch = useAppDispatch();

    useEffect(() => {
        handleAdminNotAuthRedirect(error);
        if(menus){
            dispatch(getInitialMenuData(menus));
        }
    }, [])

    return <div>
        <ResponsiveAppBar />
        <MenuSelect />
        <MenuTab />
    </div>
}

export const getServerSideProps:GetServerSideProps = async(ctx: GetServerSidePropsContext) => {
    try{        
        serverSideCheckAuth(ctx.req.headers.cookie);

        let response = await axios.get('http://localhost:5001/foodorder-43af7/us-central1/store/menus');

        console.log('should not run because no cookie')
        if(response.status !== 200){
            throw new Error('Failed to get store data')
        }

        let menus: IMenu[] = [];
        menus.push(response.data.fullday);
        menus.push(response.data.lunch);

        return {
            props: { menus }
        }      
    } catch (error) {
        return {
            props: {
                error: {
                    msg: (error as Error).message ?? 'Authentication fail',
                    code: isNotAuthError(error as Error) ? 401 : 400
                }
            }
        }
    }
}