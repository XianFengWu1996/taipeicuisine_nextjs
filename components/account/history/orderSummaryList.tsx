import { Divider, Typography } from "@mui/material"
import { TitleText } from "./orderContact"

interface IOrderSummaryList {
    is_delivery: boolean, 
    summary: IOrderSummary
}
export const OrderSummaryList = ({is_delivery, summary}:IOrderSummaryList) => {
    return <>
        <Divider sx={{ my: 2}}/>
        
        <div style={{ minWidth: '350px'}}>

            <SummaryPrice label="Subtotal" amount={summary.original_subtotal}/>

            {summary.discount.lunch_discount !== 0 && <SummaryDiscountPrice label="Lunch Discount" amount={summary.discount.lunch_discount}/>}
            {summary.discount.point_discount !== 0 && <SummaryDiscountPrice label="Point Redemption" amount={summary.discount.point_discount}/>}

        
            { is_delivery && <SummaryPrice label="Delivery Fee" amount={summary.delivery_fee}/> }

            <SummaryPrice label="Tax" amount={summary.tax}/>

            <SummaryPrice label="Tip" amount={summary.tip}/>
            <SummaryPrice label="Total" amount={summary.total}/>


            {
                    summary.refund && <>
                        <Divider sx={{ my: 2}}/>
                        <TitleText sx={{ color: 'red'}}>Refund</TitleText>
                        <SummaryDiscountPrice label="Refund Amount" amount={summary.refund.amount}/>
                        <Typography>Reason: {summary.refund.refund_reason}</Typography>

                        <SummaryPrice label='New Total' amount={Number((summary.total - summary.refund.amount).toFixed(2))}/>
                    </>
                }
        </div>
     
     
        <Divider sx={{ my: 2}}/>
    </>
}

interface ISummaryPrice {
    label: string, 
    amount: number
}

export const SummaryPrice = ({label, amount} : ISummaryPrice) => {
    return <div style={{ display: 'flex', justifyContent: 'space-between'}}>
        <Typography sx={{ fontWeight: 600}}>{label}:</Typography>
        <Typography sx={{ fontWeight: 600}}>${amount.toFixed(2)}</Typography>
    </div>
}

export const SummaryDiscountPrice = ({label, amount} : ISummaryPrice) => {
    return <div style={{ display: 'flex', justifyContent: 'space-between'}}>
        <Typography sx={{ fontWeight: 600}}>{label}:</Typography>
        <Typography sx={{ color: 'red', fontWeight: 600}}>(-${amount.toFixed(2)})</Typography>
    </div>
}