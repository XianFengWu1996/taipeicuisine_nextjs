import { AppBar } from "@mui/material";
import axios from "axios"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import React from "react";
import { Fullday } from "../../components/admin/menu/fullday";
import ResponsiveAppBar from "../../components/appbar";
// import { Special } from "../../components/admin/menu/special";

interface IProps {
    fullday: ICategory[],
    lunch: ICategory[],
    special: IDish[],
    error?: {
        msg: string
    }
}



export default function Menu (props:IProps){

    // return <div style={{ margin: '10px 20px'}}>
    //     <Special special={props.special} title={'MOST POPULAR'}/>
    // </div>
  

    return <div>
        <ResponsiveAppBar />
        <Fullday fullday={props.fullday}/>
    </div>
}

export const getServerSideProps:GetServerSideProps = async(ctx: GetServerSidePropsContext) => {
    try{        
        let response = await axios.get('http://localhost:5001/foodorder-43af7/us-central1/store/menus');

        if(response.status !== 200){
            throw new Error('Failed to get store data')
        }

        return {
            props: {
                fullday: response.data.fullday,
                lunch: response.data.lunch,
                special: response.data.special,
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