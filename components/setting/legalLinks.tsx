import { Box } from "@mui/system"
import Link from "next/link"

export const LegalLinks = () => {
    return <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
        <Link href="/">
            <a style={{ textDecoration: 'underline', color: 'red'}}>Privacy Policy</a>
        </Link>         
        <Link href="/">
            <a style={{ textDecoration: 'underline', color: 'red'}}>Terms and Conditions</a>
        </Link>
        <Link href="/">
            <a style={{ textDecoration: 'underline', color: 'red'}}>Refund Policy</a>
        </Link>     
    </Box>
}