import {  TextField } from "@mui/material";
import { red } from "@mui/material/colors";
import { useState } from "react";
import PlacesAutocomplete, { geocodeByAddress } from "react-places-autocomplete";
import { PuffLoader, PulseLoader } from "react-spinners";
import { v4 } from "uuid";
import { setDelivery } from "../../../../store/slice/cartSlice";
import { updateAddress } from "../../../../store/slice/customerSlice";
import { useAppDispatch } from "../../../../store/store";
import { handleCatchError } from "../../../../utils/errors/custom";
import { calculateDeliveryFee } from "../../../../utils/functions/phone";
import snackbar from "../../../snackbar";
import { AptAndBusiness } from "./aptAndBusiness";

export const GoogleAddressSearch = ({ onClose } : {onClose: () => void }) => {
    const [addressInput, setAddressInput] = useState('');
    const [loading, setLoading] = useState(false);

    const dispatch = useAppDispatch();

    const handleAddressOnChange = (value: string) => {
        setAddressInput(value); 
    }

    // convert the data from the address component 
    const handleAddressOnSelect = async (value: string, place_id: string ) => {
        try {
            setLoading(true);
            let address_result = await geocodeByAddress(value);

            let format_address = address_result[0].formatted_address;
    
            let data : {[key:string]: string}= {
                street_number: '',
                route: '',
                locality: '',
                administrative_area_level_1: '',
                postal_code: '',
            }
    
            Object.keys(data).forEach((key) => {
                address_result[0].address_components.forEach((addr) => {
                    if(key === addr.types[0]){
                        data[key] = addr.long_name
                    }
                })
            });

            let result = await calculateDeliveryFee({
                format_address: format_address,
                address: data as unknown as IGoogleAddress,
                place_id,
            })

            setAddressInput('');
            onClose();
            // dispatch delivery fee 
            dispatch(updateAddress(result.address))
            dispatch(setDelivery(result.address.delivery_fee))
            snackbar.success('Address has been updated')
        } catch (error) {
            handleCatchError(error as Error, 'Failed to find address')
        } finally {
            setLoading(false);
        }
    }
    return <form style={{ display: 'flex', flexDirection: 'column'}} autoComplete={'off'}>
        <PlacesAutocomplete
                value={addressInput}
                onChange={handleAddressOnChange}
                onSelect={handleAddressOnSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div style={{ width: '270px'}}>
                    <TextField
                    size="small"
                    fullWidth
                    {...getInputProps({
                        placeholder: 'Search your address...',
                        className: 'location-search-input',
                    })}
                    />
                    <div className="autocomplete-dropdown-container">
                    {loading && <PulseLoader size={8} /> }
                    {suggestions.map(suggestion => {
                        const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                        // inline style for demonstration purpose
                        const style = suggestion.active
                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                        return (
                            <div
                                {...getSuggestionItemProps(suggestion, { className, style })}
                                key={v4()}
                            >
                                <span>{suggestion.description}</span>
                            </div>
                        );
                    })}
                    </div>
                </div>
                )}
        </PlacesAutocomplete>
        
        <AptAndBusiness />
        
        { loading && <PuffLoader size={40} color={red[400]} speedMultiplier={1.5}/>}
    </form>
}

