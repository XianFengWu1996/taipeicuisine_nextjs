import { Button, ButtonGroup, InputAdornment, TextField, Typography } from "@mui/material"
import { red } from "@mui/material/colors";
import { styled } from "@mui/system";
import { isEmpty, isNaN } from "lodash";
import { useRef, useState } from "react";
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

    return <>
        <Typography variant="h4">Tip</Typography>
        <div style={{ display: 'flex'}}>
            <ButtonGroup size="large">
                <Button 
                    variant={cartState.tipType === '10%' ? 'contained' : 'outlined'}
                    onClick={() => dispatch(setTip('10%'))}>10%</Button>
                <Button 
                    variant={cartState.tipType === '15%' ? 'contained' : 'outlined'}  
                    onClick={() => dispatch(setTip('15%'))}>15%</Button>
                 <Button 
                    variant={cartState.tipType === '18%' ? 'contained' : 'outlined'}
                    onClick={() => dispatch(setTip('18%'))}>18%</Button>
                
                <Button 
                    variant={cartState.tipType === '20%' ? 'contained' : 'outlined'}
                    onClick={() => dispatch(setTip('20%'))}>20%</Button>
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