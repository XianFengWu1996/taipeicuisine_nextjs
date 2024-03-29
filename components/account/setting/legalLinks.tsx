import { Box } from "@mui/system"
import Link from "next/link"

export const LegalLinks = () => {
    return <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
        <Link href="/legal/privacy_policy">
            <a style={{ textDecoration: 'underline', color: 'red'}}>Privacy Policy</a>
        </Link>         
        <Link href="/legal/terms_and_conditions">
            <a style={{ textDecoration: 'underline', color: 'red'}}>Terms and Conditions</a>
        </Link>
    </Box>
}
