import { IconButton, SelectChangeEvent, Typography } from "@mui/material"
import { isEmpty } from "lodash"
import { SetStateAction, useState } from "react"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { ICustomizeItem } from "."
import { CustomizeSelect } from "./CustomizeSelect"

interface ICustomizeProp {
    handleAddCustomizeItem: (arg: number) => void,
    handleRemoveCustomizeItem: (arg: number) => void,
}

export const Customize = ({ handleAddCustomizeItem, handleRemoveCustomizeItem } : ICustomizeProp) => {
    const extra_protein_list: ICustomizeItem[] = [
        {
            id: 'f9a2f119-c4bc-4a18-b346-9b7b8ce0ff05',
            en_name: 'Chicken',
            ch_name: '鸡肉',
            price: 3,
        },
        {
            id: '16d63cb0-82a8-4356-80a0-ed1295710f47',
            en_name: 'Beef',
            ch_name: '牛肉',
            price: 3,
        },
        {
            id: '9df590ce-ee27-42f1-b8fd-de69c5ca5fe3',
            en_name: 'Fatty Beef',
            ch_name: '肥牛',
            price: 8,
        }
    ]

    const extra_veggie_list: ICustomizeItem[] = [
        {
            id: '735b7c15-2596-41f7-ae37-3970e94846fc',
            en_name: 'Mixed Vegetable',
            ch_name: '蔬菜',
            price: 3,
        },
        {
            id: '1bb54a00-253f-4ffb-b988-2b50fa450535',
            en_name: 'Mixed Vegetable',
            ch_name: '蔬菜',
            price: 5,
        },
        {
            id: '24828fb4-e428-450c-a14d-3f1d106ed566',
            en_name: 'Broccoli',
            ch_name: '西兰花',
            price: 3,
        },
        {
            id: '06321ccf-5035-4e94-93b5-474b95e8eae4',
            en_name: 'Cauliflower',
            ch_name: '花菜',
            price: 3,
        }
    ]

    const [protein, setProtein] = useState<ICustomizeItem[]>([])
    const [veggie, setVeggie] = useState<ICustomizeItem[]>([]);

    interface IHandleItemOnSelect {
        event: SelectChangeEvent<string>, 
        original_list: ICustomizeItem[],
        added_list: ICustomizeItem[],
        setItem: (value: SetStateAction<ICustomizeItem[]>) => void
    }
    const handleItemOnSelect = ({event, original_list, added_list, setItem}:IHandleItemOnSelect) => {
        // find the item that was selected
        let found_item = original_list.find((item) => {
            return item.id === event.target.value
        })

        if(!found_item) return;

        // check if it is already selected
        let duplicate = added_list.find((item) => {
            return item.id === event.target.value
        })
        if(duplicate) return;

        // add to the list if not duplicated
        setItem([...added_list, found_item]);
        handleAddCustomizeItem(found_item.price);

    }

    const handleOnDelete = (val: ICustomizeItem, list: ICustomizeItem[], title:string) => {
        let temp = list.filter((item) => {
            return item.id !== val.id
        })

        console.log(temp)
        if(title === 'protein'){
            setProtein(temp)
        } else if(title === 'veggie'){
            setVeggie(temp)
        }

        handleRemoveCustomizeItem(val.price)
    }
    
    return <>
            <Typography>We will contact you if we are unable to fulfil any of the request**</Typography>

            <div style={{ display: 'flex'}}>
            <div>
                <CustomizeSelect 
                    title="Protein"
                    original_list={extra_protein_list}
                    onChange={(event) => {
                        handleItemOnSelect({
                            event,
                            original_list: extra_protein_list,
                            added_list: protein,
                            setItem: setProtein
                        });
                    }}
                />

                <CustomizeSelect 
                    title="Vegetable"
                    original_list={extra_veggie_list}
                    onChange={(event) => {
                        handleItemOnSelect({
                            event,
                            original_list: extra_veggie_list,
                            added_list: veggie,
                            setItem: setVeggie
                        });
                    }}
                />

            </div>

            <div style={{ marginLeft: '20px'}}>
                <CustomizeListDisplay 
                    list={protein}
                    title={'protein'}
                    handleOnDelete={handleOnDelete}
                />

                <CustomizeListDisplay 
                    list={veggie}
                    title={'veggie'}
                    handleOnDelete={handleOnDelete}
                />

            </div>
            </div>
    </>
}

interface ICustomizeListDisplayProps {
    list: ICustomizeItem[],
    title: string,
    handleOnDelete: (arg: ICustomizeItem, arg2: ICustomizeItem[], arg3: string) => void
}

export const CustomizeListDisplay = ({list, title, handleOnDelete} : ICustomizeListDisplayProps) => {
    return <>
        {
            !isEmpty(list) && <Typography variant="h6" sx={{ textDecoration: 'underline', mt: 1, textTransform:'capitalize'}}>Extra {title}</Typography>    
        } 
        {
            !isEmpty(list) && list.map((val) => {
                return <div key={val.id} style={{ display: 'flex', alignItems: 'center'}}>
                        <Typography sx={{ fontSize: '14px', fontWeight: 500}}> Extra {val.en_name} 加{val.ch_name} +${val.price}</Typography>
                        <IconButton color="error" size="small" onClick={() => {
                            handleOnDelete(val, list, title)
                        }}><AiOutlineCloseCircle /></IconButton>
                </div>
            })
        }
    </>
}
    