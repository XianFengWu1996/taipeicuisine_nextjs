import { Typography } from "@mui/material"
import { styled } from "@mui/system"
import { isEmpty } from "lodash"

interface ISummaryItemProps {
    item: ICartItem
}

const NameText = styled(Typography)(() => ({
    fontSize: '13.5px',
    fontWeight: 500,
    wordSpacing: 1
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


export const SummaryItem = ({ item } : ISummaryItemProps)  => {
    return  <div style={{ display: 'flex', marginBottom: '3px'}}>
    <div style={{ width: '10%'}}>
        <Typography variant="subtitle2">x {item.quantity}</Typography>
    </div>
    <div style={{ width: '80%'}}>
        <NameText>{item.dish.label_id}. {item.dish.en_name} {item.dish.ch_name}</NameText>
        {
            !isEmpty(item.option) 
                ? <OptionText>Option: {item.option.en_name} {item.option.ch_name}</OptionText> 
                : null
        }

        {
            !isEmpty(item.comment) 
                ?  <CommentText>{item.comment}</CommentText>
                : null
        }
    </div>
    <div style={{ width: '10%', display: 'flex', justifyContent: 'end'}}>
        <Typography variant="subtitle2">${item.total.toFixed(2)}</Typography>
    </div>

</div>
}