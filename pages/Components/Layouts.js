import React, { useContext, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { AppBar, Container, Link, Toolbar, Typography, createTheme,
   ThemeProvider, CssBaseline, Switch, Badge, Button,  Menu, MenuItem, } from '@material-ui/core';
import DrawerC from './DrawComponent/DrawerC';
import {Store} from '../../Utils/Store';
import Cookies from 'js-cookie';
import useStyles from '../../Utils/styles';
import { useRouter } from 'next/router';

export default function Layouts({title, description, children}) {
  const router = useRouter();
  const {state, dispatch} = useContext(Store);
  const {darkMode, basket, userInformation} = state;
  const theme = createTheme({typography: {
    h1: {
      fontSize: '1.6rem',
      fontWeight: 400,
      margin: '1rem 0'
    
    },
    h2: {
      fontSize: '1.4rem',
      fontWeight: 400,
      margin: '1rem 0'
    },
  },
  
  palette: {
    type: darkMode ? 'dark' : 'light',
    primary: {
      main: '#f0c000',
    }, 
    secondary:
    {
      main: '#208080',
    },
  },

});
  const classes = useStyles();
  const darkModeChanger = () => {
    dispatch({type: darkMode? 'DARK_MODE_OFF': 'DARK_MODE'});
    const refreshDark = !darkMode;
    Cookies.set('darkMode', refreshDark ? 'ON' : 'OFF');
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const loginHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const loginMenuCloseHandler = () => {
    setAnchorEl(null);
  };
  const logoutCloseHandler = () => {
    setAnchorEl(null);
    dispatch({type: 'USER_SIGNOUT'});
    Cookies.remove('userInformation');
    Cookies.remove('basketItems');
    router.push('/')
  };
    return (
        <div>
            <Head>
                <title>{title ? `${title} - E-Fitness`: `E-Fitness`}</title>
                {description && <meta name="desc" content={description}></meta>
                
               
}
            </Head>
            <Head>
                <title>{title ? `${title} - E-Fitness`: `E-Fitness`}</title>
                {description && <meta name="desc" content={description}></meta>
                
               
}
            </Head>
        
             
                       <DrawerC>
        
        </DrawerC>
                   
           
           
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <AppBar position ="static" className = {classes.navbar}>
                <Toolbar>
                  <NextLink href="/" passHref>
                    <Link> <Typography className = {classes.brand}> E-Fitness</Typography></Link>
                   
                  </NextLink>
                   <div className={classes.grow}>
                  </div>  

                  <div>
                    <Switch checked={darkMode} onChange={darkModeChanger}>
                       </Switch>
                     <NextLink href="/basket" passHref>
                       <Link>
                       {basket.basketItems.length > 0 ? ( 
                       <Badge color="secondary" badgeContent={basket.basketItems.length}> Basket </Badge>
                      ) : (
                        'cart' 
                       )}
                       </Link>
                     </NextLink>
                     {userInformation? (
                       <>
                     <Button   
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={loginHandler} 
                    className={classes.navbarButton}>
                      {userInformation.name}</Button>
                     <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={loginMenuCloseHandler}
                  >
                    <MenuItem onClick={loginMenuCloseHandler}>Profile</MenuItem>
                    <MenuItem onClick={loginMenuCloseHandler}>
                      My account
                    </MenuItem>
                    <MenuItem onClick={logoutCloseHandler}>Logout</MenuItem>
                  </Menu>

                     </>
                     ) : (
                      <NextLink href="/login" passHref>
                       <Link>Login</Link>
                     </NextLink>
                     )}
                    
                  </div>
                </Toolbar>
              

            </AppBar>
            <Container className = {classes.main}>
                {children}
            </Container>
            <footer className = {classes.footer}>
            <Typography> 
              All rights reserved. Fitness Shop.
            </Typography>
            </footer>
            </ThemeProvider>
            
        </div>
    )
}
