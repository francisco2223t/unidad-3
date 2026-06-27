function getCart(){ return JSON.parse(localStorage.getItem('ms_carrito')) || []; }
function saveCart(c){ localStorage.setItem('ms_carrito', JSON.stringify(c)); }
function getCartCount(){ return getCart().reduce(function(s,i){ return s+i.cantidad; }, 0); }

function updateCartBadge(){
  document.querySelectorAll('.cart-badge').forEach(function(el){
    var c = getCartCount();
    el.textContent = c;
    el.style.display = c > 0 ? '' : 'none';
  });
}

function addToCart(codigo, cantidad, mensaje){
  cantidad = cantidad || 1;
  mensaje = mensaje || '';
  var cart = getCart();
  var exist = cart.find(function(i){ return i.codigo === codigo && i.mensaje === mensaje; });
  if(exist) exist.cantidad += cantidad;
  else cart.push({ codigo: codigo, cantidad: cantidad, mensaje: mensaje });
  saveCart(cart);
  updateCartBadge();
  mostrarToast('Producto agregado al carrito');
}

function removeFromCart(index){
  var cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  updateCartBadge();
  renderCart();
}

function updateQty(index, delta){
  var cart = getCart();
  cart[index].cantidad += delta;
  if(cart[index].cantidad <= 0) cart.splice(index, 1);
  saveCart(cart);
  updateCartBadge();
  renderCart();
}

function clearCart(){
  saveCart([]);
  updateCartBadge();
  renderCart();
}

function getProductByCode(codigo){
  var prods = typeof getProducts === 'function' ? getProducts() : (typeof catalogoProductos !== 'undefined' ? catalogoProductos : []);
  return prods.find(function(p){ return p.codigo === codigo; });
}

function renderCart(){
  var cont = document.getElementById('cartContent');
  var summary = document.getElementById('cartSummary');
  if(!cont) return;
  var cart = getCart();
  if(!cart.length){
    cont.innerHTML = '<p class="cart-empty">Tu carrito está vacío.</p>';
    if(summary) summary.style.display = 'none';
    return;
  }
  var total = 0;
  cont.innerHTML = cart.map(function(item, i){
    var p = getProductByCode(item.codigo);
    if(!p) return '';
    var sub = p.precio * item.cantidad;
    total += sub;
    return '<div class="cart-item">'+
      '<img src="'+imgPath(p.imagen)+'" alt="'+p.nombre+'">'+
      '<div class="cart-item-info">'+
        '<h4>'+p.nombre+'</h4>'+
        '<p>'+formatPrice(p.precio)+' c/u'+(item.mensaje ? ' - "'+item.mensaje+'"' : '')+'</p>'+
      '</div>'+
      '<div class="cart-qty">'+
        '<button onclick="updateQty('+i+',-1)">-</button>'+
        '<span>'+item.cantidad+'</span>'+
        '<button onclick="updateQty('+i+',1)">+</button>'+
      '</div>'+
      '<strong>'+formatPrice(sub)+'</strong>'+
      '<button onclick="removeFromCart('+i+')" style="background:none;border:none;cursor:pointer;font-size:1.2rem;color:var(--text-secondary)">&times;</button>'+
    '</div>';
  }).join('');
  if(summary){
    summary.style.display = '';
    summary.innerHTML = '<div class="cart-total">Total: <strong>'+formatPrice(total)+'</strong></div>'+
      '<div style="text-align:right;margin-top:12px">'+
        '<button class="btn" onclick="window.location.href=\'checkout.html\'">Proceder al pago</button> '+
        '<button class="btn btn-secondary" onclick="clearCart()">Vaciar carrito</button>'+
      '</div>';
  }
}

function formatPrice(n){ return '$'+n.toLocaleString('es-CL')+' CLP'; }

function mostrarToast(msg){
  var t = document.getElementById('toast');
  if(!t){
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(function(){ t.classList.remove('show'); }, 2800);
}

function actualizarMenuUsuario(){
  var user = JSON.parse(localStorage.getItem('ms_usuario_actual'));
  var ingLink = document.querySelector('.nav a[href="login.html"]');
  if(!ingLink) return;
  if(!user){
    ingLink.textContent = 'Ingresar';
    ingLink.href = 'login.html';
    return;
  }
  var panelLink = '';
  if(user.tipo === 'Administrador' || user.tipo === 'Vendedor') panelLink = '<a href="admin/index.html">Panel Admin</a>';
  ingLink.outerHTML =
    '<span style="position:relative;display:inline-block" class="user-menu">'+
      '<a href="#" onclick="event.preventDefault();this.nextElementSibling.classList.toggle(\'show\')" style="font-weight:700">&#128100; '+user.nombre+'</a>'+
      '<div style="display:none;position:absolute;top:100%;right:0;background:var(--surface);border-radius:10px;box-shadow:var(--shadow);min-width:180px;z-index:200;padding:8px 0" class="user-dropdown">'+
        '<a href="perfil.html" style="display:block;padding:8px 16px;font-size:.85rem">&#128100; Mi Perfil</a>'+
        panelLink+
        '<a href="#" onclick="event.preventDefault();localStorage.removeItem(\'ms_usuario_actual\');window.location.href=\'login.html\'" style="display:block;padding:8px 16px;font-size:.85rem;color:#c0392b">&#128682; Cerrar Sesi&#243;n</a>'+
      '</div>'+
    '</span>';
  document.addEventListener('click', function(e){
    if(!e.target.closest('.user-menu')){
      document.querySelectorAll('.user-dropdown.show').forEach(function(d){ d.classList.remove('show'); });
    }
  });
}

document.addEventListener('DOMContentLoaded', function(){
  updateCartBadge();
  renderCart();
  actualizarMenuUsuario();
});
