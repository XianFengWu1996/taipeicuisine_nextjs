import axios from "axios"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import React, { useEffect } from "react";
import { MenuSelect } from "../../../components/menu/menuSelect";
import { MenuTab } from "../../../components/menu/menuTab";
import ResponsiveAppBar from "../../../components/admin/appbar";
import { useAppDispatch } from "../../../store/store";
import { getInitialMenuData } from "../../../store/slice/menuSlice";
import { handleAdminNotAuthRedirect, checkTokenInToken } from "../../../utils/functions/errors";
import { isNotAuthError } from "../../../utils/errors/custom";
import { hasExpired } from "../../../utils/functions/time";

interface IMenuProps {
    menus: IMenu[],
    expiration: number,
    error: {
        msg: string,
        code: number
    }
}

export default function Menu ({ menus, error, expiration }:IMenuProps){
    const dispatch = useAppDispatch();

    useEffect(() => {        
        handleAdminNotAuthRedirect(error);
        if(menus){
            dispatch(getInitialMenuData({
                menus: menus ?? [],
                expiration: expiration
            }));
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
        if(checkTokenInToken(ctx.req.headers.cookie)){
            return checkTokenInToken(ctx.req.headers.cookie)!
        }
        
        if(ctx.query.expiration){
            // proceed and check if the menu has expired
            if(!hasExpired(Number(ctx.query.expiration))){
                // return an empty props
                return { props: {} }
            }
        }

        let response = await axios.get('http://localhost:5001/foodorder-43af7/us-central1/store/menus');
        if(response.status !== 200){
            throw new Error('Failed to get store data')
        }

        let menus: IMenu[] = [];
        menus.push(response.data.fullday);
        menus.push(response.data.lunch);

        return {
            props: { menus, expiration: response.data.expiration }
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