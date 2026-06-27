function valRequerido(valor){ return valor && valor.trim().length > 0; }
function valMax(valor, max){ return valor.trim().length <= max; }
function valMin(valor, min){ return valor.trim().length >= min; }
function valRango(valor, min, max){ return valor.trim().length >= min && valor.trim().length <= max; }

function valEmail(valor){
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(valor.trim());
}

function valEmailPermitido(valor){
  var permitidos = ['@inacap.cl', '@inacapmail.cl', '@gmail.com', '@profesor.inacap.cl'];
  var v = valor.trim().toLowerCase();
  return permitidos.some(function(d){ return v.endsWith(d); });
}

function valRUN(run){
  run = run.trim().replace(/\./g,'').replace(/-/g,'');
  if(run.length < 7 || run.length > 9) return false;
  var cuerpo = run.slice(0, -1);
  var dv = run.slice(-1).toUpperCase();
  var suma = 0;
  var multiplicador = 2;
  for(var i = cuerpo.length - 1; i >= 0; i--){
    suma += parseInt(cuerpo.charAt(i)) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }
  var resto = suma % 11;
  var dvEsperado = 11 - resto;
  if(dvEsperado === 11) dvEsperado = '0';
  else if(dvEsperado === 10) dvEsperado = 'K';
  else dvEsperado = dvEsperado.toString();
  return dv === dvEsperado;
}

function valSoloNumeros(valor){ return /^\d+$/.test(valor.trim()); }
function valDecimal(valor){ return /^\d+(\.\d+)?$/.test(valor.trim()); }
function valSelect(valor){ return valor && valor !== ''; }

function mostrarError(id, msg){
  var el = document.getElementById(id);
  if(el){ el.textContent = msg; }
}

function limpiarErrores(){
  document.querySelectorAll('.form-error').forEach(function(e){ e.textContent = ''; });
  document.querySelectorAll('.form-control.error').forEach(function(e){ e.classList.remove('error'); });
}

function validarFormulario(config){
  limpiarErrores();
  var valido = true;
  config.forEach(function(campo){
    var valor = document.getElementById(campo.id) ? document.getElementById(campo.id).value : '';
    var error = '';
    if(campo.requerido && !valRequerido(valor)) error = 'Este campo es requerido.';
    else if(campo.max && !valMax(valor, campo.max)) error = 'Máximo '+campo.max+' caracteres.';
    else if(campo.min && !valMin(valor, campo.min)) error = 'Mínimo '+campo.min+' caracteres.';
    else if(campo.rango && !valRango(valor, campo.rango[0], campo.rango[1])) error = 'Entre '+campo.rango[0]+' y '+campo.rango[1]+' caracteres.';
    else if(campo.email && !valEmail(valor)) error = 'Correo no válido.';
    else if(campo.emailPermitido && !valEmailPermitido(valor)) error = 'Solo correos @inacap.cl, @inacapmail.cl, @gmail.com.';
    else if(campo.run && !valRUN(valor)) error = 'RUN inválido.';
    else if(campo.soloNumeros && !valSoloNumeros(valor)) error = 'Solo números enteros.';
    else if(campo.decimal && !valDecimal(valor)) error = 'Ingrese un número válido.';
    else if(campo.select && !valSelect(valor)) error = 'Seleccione una opción.';

    if(error){
      valido = false;
      mostrarError(campo.id+'-error', error);
      var el = document.getElementById(campo.id);
      if(el) el.classList.add('error');
    }
  });
  return valido;
}
