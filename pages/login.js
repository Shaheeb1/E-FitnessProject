import { Button, List, ListItem, TextField, Typography, Link } from '@material-ui/core'
import axios from 'axios';
import Cookies from 'js-cookie';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React, { useContext, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Store } from '../Utils/Store';
import useStyles from '../Utils/styles';
import Layouts from './Components/Layouts'

export default function Login() {
  const {
    handleSubmit, 
    control, 
    formState: {errors},
  } = useForm();
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();
  const router = useRouter();
  const {redirect} = router.query; //login?redirect=/checkout
  const {state, dispatch} = useContext(Store);
  const {userInformation} = state;
  useEffect(() => {
 if(userInformation) {
    router.push('/');
  }
  }, []);
 
  const style = useStyles();
  const onSubmitHandler = async ({email, password}) => {
    closeSnackbar();
  
    try {
      const {data} = await axios.post('/api/user/login', {email, password});
      dispatch({type: 'USER_SIGNIN', payload: data});
      Cookies.set('userInformation', data);
      router.push(redirect || '/');
      //alert('success login');
    } catch(error) {
      enqueueSnackbar(
        'Invalid Email or Password',
        {variant: 'error'}
        );
    
    }
    
  };

  return (
  <Layouts title="Login"> 
     <form onSubmit={handleSubmit(onSubmitHandler)} className={style.form}>
       <Typography component="h1" variant="h1">
        Login
       </Typography>
       <List>
         <ListItem>
           <Controller
           name="email"
           control={ control}
           defaultValue=""
           rules={{
             required: true,
             //pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, 
           }}
           render={({field}) => (
           <TextField 
            variant="outlined" 
            fullWidth 
            id="email" 
            label="Email" 
            inputProps={{type: 'email'}}    
            error={Boolean(errors.email)}    
            helperText={
              errors.email
              ? errors.email.type === 'pattern'
              ? 'Email not valid'
              : 'Email is requried'
              : ''
            }
            {...field}
            > </TextField>
  )}
           ></Controller>
           
         </ListItem>
         <ListItem>
         <Controller
           name="password"
           control={ control}
           defaultValue=""
           rules={{
             required: true,
             minLength: 7
           }}
           render={({field}) => (
           <TextField 
            variant="outlined" 
            fullWidth 
            id="password" 
            label="Password" 
            inputProps={{type: 'password'}}    
            error={Boolean(errors.password)}    
            helperText={
              errors.password
              ? errors.password.type === 'minLength'
              ? 'Password length needs to be more than 6!'
              : 'Password is requried'
              : ''
            }
            {...field}
            > </TextField>
  )}
           ></Controller>
         </ListItem>
         <ListItem>
            <Button variant="contained" type="submit" fullWidth color="secondary">
               Sign In
            </Button>
         </ListItem>
         <ListItem>
            Want to register? &nbsp; <NextLink href={`/register?redirect=${redirect || '/'}`} passHref><Link>Register</Link></NextLink>
         </ListItem>
       </List>
     </form>
  </Layouts>
  );
}
