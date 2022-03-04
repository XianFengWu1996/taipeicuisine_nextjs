import { Button, ButtonGroup, InputAdornment, TextField, Typography } from "@mui/material"
import { red } from "@mui/material/colors";
import { styled } from "@mui/system";
import { isEmpty, isNaN, values } from "lodash";
import { useRef } from "react";
import { setCustomTip, setTip } from "../../../../store/slice/cartSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { BsCurrencyDollar } from 'react-icons/bs'

const CustomTipTextfield = styled(TextField)(() => ({
    '& fieldset': {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderColor: red[200],
    }, 
}))

export const TipSelection = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const dispatch = useAppDispatch();
    const cartState = useAppSelector(state => state.cart);

    const handleTipOnChange = (value: string) => {
        if(value === cartState.tipType){
            dispatch(setTip('')) 
            return;
        }

        dispatch(setTip(value)) 
        inputRef.current!.value = ''
    }

    return <>
        <Typography variant="h4">Tip</Typography>
        <div style={{ display: 'flex'}}>
            <ButtonGroup size="large">
                <TipButton 
                    value="10%"
                    tipType={cartState.tipType}
                    handleOnClick={() => handleTipOnChange('10%')}
                />
                <TipButton 
                    value="15%"
                    tipType={cartState.tipType}
                    handleOnClick={() => handleTipOnChange('15%')}
                />
                <TipButton 
                    value="18%"
                    tipType={cartState.tipType}
                    handleOnClick={() => handleTipOnChange('18%')}
                />
                  <TipButton 
                    value="20%"
                    tipType={cartState.tipType}
                    handleOnClick={() => handleTipOnChange('20%')}
                />
            </ButtonGroup>

            <div style={{ display: 'flex', alignItems: 'stretch', marginLeft: '50px'}}>
                    <Button 
                        sx={{ 
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            borderRight: 0,
                        }}
                        variant={cartState.tipType === 'custom' ? 'contained' : 'outlined'}
                        onClick={() => {
                            if(cartState.tipType === 'custom'){
                                dispatch(setTip(''));
                                if(inputRef.current){
                                    inputRef.current.value = ''
                                }
                                return;
                            };

                            dispatch(setTip('custom'))
                            if(inputRef.current){
                                inputRef.current.focus();
                            }
                        }}>Custom</Button>

                     <CustomTipTextfield                      
                        type={'number'} 
                        inputRef={inputRef}
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <BsCurrencyDollar />
                              </InputAdornment>
                            ),
                          }}
                        onFocus={() => {
                            dispatch(setTip('custom'))
                        }}
                        onBlur={(e) => {
                            if(isEmpty(e.target.value)) return;

                            if(isNaN(e.target.value)) return;

                            dispatch(setCustomTip(Number(e.target.value)));
                        }}
                     />
            </div>
        </div>
    </>
}

interface ITipButtonProps {
    value: string,
    tipType: string,
    handleOnClick: () => void
}

const TipButton = ({ value, tipType, handleOnClick}: ITipButtonProps) => {
    return <>
        <Button 
            variant={tipType === value ? 'contained' : 'outlined'}
            onClick={handleOnClick}
        >
        {value}</Button>
    </> 
}