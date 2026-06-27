var catalogoProductos = [
  { codigo: "TC001", categoria: "Tortas Cuadradas", nombre: "Torta Cuadrada de Chocolate", precio: 45000, descripcion: "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas.", stock: 10, stockCritico: 2, imagen: "torta-chocolate.jpg" },
  { codigo: "TC002", categoria: "Tortas Cuadradas", nombre: "Torta Cuadrada de Frutas", precio: 50000, descripcion: "Mezcla de frutas frescas y crema chantilly sobre bizcocho de vainilla.", stock: 8, stockCritico: 2, imagen: "torta-frutas.jpg" },
  { codigo: "TT001", categoria: "Tortas Circulares", nombre: "Torta Circular de Vainilla", precio: 40000, descripcion: "Bizcocho de vainilla relleno con crema pastelera y glaseado dulce.", stock: 12, stockCritico: 3, imagen: "torta-vainilla.jpg" },
  { codigo: "TT002", categoria: "Tortas Circulares", nombre: "Torta Circular de Manjar", precio: 42000, descripcion: "Torta tradicional chilena con manjar y nueces.", stock: 6, stockCritico: 2, imagen: "torta-manjar.jpg" },
  { codigo: "PI001", categoria: "Postres Individuales", nombre: "Mousse de Chocolate", precio: 5000, descripcion: "Postre cremoso y suave, hecho con chocolate de alta calidad.", stock: 25, stockCritico: 5, imagen: "mousse.jpg" },
  { codigo: "PI002", categoria: "Postres Individuales", nombre: "Tiramisú Clásico", precio: 5500, descripcion: "Postre italiano con capas de café, mascarpone y cacao.", stock: 20, stockCritico: 4, imagen: "tiramisu.jpg" },
  { codigo: "PSA001", categoria: "Productos Sin Azúcar", nombre: "Torta Sin Azúcar de Naranja", precio: 48000, descripcion: "Torta ligera endulzada naturalmente.", stock: 5, stockCritico: 1, imagen: "torta-naranja.jpg" },
  { codigo: "PSA002", categoria: "Productos Sin Azúcar", nombre: "Cheesecake Sin Azúcar", precio: 47000, descripcion: "Cheesecake suave y cremoso sin azúcar.", stock: 4, stockCritico: 1, imagen: "cheesecake.jpg" },
  { codigo: "PT001", categoria: "Pastelería Tradicional", nombre: "Empanada de Manzana", precio: 3000, descripcion: "Pastelería rellena de manzanas especiadas.", stock: 30, stockCritico: 5, imagen: "pan-artesanal.jpg" },
  { codigo: "PT002", categoria: "Pastelería Tradicional", nombre: "Tarta de Santiago", precio: 6000, descripcion: "Tarta española de almendras.", stock: 15, stockCritico: 3, imagen: "tarta-santiago.jpg" },
  { codigo: "PG001", categoria: "Productos Sin Gluten", nombre: "Brownie Sin Gluten", precio: 4000, descripcion: "Brownie denso y rico, sin gluten.", stock: 18, stockCritico: 3, imagen: "brownie.jpg" },
  { codigo: "PG002", categoria: "Productos Sin Gluten", nombre: "Pan Sin Gluten", precio: 3500, descripcion: "Pan suave y esponjoso sin gluten.", stock: 10, stockCritico: 2, imagen: "pan-gluten.jpg" },
  { codigo: "PV001", categoria: "Productos Vegana", nombre: "Torta Vegana de Chocolate", precio: 50000, descripcion: "Torta de chocolate húmeda, sin productos animales.", stock: 7, stockCritico: 2, imagen: "torta-vegana.jpg" },
  { codigo: "PV002", categoria: "Productos Vegana", nombre: "Galletas Veganas de Avena", precio: 4500, descripcion: "Galletas crujientes y saludables, veganas.", stock: 22, stockCritico: 4, imagen: "galletas-veganas.jpg" },
  { codigo: "TE001", categoria: "Tortas Especiales", nombre: "Torta Especial de Cumpleaños", precio: 55000, descripcion: "Personalizable con decoraciones y mensajes únicos.", stock: 3, stockCritico: 1, imagen: "torta-especial.jpg" },
  { codigo: "TE002", categoria: "Tortas Especiales", nombre: "Torta Especial de Boda", precio: 60000, descripcion: "Elegante torta para bodas.", stock: 2, stockCritico: 1, imagen: "torta-boda.jpg" }
];

function getProducts(){ return JSON.parse(localStorage.getItem('ms_productos')) || catalogoProductos; }
function saveProducts(p){ localStorage.setItem('ms_productos', JSON.stringify(p)); }
function imgPath(img){ return img ? 'src/assets/mil-sabores/'+img : ''; }
