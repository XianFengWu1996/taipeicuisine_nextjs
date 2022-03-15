import { Grid, Skeleton } from "@mui/material";
import { Box, styled } from "@mui/system";
import { MenuSelect } from "../../components/menu/menuSelect";

export default function MenuSkeleton () {
    let list: number[] = [1,2,3,4,5,6];

    const SelectContainer = styled(Box)(({theme}) => ({
        padding: '0 80px',
        width: '50vw',

        [theme.breakpoints.down('md')]: {
            padding: '0 50px',
            width: '65vw',
        },

        [theme.breakpoints.down('sm')]: {
            width: '100vw',
            padding: '0 20px',
        },
    }))

    const MenuItemContainer = styled(Grid)(({ theme }) => ({
        padding: '15px 80px',

        [theme.breakpoints.down('md')]: {
            padding: '15px 50px',
        },

        [theme.breakpoints.down('sm')]: {
            padding: '15px',
        },
    }))
    
    return <>
        <SelectContainer>
            <Skeleton width={'100%'}>
                <MenuSelect />
            </Skeleton>
        </SelectContainer>

        <Skeleton 
            variant="rectangular"
            height={50} 
            width={'100%'}
            sx={{ marginY: 1}}
        />

        <MenuItemContainer container spacing={2} >
            {
                list.map((_, index) => {
                    return <Grid item xs={12} md={6} key={index}> 
                        <Skeleton 
                            variant="rectangular"
                            height={120} 
                        />
                    </Grid>
                })
            }
    
        </MenuItemContainer>        
    </>
}