import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { Collapse } from "@mui/material";
import { Box } from "@mui/system";
import { GoogleAddressSearch } from "./googleAddressSearch";
import { setShowAddressCard } from "../../../../store/slice/settingSlice";

export const DeliveryCollapse = () => {
    const { show_address_card } = useAppSelector(state => state.setting);
    const dispatch = useAppDispatch();

    return <>
        <Collapse in={show_address_card} timeout="auto" unmountOnExit>
        <Box
            component="form"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                '& > :not(style)': {m: 1.5, width: '95%'},
                paddingBottom: '40px'
            }}
            noValidate
            autoComplete="off"
        >
            <GoogleAddressSearch onClose={() => dispatch(setShowAddressCard(false))}/>
        </Box>
    </Collapse>
    </>
}

