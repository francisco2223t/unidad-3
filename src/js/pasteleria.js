document.addEventListener('DOMContentLoaded',function(){
	var form=document.getElementById('order-form');
	var confirmation=document.getElementById('order-confirmation');

	form.querySelectorAll('input,select,textarea').forEach(function(el){
		el.addEventListener('blur',function(){
			if(this.value.trim()!==''){
				this.style.borderColor='rgba(201,154,107,0.5)';
			}
		});
		el.addEventListener('focus',function(){
			this.style.borderColor='';
		});
	});

	form.addEventListener('submit',function(e){
		e.preventDefault();

		var nombre=document.getElementById('nombre').value.trim();
		var correo=document.getElementById('correo').value.trim();
		var telefono=document.getElementById('telefono').value.trim();
		var producto=document.getElementById('producto').value;
		var fecha=document.getElementById('fecha').value;
		var detalles=document.getElementById('detalles').value.trim();

		if(!nombre||!correo||!telefono||!producto||!fecha||!detalles){
			alert('Por favor completa todos los campos.');
			return;
		}

		if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)){
			alert('Ingresa un correo electrónico válido.');
			return;
		}

		var productoLabel=producto==='personalizado'?'Pedido Personalizado':producto;

		form.classList.add('hidden');
		confirmation.classList.remove('hidden');
		confirmation.innerHTML='&#127856; ¡Pedido recibido!<br><br>'+
			'<strong>Cliente:</strong> '+nombre+'<br>'+
			'<strong>Producto:</strong> '+productoLabel.replace(/-/g,' ').replace(/\b\w/g,function(l){return l.toUpperCase()})+'<br>'+
			'<strong>Fecha:</strong> '+fecha+'<br>'+
			'<strong>Detalles:</strong> '+detalles+'<br><br>'+
			'Te contactaremos pronto para confirmar tu pedido. &#128522;';
	});
});
