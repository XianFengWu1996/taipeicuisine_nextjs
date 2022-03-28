import axios from "axios";
import { useEffect, useState } from "react";
import { MenuSelect } from "../../components/menu/menuSelect";
import { MenuTab } from "../../components/menu/menuTab";
import { PublicAppBar } from "../../components/appbar/appbar";
import snackbar from "../../components/snackbar";
import { getInitialMenuData, resetUponUnmount } from "../../store/slice/menuSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import MenuSkeleton from "../../components/menu/skeleton";

import { hasExpired } from '../../utils/functions/time'

export default function OrderPage (){
    const { expiration } = useAppSelector(state => state.menus)
    const dispatch = useAppDispatch();

    const [ loading, setLoading ] = useState(false);

    const fetchMenu = async () => {
        try {
            setLoading(true);

            if(hasExpired(expiration)){
                let response = await axios.get(`${process.env.NEXT_PUBLIC_CF_URL}/store/menus`);
    
                let menus: IMenu[] = [];
                menus.push(response.data.special)
                menus.push(response.data.fullday);
                menus.push(response.data.lunch);
                
                dispatch(getInitialMenuData({ menus: menus, expiration: response.data.expiration }))
            }
        } catch (error) {
            snackbar.error((error as Error).message ?? 'Failed to fetch menu');
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        fetchMenu();

        return () => {
            dispatch(resetUponUnmount())
        }
    }, [])

    


    return <div style={{ width: '100%', contain: 'paint'}}>
        <PublicAppBar />

        {
            loading
                ? <MenuSkeleton /> 
                : <>
                    <MenuSelect />
                    <MenuTab />  
                </>
        }
        
    </div>
}

// export const getServerSideProps:GetServerSideProps = async(ctx: GetServerSidePropsContext) => {
   
// }