import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { MenuBookOutlined, Storefront } from '@mui/icons-material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAppSelector } from '../store/store';

const ResponsiveAppBar = () => {
  const router = useRouter()

  const admin = useAppSelector(state => state.admin)
  const menu = useAppSelector(state => state.menus)

  let store_expiration = admin.store_info.expiration;
  let menu_expiration = menu.expiration;

  const [open, setOpen] = React.useState(false);

  const handleOnOpen = () => {
    setOpen(true);
  }

  const handleOnClose = () => {
    setOpen(false);
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
       
          <IconButton onClick={handleOnOpen}>
            <MenuIcon sx={{ color: 'white' }}/>
          </IconButton>
          <Drawer 
            anchor='left'
            open={open}
            onClose={handleOnClose}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Image 
                src={'https://firebasestorage.googleapis.com/v0/b/foodorder-43af7.appspot.com/o/logo.png?alt=media&token=7b174632-0f36-4c90-bf02-e630110cef45'}
                width={100}
                height={100}
                alt='taipei logo'
              />

              <Box sx={{ width: 350, display: 'flex', flexDirection: 'column', alignItems: 'stretch'}}>
              <Divider />

            {}
                <List sx={{ marginY: 3}}>
                    <ListItem button onClick={() => {
                      router.push({
                        pathname: '/admin/dashboard',
                        query: store_expiration ? {
                          expiration: store_expiration
                        } : {}
                      })
                    }}>
                      <ListItemIcon><Storefront /></ListItemIcon>
                      <ListItemText primary={'Store'} />
                    </ListItem>

                    <ListItem button onClick={() => {
                        router.push({
                          pathname: '/admin/menu',
                          query: menu_expiration ? {
                            expiration: menu_expiration
                          } : {}
                        })
                    }}> 
                      <ListItemIcon><MenuBookOutlined /></ListItemIcon>
                      <ListItemText primary={'Edit Menu'} />
                    </ListItem>
                </List>

              </Box>

              <Button variant='contained' sx={{ backgroundColor: 'red'}}>Logout</Button>
            </div>
          </Drawer>


          
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;