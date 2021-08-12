import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Joe',
      email: 'JoeAdmin@gmail.com',
      password: bcrypt.hashSync('password123'),
      admin: true,
  },
  {
    name: 'Stan',
    email: 'StanUser@gmail.com',
    password: bcrypt.hashSync('password123'),
    admin: false,
},

  
],
items: [
{
   name: 'Reebok ZR8 Treadmill',
   slug: 'reebok-zr8-treadmill',
   category: 'Treadmill',
   image: '/img/item1.jpg',
   price: 650,
   brand: 'Reebok',
   rating: 4.5,
   reviews: 10,
   countStock: 20,
   description: 'Great quality treadmill to lose weight',
},

{
  name: 'NordicTrack 2950 Treadmill',
  slug: 'nordictrack-2950-treadmill',
  category: 'Treadmill',
  image: '/img/item2.jpg',
  price: 950,
  brand: 'NordiTrack',
  rating: 4,
  reviews: 12,
  countStock: 13,
  description: 'Great quality treadmill to lose weight',
},

{
  name: 'Horizon 7.4AT Folding Treadmill',
  slug: 'horizon-7.4at-folding-treadmill',
  category: 'Treadmill',
  image: '/img/item3.jpg',
  price: 800,
  brand: 'Horizon 7.4AT',
  rating: 3.5,
  reviews: 13,
  countStock: 6,
  description: 'Great quality treadmill to lose weight',
},

{
  name: 'Rogue Hexagon dumbells 25kg',
  slug: 'rogue-hexagon-dumbells-25kg',
  category: 'Treadmill',
  image: '/img/item4.jpg',
  price: 50,
  brand: 'Rogue',
  rating: 3.5,
  reviews: 5,
  countStock: 11,
  description: 'Great quality treadmill to lose weight',
},

{
  name: 'Opti - 15kg Dumbells',
  slug: 'opti-15kg-dumbells',
  category: 'Dumbells',
  image: '/img/item5.jpg',
  price: 35,
  brand: 'Opti',
  rating: 4.5,
  reviews: 8,
  countStock: 13,
  description: 'Great quality treadmill to lose weight',
},

{
  name: 'Bowlflex 2-24kg',
  slug: 'bowlflex-2-24kg',
  category: 'Dumbells',
  image: '/img/item6.jpg',
  price: 40,
  brand: 'Bowlflex',
  rating: 4,
  reviews: 6,
  countStock: 5,
  description: 'Great quality treadmill to lose weight',
},

],

};

export default data;