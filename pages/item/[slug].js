import React, { useContext } from 'react';
//import { useRouter } from 'next/router';
import Image from 'next/image';
import NextLink from 'next/link';
import {Grid, Link, List, ListItem, Typography, Card, Button} from '@material-ui/core';
//import data from '../../Utils/data';
import Layouts from '../Components/Layouts';
import useStyles from '../../Utils/styles';
import Item from '../../models/Item';
import database from '../../Utils/database';
import { Store } from '../../Utils/Store';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function ItemPage(props) {
  const router = useRouter();
  const {state, dispatch} = useContext(Store);
  const {item} = props;

  const classes = useStyles();
  //const router = useRouter();
 // const {slug} = router.query;
  //const item = data.items.find(a => a.slug === slug);
  if(!item) {
    return <div>Item Not Found!</div>
  }
  const addToBasketHandler = async () => {
    const itemAvailable = state.basket.basketItems.find(x=>x._id === item._id);
    const quantity = itemAvailable? itemAvailable.quantity + 1 : 1;
    const { data } = await axios.get(`/api/items/${item._id}`);
    if(data.countStock < quantity) {
      window.alert('Product not in stock!');
      return;
    }
    dispatch({type: 'BASKET_ADD_ITEM', payload: {...item, quantity}});
    router.push('/basket');
  };
  return (
    <Layouts title={item.name} description={item.description}>
       <div className={classes.s}>
         <NextLink href="/" passHref>
           <Link>
           <Typography> Back to Products</Typography>
          </Link>
         </NextLink>
       </div>

      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
           <Image src={item.image} 
          alt={item.name}
          width={640} 
          height={780}
          layout="responsive">
          </Image>
        </Grid>
        <Grid item md ={3} xs={12}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">{item.name}</Typography>          
            </ListItem>
            <ListItem>
              <Typography>Category: {item.category}</Typography>
              
            </ListItem>
            <ListItem>
            <Typography> Brand: {item.brand}</Typography>
             
            </ListItem>
            <ListItem>
            <Typography>Rating: {item.rating} stars ({item.reviews} reviews)</Typography>
              
            </ListItem>
            <ListItem>
             <Typography>Description: {item.description}
              
              </Typography> 
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
             <List>
               <ListItem>
                 <Grid container>
                 <Grid item xs={6}><Typography>Price</Typography> </Grid>
                 <Grid item xs={6}><Typography>£{item.price}</Typography></Grid>
                 </Grid>
               </ListItem>
               <ListItem>
                 <Grid container>
                 <Grid item xs={6}><Typography>Status</Typography> </Grid>
                 <Grid item xs={6}><Typography>{item.countStock>0?'In Stock': 'Out of Stock'}</Typography></Grid>
                 </Grid>
               </ListItem>
              <ListItem>
                <Button fullWidth variant = "contained" color="primary"
                onClick={addToBasketHandler}
                >
                  Add to Basket
                </Button>
              </ListItem>
             </List>
          </Card>
        </Grid>
      </Grid>
    </Layouts>
  );
}

export async function getServerSideProps(context) {
  const {params} = context;
  const {slug} = params;

  await database.connect();
  const item = await Item.findOne({slug}).lean();
  await database.disconnect();
  return {
    props: {
      item: database.convertDocToObj(item),
    },
  };
}