interface IMenu {
    id: string, 
    category: ICategory[],
    en_name: string, 
    ch_name: string,
    document_name: string,
}

interface ICategory{
    id: string, 
    ch_name: string,
    en_name: string, 
    dishes: IDish[],
    document_name: string,
    order: number,
}

interface IDish {
    id: string,
    en_name: string,
    ch_name: string,
    is_spicy:boolean,
    is_popular: boolean,
    is_customizable: boolean,
    is_lunch: boolean,
    in_stock: boolean,
    price: number,
    variant: IVarirant[],
    description: string,
    label_id: string,
    order: number,
    pic_url:string,
    additional_info: {
        menu: string,
        category: string,
    }
}

interface IVarirant{
    id: string,
    en_name: string,
    ch_name:string,
    options: IVarirantOption[],
}

interface IVarirantOption {
    id: string,
    en_name: string,
    ch_name:string,
    price: number,
    spicy: boolean,
}

interface ICheckbox {
    checked: boolean, 
    onChange: (_: ChangeEvent<HTMLInputElement>) => void,
    label: string,
    name: string,
}

interface ITextFieldProps {
    label: string,
    name: string, 
    value: string | number | undefined,
    onChange: (_: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    required?: boolean,
    type?: HTMLInputTypeAttribute | undefined,
}

interface IFile extends File{
    preview: string,
  }