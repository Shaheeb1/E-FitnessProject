import { 
     Grid,
     Card,
     CardActionArea,
     CardMedia, 
     CardContent, 
     Typography,
     CardActions,
     Button,
    } from '@material-ui/core';
import NextLink from 'next/link';
import Layouts from './Components/Layouts';
//import data from '../Utils/data';
import database from '../Utils/database';
import Item from '../models/Item';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { Store } from '../Utils/Store';

export default function Home(props) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {items} = props;
  const addToBasketHandler = async (item) => {
  const itemAvailable = state.basket.basketItems.find((x)=>x._id === item._id);
  const quantity = itemAvailable ? itemAvailable.quantity + 1 : 1;
  const { data } = await axios.get(`/api/items/${item._id}`);
    if(data.countStock < quantity) {
      window.alert('Product not in stock!');
      return;
    }
    dispatch({type: 'BASKET_ADD_ITEM', payload: {...item, quantity}});
    router.push('/basket');
  };
  return (
    <Layouts>
      <div>
      <h1> Popular Products
       </h1>
       <Grid container spacing={3}>
         {items.map((item) => (
           <Grid item md={4} key={item.name}> 
              <Card> 
                <NextLink href ={`/item/${item.slug}`} passHref>
                <CardActionArea>
                  <CardMedia component="img" 
                  image = {item.image} 
                  title={item.name}>

                  </CardMedia>
                   <CardContent>
                     <Typography>
                       {item.name}
                     </Typography>
                   </CardContent>

                </CardActionArea>
                </NextLink>
                <CardActions>
                  <Typography>
                     £{item.price}
                  </Typography>
                  <Button size ="small" color="secondary" onClick={()=>addToBasketHandler(item)}>
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
           </Grid>
         ))}
       </Grid>
    </div>
    </Layouts>
    
  );
}

export async function getServerSideProps() {
  await database.connect();
  const items = await Item.find({}).lean();
  await database.disconnect();
  return {
    props: {
      items: items.map(database.convertDocToObj),
    },
  };
}