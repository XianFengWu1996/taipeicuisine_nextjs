import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { isEmpty } from "lodash";
import { GoFlame } from "react-icons/go";

interface IDishVarirantProp {
    variant: IVarirant[],
    radioError: boolean,
    handleOnRadioChange: (arg1: string, arg2: IVarirantOption[]) => void 
}
export const DishVariant = ({variant, radioError, handleOnRadioChange}: IDishVarirantProp) => {
    return <div>
        {
            !isEmpty(variant) && variant.map((variant) => {
                return <FormControl key={variant.id}>
                    <FormLabel id="radio-buttons-group-label" sx={{ 
                            fontSize: 13, 
                            marginTop: 2,
                            color: radioError ? 'red' : 'black'
                    }}>{variant.en_name} {variant.ch_name}* {radioError ? '(Please Select One)' : ''}</FormLabel>
                        <RadioGroup
                            aria-labelledby="radio-buttons-group-label"
                            name="radio-buttons-group"
                            onChange={(_, value) => {
                                handleOnRadioChange(value, variant.options);
                            }}
                        >
                            {
                                variant.options.map((option) => {
                                   return <FormControlLabel
                                        key={option.id} 
                                        value={option.id} 
                                        control={<Radio required size="small" />} 
                                        label={
                                            <Typography sx={{ fontSize: 14 }}>
                                                {option.en_name} {option.ch_name} 
                                                +${option.price.toFixed(2)} 
                                                {option.spicy && <GoFlame color="red"/>}
                                            </Typography>}
                                    /> 
                                })
                            }
                        </RadioGroup>
                    </FormControl>
            })
        }
    </div>
}