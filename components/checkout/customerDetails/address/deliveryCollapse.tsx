
import { useState } from "react";
import { useAppSelector } from "../../../../store/store";
import PlacesAutocomplete, {
    geocodeByAddress,
  } from 'react-places-autocomplete';
  import { v4 } from "uuid"; 

import { Collapse, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { PulseLoader } from "react-spinners";
import { calculateDeliveryFee, IGoogleAddress } from "../../../../utils/functions/phone";

export const DeliveryCollapse = () => {
    const { addressCollapse } = useAppSelector(state => state.customer);

    const [addressInput, setAddressInput] = useState('');
    const [formatAddress, setFormatAddress] = useState('');

    const [address, setAddress] = useState<IGoogleAddress>({
        street_number: '',
        route: '',
        locality: '',
        administrative_area_level_1: '',
        postal_code: '',
    })

    const handleAddressOnChange = (value: string) => {
        setAddressInput(value); 
    }

    const handleAddressOnSelect = async (value: string) => {
        let address_result = await geocodeByAddress(value);

        setFormatAddress(address_result[0].formatted_address);  

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

        setAddress({
            ...address,
            ...(data as unknown as IGoogleAddress) 
        });

        await calculateDeliveryFee({
            format_address: formatAddress,
            address,
            place_id: address_result[0].place_id,
        })
    }

    return <>
        <Collapse in={addressCollapse} timeout="auto" unmountOnExit>
        <Box
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                '& > :not(style)': {my: 1.5, width: '95%'},
                paddingBottom: '40px'
            }}
            noValidate
            autoComplete="off"
        >
            {
                <PlacesAutocomplete
                    value={addressInput}
                    onChange={handleAddressOnChange}
                    onSelect={handleAddressOnSelect}
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
        <div>{formatAddress}</div>
        <div>{address.street_number}</div>
        <div>{address.route}</div>
        <div>{address.locality}</div>
        <div>{address.administrative_area_level_1}</div>
        <div>{address.postal_code}</div>
        </Box>
    </Collapse>
    </>
}