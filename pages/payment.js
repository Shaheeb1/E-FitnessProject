import { FormControl, List, ListItem, Typography, RadioGroup, FormControlLabel, Radio, Button } from '@material-ui/core';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack';
import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../Utils/Store';
import useStyles from '../Utils/styles';
import CheckoutDisplay from './Components/CheckoutDisplay';
import Layouts from './Components/Layouts';

export default function Payment() {
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();
  const style = useStyles();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('');
  const { state, dispatch } = useContext(Store);
  const {
    basket:{shippingAddress},
  } = state;

    useEffect(() => {
     if(!shippingAddress.address) {
       router.push('/checkout');  
     } else {
        setPaymentMethod(Cookies.get('paymentMethod') || '');
     }
    },  []);
    const onSubmitHandler = (err) => {
      //
      closeSnackbar();
      err.preventDefault();
      if(!paymentMethod) {
        enqueueSnackbar('Payment method required', {variant:'error'});
      } else {
        dispatch({type: 'PAYMENT_SAVED', payload: paymentMethod});
        Cookies.set('PaymentMethod', paymentMethod);
        router.push('/order');
      }
     //
    };
    return (
    <Layouts title="Payment Method">
     <CheckoutDisplay activeStep={2}></CheckoutDisplay>
     <form className={style.form} onSubmit={onSubmitHandler}>
         <Typography component="h1" variant="h1">Form of Payment</Typography>
         <List>
           <ListItem>
             <FormControl component="fieldset">
               <RadioGroup 
               aria-label="Payment Method" 
               name="paymentMethod" 
               value={paymentMethod}
               onChange={(err) => setPaymentMethod(err.target.value)}>
                 <FormControlLabel 
                 label="PayPal" 
                 value="PayPal" 
                 control={<Radio/>}
                 ></FormControlLabel>
                  <FormControlLabel 
                 label="Stripe" 
                 value="Stripe" 
                 control={<Radio/>}
                 ></FormControlLabel>
                  <FormControlLabel 
                 label="Cash" 
                 value="Cash" 
                 control={<Radio/>}
                 ></FormControlLabel>
               </RadioGroup>
             </FormControl>
           </ListItem>
            <ListItem>
              <Button fullWidth type="submit" variant="contained" color="secondary">Continue</Button>
            </ListItem>
            <ListItem>
            <Button fullWidth type="button" variant="contained" onClick={()=> router.push('/checkout')}>Go Back</Button>
            </ListItem>
         </List>
     </form>
    </Layouts>
  )
}
