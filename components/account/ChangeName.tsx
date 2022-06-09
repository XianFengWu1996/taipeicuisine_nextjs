import { Button, TextField } from "@mui/material"
import { isEmpty } from "lodash";
import { useState } from "react"
import { PulseLoader } from "react-spinners";
import { handleUpdateName } from "../../utils/functions/account";
import { TitleForSection } from "./components";

interface IAccountChangeName {
    name: string,
    account:  boolean,
}

export const AccountChangeName = (_: IAccountChangeName) => {
    const [name, setName] = useState<string>(_.name);
    const [loading, setLoading] = useState<boolean>(false);
    return <form autoComplete={'off'} style={{  marginTop: _.account ? '20px' : '0px'}}>
        <TitleForSection label={'name'} />
        <TextField
            value={name}
            variant='outlined'
            size='small'
            type={'text'}
            onChange={(e) => setName(e.target.value)}
        />
        <Button variant='outlined' sx={{ mx: 3, padding: 0.8}} onClick={() => {
            handleUpdateName(name, _.name, setLoading, _.account)
        }}>{loading ? <PulseLoader size={5} color='red'/> : isEmpty(_.name) ? 'Add Name': 'Change Name'}</Button>

    </form>
}