import { Typography } from "@mui/material"

import { LanguageSelect } from "./languageSelect";
import { LegalLinks } from "./legalLinks";
import { ThemeModeSwitch } from "./themeMode";

export const SettingPage = () => {
    return <div style={{ paddingBottom: '50px'}}>
        <Typography variant="h4">Setting</Typography>

        <ThemeModeSwitch />
        
        <LanguageSelect />
        
        <LegalLinks />
    </div>
}