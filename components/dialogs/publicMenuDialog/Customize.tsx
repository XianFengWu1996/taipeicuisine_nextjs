import { SelectChangeEvent, Typography } from "@mui/material"
import { SetStateAction, useState } from "react"
import { ICustomizeItem, ICustomizeListItem } from "."
import { CustomizeSelect } from "./CustomizeSelect"

export const Customize = () => {
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

    const extra_condiment_list: ICustomizeItem[] = [
        {
            id: '86ce6468-1eb5-4694-b610-07ba86455a8e',
            en_name: 'Basil',
            ch_name: '九层塔',
            price: 0,
        },
        {
            id: 'c93e4ec4-9d59-45d1-b125-6ccdb14b49c7',
            en_name: 'Scallion',
            ch_name: '葱花',
            price: 0,
        },
        {
            id: '95228f25-1186-48f8-af3a-d9910c3f7225',
            en_name: 'Garlic',
            ch_name: '大蒜',
            price: 0,
        }
    ]

   

    const [protein, setProtein] = useState<ICustomizeListItem[]>([])
    const [veggie, setVeggie] = useState<ICustomizeListItem[]>([]);
    const [condiment, setCondiment] = useState<ICustomizeListItem[]>([]);

    interface IHandleItemOnSelect {
        event: SelectChangeEvent<string>, 
        original_list: ICustomizeItem[],
        added_list: ICustomizeListItem[],
        setItem: (value: SetStateAction<ICustomizeListItem[]>) => void
    }
    const handleItemOnSelect = ({event, original_list, added_list, setItem}:IHandleItemOnSelect) => {
        // FIRST: FIND THE ITEM WITH THE ID RETURN BY THE SELECT
        let found_item = original_list.find((item) => {
            return item.id === event.target.value
        })

        // SECOND: CHECK IF THE ITEM IS ALREADY IN THE LIST
        let index = added_list.findIndex((val) => {
            return val.id === event.target.value
        });

        if(!found_item) return;

        if(index !== -1){
            // assign the array to a new array
            let temp = added_list;

            // get the item with the index
            let item = temp[index];

            item.count++; // increase the count

            // calculate the total
            item.total = item.price * item.count

            setItem([...temp]);
            return;
        }

        // add it to the protein list
        setItem([
            ...added_list, 
            {
                ...found_item, 
                count: 1, 
                total: found_item.price
            }])
    }
    
    return <>
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

        <CustomizeSelect
            title="Condiment"
            original_list={extra_condiment_list}
            onChange={(event) => {
                handleItemOnSelect({
                    event,
                    original_list: extra_condiment_list,
                    added_list: condiment,
                    setItem: setCondiment
                });
            }}
        />

<div>
                {
                    protein.map((p) => {
                        return <Typography key={p.id}>x{p.count}  {p.en_name} {p.ch_name}  ${p.price}  =  ${p.total}</Typography>
                    })
                }

{
                    veggie.map((p) => {
                        return <Typography key={p.id}>x{p.count}  {p.en_name} {p.ch_name}  ${p.price}  =  ${p.total}</Typography>
                    })
                }

{
                    condiment.map((p) => {
                        return <Typography key={p.id}> Extra {p.en_name} 加{p.ch_name} </Typography>
                    })
                }
            </div>
    </>
}