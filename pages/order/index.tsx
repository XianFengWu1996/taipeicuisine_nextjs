import { useEffect, useState } from "react";
import { MenuSelect } from "../../components/menu/menuSelect";
import { MenuTab } from "../../components/menu/MenuTab/index";
import { PublicAppBar } from "../../components/navigation/appbar/appbar";
import { resetUponUnmount } from "../../store/slice/menuSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import MenuSkeleton from "../../components/menu/skeleton";

import { fetchMenu } from "../../utils/functions/menu";

export default function OrderPage (){
    const { expiration } = useAppSelector(state => state.menus)
    const dispatch = useAppDispatch();

    const [ loading, setLoading ] = useState(false);



    useEffect(() => {
        fetchMenu({ setLoading, expiration });

        return () => { dispatch(resetUponUnmount()) }
    }, [])


    return <div style={{ width: '100%', contain: 'paint'}}>
        <PublicAppBar />

        {
            loading ? <MenuSkeleton /> 
            :   <>
                    <MenuSelect />
                    <MenuTab />  
                </>
        }
        
    </div>
}