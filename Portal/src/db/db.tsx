import { Product, Unit, numTables } from '../utilities/types.d';

export const productsList: Product[] = [
  {
    id: '1',
    name: 'HAMBURGUESA CON PAPAS',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo, natus repudiandae aliquid quae aut inventore ad obcaecati eveniet iste rerum!',
    url: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80',
    price: '40',
  },
  {
    id: '2',
    name: 'HOT DOG CON PAPAS',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo, natus repudiandae aliquid quae aut inventore ad obcaecati eveniet iste rerum!',
    url: 'https://images.unsplash.com/photo-1619538189873-3f511db5fec6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90JTIwZG9nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    price: '25',
  },
  {
    id: '3',
    name: 'PIZZA GOURMETE',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo, natus repudiandae aliquid quae aut inventore ad obcaecati eveniet iste rerum!',
    url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    price: '150',
  },
  {
    id: '4',
    name: 'LASAÑA ITALIANA',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo, natus repudiandae aliquid quae aut inventore ad obcaecati eveniet iste rerum!',
    url: 'https://images.unsplash.com/photo-1633436374784-7f9502eb348a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fExBU0ElQzMlOTFBfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    price: '50',
  },
  {
    id: '5',
    name: 'ESPAGUETI A LA BOLOÑESA',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo, natus repudiandae aliquid quae aut inventore ad obcaecati eveniet iste rerum!',
    url: 'https://images.unsplash.com/photo-1674456720401-1557c76bf72c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    price: '50',
  },
  {
    id: '6',
    name: 'SUSHI',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo, natus repudiandae aliquid quae aut inventore ad obcaecati eveniet iste rerum!',
    url: 'https://images.unsplash.com/photo-1563612116625-3012372fccce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fFNVU0hJfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    price: '10',
  },
  {
    id: '7',
    name: 'TACOS DE BARBACOA',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo, natus repudiandae aliquid quae aut inventore ad obcaecati eveniet iste rerum!',
    url: 'https://images.unsplash.com/photo-1613514785940-daed07799d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8VEFDT1N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    price: '10',
  },
  {
    id: '8',
    name: 'CARNE ASADA',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo, natus repudiandae aliquid quae aut inventore ad obcaecati eveniet iste rerum!',
    url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Q0FSTkUlMjBBU0FEQXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    price: '10',
  },
  {
    id: '9',
    name: 'TAMALES',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo, natus repudiandae aliquid quae aut inventore ad obcaecati eveniet iste rerum!',
    url: 'https://images.unsplash.com/photo-1587569906338-f79d500d7122?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    price: '10',
  },
  {
    id: '10',
    name: 'POLLO FRITO',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo, natus repudiandae aliquid quae aut inventore ad obcaecati eveniet iste rerum!',
    url: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9sbG8lMjBmcml0b3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    price: '10',
  },
  {
    id: '11',
    name: 'ENCHILADAS SUIZAS',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo, natus repudiandae aliquid quae aut inventore ad obcaecati eveniet iste rerum!',
    url: 'https://plus.unsplash.com/premium_photo-1671547330493-b07d377085ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGVuY2hpbGFkYXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    price: '10',
  },
  {
    id: '12',
    name: 'FLAUTAS DE POLLO',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo, natus repudiandae aliquid quae aut inventore ad obcaecati eveniet iste rerum!',
    url: 'https://images.unsplash.com/photo-1679605097294-ad339b020c0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGVuY2hpbGFkYXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    price: '10',
  },
  {
    id: '13',
    name: 'ROLLOS PRIMAVERA',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo, natus repudiandae aliquid quae aut inventore ad obcaecati eveniet iste rerum!',
    url: 'https://images.unsplash.com/photo-1669340781012-ae89fbac9fc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGVuY2hpbGFkYXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    price: '10',
  },
  {
    id: '14',
    name: 'COCTEL DE CAMARON',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo, natus repudiandae aliquid quae aut inventore ad obcaecati eveniet iste rerum!',
    url: 'https://images.unsplash.com/photo-1613585535485-dc11f77335ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Q29jdGVsJTIwZGUlMjBjYW1hcm9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    price: '10',
  },
  {
    id: '15',
    name: 'ENSALADA DE FRUTAS',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo, natus repudiandae aliquid quae aut inventore ad obcaecati eveniet iste rerum!',
    url: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZW5zYWxhZGElMjBkZSUyMGZydXRhc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    price: '10',
  },
  {
    id: '16',
    name: 'WAFFLES',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo, natus repudiandae aliquid quae aut inventore ad obcaecati eveniet iste rerum!',
    url: 'https://images.unsplash.com/photo-1459789034005-ba29c5783491?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fFdBRkZMRVN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    price: '10',
  },
  {
    id: '17',
    name: 'CONO DE HELADO',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo, natus repudiandae aliquid quae aut inventore ad obcaecati eveniet iste rerum!',
    url: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8SGVsYWRvfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    price: '10',
  },
  {
    id: '18',
    name: 'BROWNIES',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo, natus repudiandae aliquid quae aut inventore ad obcaecati eveniet iste rerum!',
    url: 'https://images.unsplash.com/photo-1612886623532-1802833fcc67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJyb3duaWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    price: '10',
  },
];

export const unitsList: Unit[] = [
  {
    unitiName: 'Papas a la francesa',
    amount: 0,
  },
  {
    unitiName: 'Carne de hamburguesa',
    amount: 3,
  },
  {
    unitiName: 'Lechuga',
    amount: 3,
  },
  {
    unitiName: 'Jitomate',
    amount: 4,
  },
  {
    unitiName: 'Cebolla morada',
    amount: 6,
  },
  {
    unitiName: 'Pepinillos',
    amount: 18,
  },
  {
    unitiName: 'Queso amarillo',
    amount: 7,
  },
  {
    unitiName: 'Tosino',
    amount: 12,
  },
  {
    unitiName: 'Queso asadero',
    amount: 8,
  },
  {
    unitiName: 'Carne molida',
    amount: 4,
  },
  {
    unitiName: 'Pasta para lasaña',
    amount: 7,
  },
  {
    unitiName: 'Queso fresco',
    amount: 9,
  },
  {
    unitiName: 'Pasta para espagueti',
    amount: 13,
  },
  {
    unitiName: 'Pure de tomate',
    amount: 12,
  },
  {
    unitiName: 'Tortillas',
    amount: 6,
  },
  {
    unitiName: 'Aguacate',
    amount: 4,
  },
  {
    unitiName: 'Huevo',
    amount: 7,
  },
  {
    unitiName: 'Lechuga Italiana',
    amount: 4,
  },
  {
    unitiName: 'Salchichon para hot dog',
    amount: 12,
  },
  {
    unitiName: 'Cebolla blanca',
    amount: 12,
  },
  {
    unitiName: 'Crema agria',
    amount: 7,
  },
  {
    unitiName: 'Maza para tamales',
    amount: 8,
  },
  {
    unitiName: 'Cosido de puerco',
    amount: 7,
  },
  {
    unitiName: 'Maza para pizza',
    amount: 7,
  },
  {
    unitiName: 'Limones',
    amount: 4,
  },
  {
    unitiName: 'Tomates cherry',
    amount: 6,
  },
  {
    unitiName: 'Bisteck para tacos',
    amount: 9,
  },
  {
    unitiName: 'Chorizo para tacos',
    amount: 13,
  },
  {
    unitiName: 'Pastor para tacos',
    amount: 10,
  },
  {
    unitiName: 'Cilantro',
    amount: 7,
  },
  {
    unitiName: 'Salsa roja',
    amount: 5,
  },
  {
    unitiName: 'Salsa verde',
    amount: 5,
  },
];

export const nTables: numTables[] = [
  {
    area: 'Terraza',
    numTables: '5',
  },
  {
    area: 'Interior',
    numTables: '10',
  },
  {
    area: 'Exterior',
    numTables: '3',
  },
  {
    area: 'jardin',
    numTables: '7',
  },
];
