import { useEffect, useState } from "react";
import { MenuSelect } from "../../components/menu/menuSelect";
import { MenuTab } from "../../components/menu/MenuTab/index";
import { PublicAppBar } from "../../components/navigation/appbar/appbar";
import { resetUponUnmount } from "../../store/slice/menuSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import MenuSkeleton from "../../components/menu/skeleton";

import { fetchMenu } from "../../utils/functions/menu";
import { SearchBar } from "../../components/navigation/appbar/searchBar";
import { FaSearch } from "react-icons/fa";
import { Fab, IconButton } from "@mui/material";
import { blue } from "@mui/material/colors";
import { setShowSearchBar } from "../../store/slice/settingSlice";

export default function OrderPage (){
    const { expiration } = useAppSelector(state => state.menus)
    const dispatch = useAppDispatch();

    const [ loading, setLoading ] = useState(false);



    useEffect(() => {
        fetchMenu({ setLoading, expiration });

        return () => { dispatch(resetUponUnmount()) }
    }, [])


    return <div style={{ width: '100%', contain: 'paint'}}>
        <Fab 
            color="primary" 
            aria-label="add" sx={{ position: 'fixed', bottom: 20, right: 40, backgroundColor: blue[400]}}
            onClick={() => dispatch(setShowSearchBar(true))}
        >
            <FaSearch size={30}/>
        </Fab>

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