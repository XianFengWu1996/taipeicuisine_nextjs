import { FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { setLanguage } from "../../../store/slice/persistSetting";
import store, { useAppSelector } from "../../../store/store";

export const LanguageSelect = () => {
    const { language } = useAppSelector(state => state.persistSetting)

    return <>
        <Box sx={{ minWidth:'30%', width: '90%', my: 2}}>
            <Typography sx={{ my: 1}}>Choose your prefer language</Typography>
            <FormControl fullWidth>
                <InputLabel id="language_select_label">Language</InputLabel>
                <Select
                    labelId="language_select_label"
                    id="language_select"
                    value={language}
                    label="language"
                    onChange={(e) => {
                        store.dispatch(setLanguage(e.target.value as string));
                    }}
                >
                    <MenuItem value={'english'}> 🇺🇸 English</MenuItem>
                    <MenuItem value={'chinese'}> 🇨🇳 简体中文</MenuItem>
                </Select>
            </FormControl>
        </Box>
    </>
}