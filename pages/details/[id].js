import { Grid, Table, TableBody, TableCell, Link, TableContainer, TableHead, TableRow, Typography, Button, Card, ListItem, List, CircularProgress  } from '@material-ui/core';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import dynamic from 'next/dynamic';
import { Store } from '../../Utils/Store';
import Layouts from '../../Components/Layouts';
import NextLink from 'next/link';
import Image from 'next/Image';
import axios from 'axios';
import  { useRouter } from 'next/router';
import useStyles from '../../Utils/styles';
import CheckoutDisplay from '../../Components/CheckoutDisplay';
import { getError } from '../../Utils/errors';

function reducer(state, action) {
  switch(action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

 function Details({params}) {
   const orderId = params.id;
  const router = useRouter();
  const style = useStyles();
  const {state} = useContext(Store);
  const {
    userInformation,

   } = state;
  
  const [{loading, error, order}, dispatch] = useReducer(reducer, {
    loading: true, 
    order: {}, 
    error: '',
  });
  const {
    shippingAddress,
     paymentMethod,
      orderItems,
       itemPrice, 
       shipPrice, 
       totPrice,
       isPaid,
       paidAt,
       delivered,
       deliveredAt,

      } = order;

  useEffect(() => {
     if(!userInformation) {
       return router.push('/login');
     }
     const fetchOrder = async () => {
       try {
       dispatch({type: 'FETCH_REQUET'});
       const {data} = await axios.get(`{api/details/${orderId}`, {
         headers: {authorization: `Bearer ${userInformation.token}`},
       });
       dispatch({type: 'FETCH_SUCCESS', payload: data});
       } catch(err) {
         dispatch ({type: 'FETCH_FAIL', payload:getError(err)});
       }
     };
     if(!order._id || (order._id && order._id !== orderId)) {
     fetchOrder();
     }

     }, [order]);
     
    
     

  return <Layouts title={`Order ${orderId}`}>
      <CheckoutDisplay activeStep={3}></CheckoutDisplay>
        <Typography component="h1" variant="h1"> Order {orderId} </Typography>
          {loading ? (<CircularProgress/>)
          : error?  <Typography className={style.error}>{error}</Typography>
        :<Grid container spacing ={1}>
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
                      <ListItem>
                      Status:{' '}
                  {delivered
                    ? `delivered at ${deliveredAt}`
                    : 'not delivered'}
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
                      <ListItem>
                      Status: {isPaid ? `paid at ${paidAt}` : 'not paid'}
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
                         {orderItems.map((item) => (
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
                      
                   </List>
                 </Card>
                </Grid>
                </Grid>
            
        }
            
          
  </Layouts>
    
  
}
export async function getServerSideProps({params}) {
  return {props:{params}};
}
export default dynamic(() => Promise.resolve(Details), {ssr: false});