import { Card, CardContent, Typography } from "@mui/material"
import { blue } from "@mui/material/colors"
import { styled } from "@mui/system"
import { isEmpty } from "lodash"
import { GoFlame } from "react-icons/go"

interface ISummaryItemProps {
    item: ICartItem
}

const NameText = styled(Typography)(({ theme }) => ({
    fontSize: '13.5px',
    fontWeight: 500,
    wordSpacing: 1,
    [theme.breakpoints.down('sm')]: {
        fontSize: '11.5px',
    }
}))

const OptionText = styled(Typography)(() => ({
    fontSize: '12px',
    fontWeight: 600,
    fontStyle: 'italic'
})) 

const CommentText = styled(Typography)(() => ({
    fontSize: '12px',
    fontWeight: 600,
    fontStyle: 'italic',
    color: 'red'
}))

const CountPriceText = styled(Typography)(({ theme }) => ({
    fontSize: '15px',
    fontWeight:600,
    [theme.breakpoints.down('sm')]: {
        fontSize: '11.5px',
    }
}))


export const SummaryItem = ({ item } : ISummaryItemProps)  => {
    const opt = item.lunchOption;

    return  <Card sx={{ my: 1.5}}>
        <CardContent sx={{ display: 'flex'}}>
            <div style={{ flex: 1}}>
                <CountPriceText>x {item.quantity}</CountPriceText>
            </div>
            <div style={{ flex: 6, marginRight: '5px'}}>
                <NameText> {item.dish.label_id}. {item.dish.en_name} {item.dish.ch_name} {isEmpty(item.option) && (item.dish.is_spicy &&  <GoFlame color="red"/>) }</NameText>
                {
                    !isEmpty(item.option) && <OptionText>Option: {item.option.en_name} {item.option.ch_name} {item.option.spicy ? <GoFlame color="red"/>: null}</OptionText> 
                }

                {
                    (opt && (opt.sub || opt.no_rice || opt.no_soup) ) && <Typography sx={{fontSize: '12px', fontWeight: 600, fontStyle: 'italic', color: blue[600] }}>
                            Lunch Option: 
                        {opt.sub && 'Hot&Sour soup, '}
                        {opt.no_rice && 'No Rice, '} 
                        {opt.no_soup && 'No Soup '}
                    </Typography>
                }

                {
                    !isEmpty(item.comment) && <CommentText>Comments: {item.comment}</CommentText>
                }

                {
                    item.customize && <>
                        {
                            item.customize.protein.map((protein) => {
                                return <Typography key={protein.id} sx={{ fontSize: 11, fontWeight:600}}> · Extra {protein.en_name} 加{protein.ch_name} +${protein.price}</Typography>
                            })
                        }

                        {
                            item.customize.veggie.map((veggie) => {
                                return <Typography key={veggie.id} sx={{ fontSize: 11, fontWeight:600}}> · Extra {veggie.en_name} 加{veggie.ch_name} +${veggie.price}</Typography>
                            })
                        }
                    </>
                }
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'end'}}>
                <CountPriceText>${item.total.toFixed(2)}</CountPriceText>
            </div>
        </CardContent>
    </Card>
}