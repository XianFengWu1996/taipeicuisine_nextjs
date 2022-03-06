import { Button, ButtonGroup, InputAdornment, TextField, Typography } from "@mui/material"
import { red } from "@mui/material/colors";
import { styled } from "@mui/system";
import { isEmpty, isNaN, values } from "lodash";
import { FocusEvent, Ref, useRef } from "react";
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
    const inputRef = useRef<HTMLInputElement>(null);

    const dispatch = useAppDispatch();
    const cartState = useAppSelector(state => state.cart);

    const handleClearValue = () => {
        if(inputRef.current){
            inputRef.current.value = ''
        }
    }
    const handleClearFocus = () => {
        if(inputRef.current){
            inputRef.current.focus();
        }
    }

    const handleTipOnChange = (value: string) => {
        if(value === cartState.tip_type){
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
                    tip_type={cartState.tip_type}
                    handleOnClick={() => handleTipOnChange('10%')}
                />
                <TipButton 
                    value="15%"
                    tip_type={cartState.tip_type}
                    handleOnClick={() => handleTipOnChange('15%')}
                />
                <TipButton 
                    value="18%"
                    tip_type={cartState.tip_type}
                    handleOnClick={() => handleTipOnChange('18%')}
                />
                  <TipButton 
                    value="20%"
                    tip_type={cartState.tip_type}
                    handleOnClick={() => handleTipOnChange('20%')}
                />
            </ButtonGroup>

            <CustomTipButton 
                tip_type={cartState.tip_type}
                clearValue={handleClearValue}
                clearFocus={handleClearFocus}
                inputRef={inputRef}
            />
        </div>
    </>
}

interface ITipButtonProps {
    value: string,
    tip_type: string,
    handleOnClick: () => void,
}

const TipButton = ({ value, tip_type, handleOnClick}: ITipButtonProps) => {
    return <>
        <Button 
            variant={tip_type === value ? 'contained' : 'outlined'}
            onClick={handleOnClick}
        >
        {value}</Button>
    </> 
}

interface ICustomTipButtonProps {
    tip_type: string,
    clearValue: () => void,
    clearFocus: () =>  void,
    inputRef: Ref<any> | undefined
}

const CustomTipButton = (props: ICustomTipButtonProps) => {

    const dispatch = useAppDispatch();

    const handleOnClick = () => {
        if(props.tip_type === 'custom'){
            dispatch(setTip(''));
            props.clearValue();
            return;
        };

        dispatch(setTip('custom'))
        props.clearFocus();
    }

    const handleOnFocus = () => {
        dispatch(setTip('custom'))
    }

    const handleOnBlur = (e:FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
        if(isEmpty(e.target.value)) return;

        if(isNaN(e.target.value)) return;

        dispatch(setCustomTip(Number(e.target.value)));
    }

    return  <div style={{ display: 'flex', alignItems: 'stretch', marginLeft: '50px'}}>
    <Button 
        sx={{ 
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            borderRight: 0,
        }}
        variant={props.tip_type === 'custom' ? 'contained' : 'outlined'}
        onClick={handleOnClick}>Custom</Button>

     <CustomTipTextfield                      
        type={'number'} 
        inputRef={props.inputRef}
        InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BsCurrencyDollar />
              </InputAdornment>
            ),
          }}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
     />
</div>
}