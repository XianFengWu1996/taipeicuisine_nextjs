import { Box, Typography } from "@mui/material"
import { blue } from "@mui/material/colors"
import { isEmpty } from "lodash"
import { GoFlame } from "react-icons/go"

interface IOrderCartItem {
    item: ICartItem
}
export const OrderCartItem = ({ item }:IOrderCartItem) => {
    return <Box sx={{ display: 'flex', my: 1.5 }}>
        <Box>
            <Typography sx={{ border: '1px solid #000', px: 1, py: 0.5 }}>{item.quantity}</Typography>
        </Box>
        <Box sx={{ ml: 3}}>
            <Typography sx={{ fontSize: 13, fontWeight: 500}}>{item.dish.label_id}.{item.dish.en_name}</Typography>
            <div style={{ display: 'flex'}}>
                <Typography sx={{ fontSize: 13,  fontWeight: 500}}>{item.dish.ch_name} </Typography>
                <Typography sx={{ fontSize: 12,  fontWeight: 600, ml: 3}}> ${item.total}</Typography>
            </div>

            {
             item.option && <Typography sx={{ fontSize: 12,  fontWeight: 600}}>Option: {item.option.en_name} {item.option.ch_name} {item.option.spicy && <GoFlame color="red" />}</Typography>
            }

            {
                item.customize && <>
                    {
                        item.customize.protein.map((protein) => {
                            return <Typography sx={{ fontSize: 12,  fontWeight: 600}} key={protein.id}> · {protein.en_name} {protein.ch_name} +${protein.price}</Typography>
                        })
                    }

                    {
                        item.customize.veggie.map((veggie) => {
                            return <Typography sx={{ fontSize: 12,  fontWeight: 600}} key={veggie.id}> · {veggie.en_name} {veggie.ch_name} +${veggie.price}</Typography>
                        })
                    }
                </>
            }

            {
                item.lunchOption && <Box sx={{ display: 'flex'}}>
                    <Typography sx={{fontSize: '12px', fontWeight: 600, fontStyle: 'italic', color: blue[600] }}>
                            Lunch Option: 
                        {item.lunchOption.sub && 'Hot&Sour soup, '}
                        {item.lunchOption.no_rice && 'No Rice, '} 
                        {item.lunchOption.no_soup && 'No Soup '}
                    </Typography>
                </Box>
            }   

            {!isEmpty(item.comment) && <Typography sx={{ fontSize: 12,  fontWeight: 600}} color='red'>Comments: {item.comment}</Typography>}

   
        </Box>


</Box>
}