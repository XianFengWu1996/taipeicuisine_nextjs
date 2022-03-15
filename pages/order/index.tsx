import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { useEffect } from "react";
import { MenuSelect } from "../../components/menu/menuSelect";
import { MenuTab } from "../../components/menu/menuTab";
import { PublicAppBar } from "../../components/order/appbar/appbar";
import snackbar from "../../components/snackbar";
import { getInitialMenuData } from "../../store/slice/menuSlice";
import { useAppDispatch } from "../../store/store";


interface IOrderPageProps {
    menus: IMenu[],
    expiration: number,
    error?: string,
}

export default function OrderPage (props: IOrderPageProps){
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(props.error){
            snackbar.error(props.error);
            return;
        }

        if(props.menus){
            dispatch(getInitialMenuData({ menus: props.menus, expiration: props.expiration }))
        }
    }, [])


    return <div style={{ width: '100%'}}>
        <PublicAppBar />
        <MenuSelect />
        <MenuTab />      
    </div>
}

export const getServerSideProps:GetServerSideProps = async(ctx: GetServerSidePropsContext) => {
    try {

        let response = await axios.get('http://localhost:5001/foodorder-43af7/us-central1/store/menus');

        let menus: IMenu[] = [];
        menus.push(response.data.special)
        menus.push(response.data.fullday);
        menus.push(response.data.lunch);

        return {
            props: { menus, expiration: response.data.expiration }
        }   

    } catch (error) {
        return {
            props: {
                error: 'Failed to get menu, please refresh the page'
            }
        }
    }     
}