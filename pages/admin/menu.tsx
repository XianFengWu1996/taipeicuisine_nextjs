import { SelectChangeEvent } from "@mui/material";
import axios from "axios"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import React from "react";
import { MenuSelect } from "../../components/admin/menu/menuSelect";
import { MenuTab } from "../../components/admin/menu/menuTab";
import ResponsiveAppBar from "../../components/appbar";

interface IProps {
    menus: IMenu[],
    error?: {
        msg: string
    }
}

export default function Menu (props:IProps){
    const [menu, setMenu] = React.useState(props.menus[0].en_name);

    // handles if the user change the menu
    const handleMenuChange = (_: SelectChangeEvent) => {
      setMenu(_.target.value);
    };

 

    return <div>
        <ResponsiveAppBar />
        <MenuSelect 
            value={menu}
            handleChange={handleMenuChange}
            menus={props.menus}
        />
        <MenuTab
            menus={props.menus}
            menuSelect={menu}
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