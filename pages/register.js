import { Button, List, ListItem, TextField, Typography, Link } from '@material-ui/core'
import axios from 'axios';
import Cookies from 'js-cookie';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react'
import { Store } from '../Utils/Store';
import useStyles from '../Utils/styles';
import Layouts from './Components/Layouts'
import { useSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';

export default function Register() {
  const {
    handleSubmit, 
    control, 
    formState: {errors},
  } = useForm();
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();
  const router = useRouter();
  const {redirect} = router.query; 
  const {state, dispatch} = useContext(Store);
  const {userInformation} = state;
  useEffect(() => {
 if(userInformation) {
    router.push('/');
  }
  }, []);
 

  const style = useStyles();
  const onSubmitHandler = async ({name, email, password, confirmPass}) => {
    closeSnackbar();
 
   if(password !== confirmPass) {
    enqueueSnackbar('Passwords Do Not Match', {variant:'error'});
      alert("Passwords Does Not Match!");
      return;
    }
    try {
      const {data} = await axios.post('/api/user/register', {
        name,
        email,
         password
        });
      dispatch({type: 'USER_SIGNIN', payload: data});
      Cookies.set('userInformation', );
      router.push(redirect || '/');
      //alert('success login');
    } catch(err) {
     enqueueSnackbar(
     ' err.response.data ? err.response.data.message : err.message',
        {variant: 'error'}
       );
 
    }
    
  };

  return (
  <Layouts title="Register"> 
     <form onSubmit={handleSubmit(onSubmitHandler)} className={style.form}>
       <Typography component="h1" variant="h1">
        Register
       </Typography>
       <List>
         <ListItem>
         <Controller
           name="name"
           control={ control}
           defaultValue=""
           rules={{
             required: true,
             minLength: 3
             //pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, 
           }}
           render={({field}) => (
           <TextField 
            variant="outlined" 
            fullWidth 
            id="name" 
            label="Name" 
            inputProps={{type: 'name'}}    
            error={Boolean(errors.name)}    
            helperText={
              errors.name
              ? errors.name.type === 'minLength'
              ? 'Name Length more than 2'
              : 'Name Required!'
              : ''
            }
            {...field}
            > </TextField>
  )}
           ></Controller>
         </ListItem>
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
         <Controller
           name="confirmPass"
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
            id="confirmPass" 
            label="Confirm Password" 
            inputProps={{type: 'password'}}    
            error={Boolean(errors.confirmPass)}    
            helperText={
              errors.confirmPass
              ? errors.confirmPass.type === 'minLength'
              ? 'Confirm Password length needs to be more than 6!'
              : 'Confirm Password is requried'
              : ''
            }
            {...field}
            > </TextField>
  )}
           ></Controller>
         </ListItem>

         <ListItem>
            <Button variant="contained" type="submit" fullWidth color="secondary">
               Register!
            </Button>
         </ListItem>
         <ListItem>
            Already a member? &nbsp; <NextLink href={`/login?redirect=${redirect || '/'}`} passHref><Link>Register</Link></NextLink>
         </ListItem>
       </List>
     </form>
  </Layouts>
  );
}
