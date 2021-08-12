import { Grid, Table, TableBody, TableCell, Link, TableContainer, TableHead, TableRow, Typography, Button, Card, ListItem, List, CircularProgress  } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Store } from '../Utils/Store';
import Layouts from './Components/Layouts';
import NextLink from 'next/link';
import Image from 'next/Image';
import axios from 'axios';
import  { useRouter } from 'next/router';
import useStyles from '../Utils/styles';
import CheckoutDisplay from './Components/CheckoutDisplay';
import { useSnackbar } from 'notistack';
import { getError } from '../Utils/errors';
import Cookies from 'js-cookie';

 function Order() {
  const router = useRouter();
  const style = useStyles();
  const {state, dispatch} = useContext(Store);
  const {
    userInformation,
    basket: {basketItems, shippingAddress, paymentMethod}} = state;
  const roundUp = n => Math.round(n*100)/ 100; // 123.456 => 123.46
  const itemPrice = roundUp(basketItems.reduce((a, c) => a + c.price * c.quantity, 0));
  const shipPrice = itemPrice > 200? 0: 15;
  const totPrice = roundUp(itemPrice + shipPrice);

  useEffect(() => {
    if(!paymentMethod) {
       router.push('/payment');
       if(basketItems.length === 0) {
         router.push('/basket');
       }
     }
   
     }, []);
     const {closeSnackbar, enqueueSnackbar } = useSnackbar();
     const [loading, setLoading] = useState(false);
     const orderHandler = async () => {
       closeSnackbar();
       try {
        setLoading(true);
        const {data} = await axios.post(
          '/api/details', 
          {
          orderItems: basketItems,
          shippingAddress,
          paymentMethod,
          itemPrice,
          shipPrice,
          totPrice
        }, {
          headers: {
            authorization: `Bearer ${userInformation.token}`,
          },
        }
        );
        dispatch({type: 'BASKET_CLEAR'});
        Cookies.remove('basketItems');
        setLoading(false);
        router.push(`/details/${data._id}`);
       } catch(e) {
        setLoading(false);
        enqueueSnackbar(getError(e), {variant: 'error'});
       }
     };

  return <Layouts title="Place Order">
      <CheckoutDisplay activeStep={3}></CheckoutDisplay>
        <Typography component="h1" variant="h1"> Place Order </Typography>
          
            <Grid container spacing ={1}>
              <Grid item md={9} xs={12}>
              <Card className={style.section}>
                  <List>
                    <ListItem>
                      <Typography component="h2" variant="h2">
                        Shipping Address
                      </Typography>
                    </ListItem>
                    <ListItem>
                {shippingAddress.fullName}, {shippingAddress.address},{' '}
                {shippingAddress.city}, {shippingAddress.postCode},{' '}
                {shippingAddress.country}
                      </ListItem>
                      </List>
                      </Card>
                      <Card className={style.section}>
                  <List>
                    <ListItem>
                      <Typography component="h2" variant="h2">
                        Form of Payment
                      </Typography>
                    </ListItem>
                    <ListItem>
                    <strong>{paymentMethod}</strong> 
                      </ListItem>
                      </List>
                      </Card>
                <Card className={style.section}>
                  <List>
                    <ListItem>
                      <Typography component="h2" variant="h2">
                        Order Up

                      </Typography>
                    </ListItem>
                    <ListItem>
                       <TableContainer>
                    <Table>
                       <TableHead>
                          <TableRow>
                              <TableCell>
                                 Image
                              </TableCell>
                              <TableCell>
                                 Title
                              </TableCell>
                              <TableCell align="right">
                                Cost   
                              </TableCell>
                              <TableCell align="right">
                                Quantity
                              </TableCell>
                             
                          </TableRow>
                       </TableHead>
                       <TableBody>
                         {basketItems.map((item) => (
                           <TableRow key={item._id}>
                             <TableCell>
                               <NextLink href={`/item/${item.slug}`} passHref>
                                 <Link>
                                 <Image src={item.image} 
                                 alt={item.name} 
                                 width={60} 
                                 height={60}>
                                   </Image>
                                   </Link>
                               </NextLink>
                             </TableCell>

                             <TableCell>
                               <NextLink href={`/item/${item.slug}`} passHref>
                                 <Link>
                                 <Typography>
                                   {item.name}
                                 </Typography>
                                   </Link>
                               </NextLink>
                             </TableCell>
                              <TableCell align="right">
                                <Typography>
                                   {item.quantity}
                                </Typography>
                                </TableCell>

                                <TableCell align="right">
                                   <Typography>£{item.price}</Typography>
                                </TableCell>
                          
                           </TableRow>
                         ))}
                       </TableBody>

                    </Table>
                 </TableContainer>
                    </ListItem>
                  </List>
                 
                </Card>
                 
                </Grid>
                <Grid item md={3} xs={12}>
                  
                 <Card className={style.section}>
                   <List>
                      <ListItem >
                          <Typography variant="h1">
                            Order Summary
                          </Typography>
                      </ListItem>
                      <ListItem>
                        <Grid container>
                          <Grid item xs={6}>
                          <Typography>Products:</Typography>
                          </Grid>
                          <Grid item xs={6}>
                             <Typography align="right"> £{itemPrice}</Typography>
                          </Grid>
                        </Grid> 
                      </ListItem>
                      <ListItem>
                        <Grid container>
                          <Grid item xs={6}>
                          <Typography>Shipping fee:</Typography>
                          </Grid>
                          <Grid item xs={6}>
                             <Typography align="right"> £{shipPrice}</Typography>
                          </Grid>
                        </Grid> 
                      </ListItem>
                      <ListItem>
                        <Grid container>
                          <Grid item xs={6}>
                          <Typography><strong>Total Price:</strong></Typography>
                          </Grid>
                          <Grid item xs={6}>
                             <Typography align="right"><strong> £{totPrice}</strong></Typography>
                          </Grid>
                        </Grid> 
                      </ListItem>
                      <ListItem>
                        <Button onClick={orderHandler} variant="contained" color="primary" fullWidth> Place Order
                        </Button>
                      </ListItem>
                      {loading && (<ListItem>
                        <CircularProgress /></ListItem>
                      )}
                   </List>
                 </Card>
                </Grid>
                </Grid>
            
          
  </Layouts>
    
  
}

export default dynamic(() => Promise.resolve(Order), {ssr: false});