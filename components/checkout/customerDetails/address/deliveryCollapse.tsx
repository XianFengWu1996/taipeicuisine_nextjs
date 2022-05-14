import { useState } from "react";
import { useAppSelector } from "../../../../store/store";
import PlacesAutocomplete, {geocodeByAddress} from 'react-places-autocomplete';
import { v4 } from "uuid"; 
import { Collapse, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { PuffLoader, PulseLoader } from "react-spinners";
import { calculateDeliveryFee } from "../../../../utils/functions/phone";
import { red } from "@mui/material/colors";

export const DeliveryCollapse = () => {
    const { addressCollapse } = useAppSelector(state => state.setting);

    const [addressInput, setAddressInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAddressOnChange = (value: string) => {
        setAddressInput(value); 
    }

    // convert the data from the address component 
    const handleAddressOnSelect = async (value: string) => {
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

        return {
            format_address,
            address: data as unknown as IGoogleAddress,
        }
    }

    return <>
        <Collapse in={addressCollapse} timeout="auto" unmountOnExit>
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
            {
                <PlacesAutocomplete
                    value={addressInput}
                    onChange={handleAddressOnChange}
                    onSelect={async (addr, place_id) => {
                        setLoading(true);
                        let data = await handleAddressOnSelect(addr);
                        await calculateDeliveryFee({
                            format_address: data.format_address,
                            address: data.address,
                            place_id,
                        })
                        setAddressInput('');
                        setLoading(false);
                    }}
                >
                 {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <TextField
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
            }

            { loading && <PuffLoader size={40} color={red[400]} speedMultiplier={1.5}/>}
        </Box>
    </Collapse>
    </>
}