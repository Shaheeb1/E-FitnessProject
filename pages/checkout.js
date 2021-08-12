import { Button, List, ListItem, TextField, Typography,  } from '@material-ui/core'

import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react'
import { Store } from '../Utils/Store';
import useStyles from '../Utils/styles';
import Layouts from './Components/Layouts'
import { Controller, useForm } from 'react-hook-form';
import CheckoutDisplay from './Components/CheckoutDisplay';

export default function Checkout() {
  const {
    handleSubmit, 
    control, 
    formState: {errors},
    setValue,
  } = useForm();
  const router = useRouter();
  const {state, dispatch} = useContext(Store);
  const {userInformation, basket:{shippingAddress}} = state;
  useEffect(() => {
 if(!userInformation) {
    router.push('/login?redirect=/checkout');
  }
  setValue('fullName', shippingAddress.fullName);
  setValue('address', shippingAddress.address);
  setValue('city', shippingAddress.city);
  setValue('postCode', shippingAddress.postCode);
  setValue('country', shippingAddress.country);
  }, []);
 

  const style = useStyles();
  const onSubmitHandler = ({
    fullName, address, city, postCode,country }) => {
      dispatch({
        type: 'SHIPPING_ADDRESS', 
        payload: { fullName, address, city, postCode, country }
      });
      Cookies.set('shipToAdress', {
        fullName, address, city, postCode, country } );
      router.push('/payment');
      //alert('success login');
  };

  return (
  <Layouts title="Shipping Address"> 
     <CheckoutDisplay activeStep={1}/>
     <form onSubmit={handleSubmit(onSubmitHandler)} className={style.form}>
       <Typography component="h1" variant="h1">
        Shipping Address:
       </Typography>
       <List>
         <ListItem>
         <Controller
           name="fullName"
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
            id="fullName" 
            label="Full Name" 
          //  inputProps={{type: 'text'}}    
            error={Boolean(errors.fullName)}    
            helperText={
              errors.fullName
              ? errors.fullName.type === 'minLength'
              ? 'Full Name Length more than 2'
              : 'Full Name Required!'
              : ''
            }
            {...field}
            > </TextField>
  )}
           ></Controller>
         </ListItem>
         <ListItem>
         <Controller
           name="address"
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
            id="address" 
            label="Address:" 
          //  inputProps={{type: 'text'}}    
            error={Boolean(errors.address)}    
            helperText={
              errors.address
              ? errors.address.type === 'minLength'
              ? 'Address Length more than 2'
              : 'Address Name Required!'
              : ''
            }
            {...field}
            > </TextField>
  )}
           ></Controller>
         </ListItem>
         <ListItem>
         <Controller
           name="city"
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
            id="city" 
            label="City:" 
          //  inputProps={{type: 'text'}}    
            error={Boolean(errors.city)}    
            helperText={
              errors.city
              ? errors.city.type === 'minLength'
              ? 'City name Length more than 2'
              : 'City name Required!'
              : ''
            }
            {...field}
            > </TextField>
  )}
           ></Controller>
         </ListItem>
         <ListItem>
         <Controller
           name="postCode"
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
            id="postCode" 
            label="Postal Code:" 
          //  inputProps={{type: 'text'}}    
            error={Boolean(errors.postCode)}    
            helperText={
              errors.postCode
              ? errors.postCode.type === 'minLength'
              ? 'Postal Code name Length more than 2'
              : 'Postal Code name Required!'
              : ''
            }
            {...field}
            > </TextField>
  )}
           ></Controller>
         </ListItem>
         <ListItem>
         <Controller
           name="country"
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
            id="country" 
            label="Country" 
          //  inputProps={{type: 'text'}}    
            error={Boolean(errors.country)}    
            helperText={
              errors.country
              ? errors.country.type === 'minLength'
              ? 'Country name Length more than 2'
              : 'Country name Required!'
              : ''
            }
            {...field}
            > </TextField>
  )}
           ></Controller>
         </ListItem>
        
         <ListItem>
            <Button variant="contained" type="submit" fullWidth color="secondary">
               Continue
            </Button>
         </ListItem>   
       </List>
     </form>
  </Layouts>
  );
}
