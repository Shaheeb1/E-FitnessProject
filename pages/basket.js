import { Grid, Table, TableBody, TableCell, Link, TableContainer, TableHead, TableRow, Typography, Select, MenuItem, Button, Card, ListItem, List, } from '@material-ui/core';
import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import { Store } from '../Utils/Store';
import Layouts from './Components/Layouts';
import NextLink from 'next/link';
import Image from 'next/Image';
import axios from 'axios';
import  { useRouter } from 'next/router';

 function BasketScreen() {
  const router = useRouter();
  const {state, dispatch} = useContext(Store);
  const {basket: {basketItems}} = state;
  const updateBasketHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/items/${item._id}`);
    if(data.countStock < quantity) {
      window.alert('Product not in stock!');
      return;
    }
    dispatch({type: 'BASKET_ADD_ITEM', payload: {...item, quantity}});

  };
  const removeItemHandler = (item) => {
    dispatch({type:'BASKET_REMOVE_ITEM', payload: item});
  };
  const processOrderHandler = () => {
    router.push('/checkout');
  }
  return <Layouts title="Shopping Basket">
        <Typography component="h1" variant="h1"> Shopping Basket </Typography>
          {basketItems.length === 0 ? (
          <div>
            Basket is Empty. <NextLink href="/" passHref> 
            <Link>Go Shopping</Link>
             </NextLink>
          </div>
          ):
          (
            <Grid container spacing ={1}>
              <Grid item md={9} xs={12}>
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
                               Quantity 
                              </TableCell>
                              <TableCell align="right">
                                Cost
                              </TableCell>
                              <TableCell align="right">
                                 Remove
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
                                <Select value={item.quantity} onChange={(e)=>updateBasketHandler(item, e.target.value)}>
                                  {[...Array(item.countStock).keys()].map((x) => (
                                  <MenuItem key={x + 1} value= {x + 1}> 
                                  {x + 1} </MenuItem>
                                  ))}
                                </Select>
                                </TableCell>

                                <TableCell align="right">
                                   £{item.price}
                                </TableCell>
                                <TableCell align="right"> 
                                    <Button variant="contained" color="secondary" onClick={()=> removeItemHandler(item)}> 
                                    X </Button>
                                </TableCell>

                           </TableRow>
                         ))}
                       </TableBody>

                    </Table>
                 </TableContainer>
                </Grid>
                <Grid item md={3} xs={12}>
                 <Card>
                   <List>
                      <ListItem >
                          <Typography variant="h1">
                            Subtotal ({basketItems.reduce((x,y) => x + y.quantity, 0)}{' '}
                            items) : £
                            {basketItems.reduce((x,y) => x + y.quantity * y.price, 0)}
                          </Typography>
                      </ListItem>
                      <ListItem>
                        <Button onClick={processOrderHandler} variant="contained" color="primary" fullWidth> Check Out
                        </Button>
                      </ListItem>
                   </List>
                 </Card>
                </Grid>
                </Grid>
            
          )}
  </Layouts>
    
  
}

export default dynamic(() => Promise.resolve(BasketScreen), {ssr: false});