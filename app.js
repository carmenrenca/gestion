// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyCz-6cHppdhMsK2hEhVhiLqTgwiQfnPSWc",
      authDomain: "gestion-factura.firebaseapp.com",
 projectId: "gestion-factura"
});

var db = firebase.firestore();
//agregar usuario
function guardarcliente(){


var nombre = document.getElementById('nombre').value;
var apellido = document.getElementById('apellido').value;
var direccion = document.getElementById('direccion').value;
var telefono = document.getElementById('telefono').value;
var email = document.getElementById('email').value;
var fecha = document.getElementById('fecha').value;
var dni= document.getElementById('dni').value;
if(nombre==""){
	alert("Tienes que poner un nombre");
	return false;
}else if(apellido.length==""){
	alert("Tienes que poner un apellido");
	return false;
}else if(direccion.lenght==""){
	alert("Tienes que poner una direccion");
	return false;

}else if(email.lenght==""){
	alert("Tienes que poner un email");
	return false;
}else if(fecha.lenght==""){
	alert("Tienes que poner una direccion");
	return false;
}else if(dni.lenght=="" ){
	alert("Tienes que poner un DNI correcto	");
	return false;
}else{
	db.collection("clientes").add({

    nombre: nombre,
    apellido: apellido,
    direccion: direccion,
    telefono: telefono,
    email: email,
    fecha: fecha,
    dni: dni
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);

})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
}

}
	



//leer documento
//onSnashot() esto  va ha estar escuchando cada vez que se haga un cambio a la base
//de datos y lo va a reflejar en nuestra web
var tabla= document.getElementById('tabla');

db.collection("clientes").onSnapshot((querySnapshot) => {
	//limpiamos la tabla 

	tabla.innerHTML='';

    querySnapshot.forEach((doc) => {

    	tabla.innerHTML +=`
    	<tr>
    		<td>${doc.id }  </td>
    		<td>${doc.data().nombre }  </td>
    		<td>${doc.data().apellido}</td>
    		<td>${doc.data().direccion}</td>
    		<td>${doc.data().telefono}</td>
    		<td>${doc.data().email}</td>
    		<td>${doc.data().fecha}</td>
            <td>${doc.data().dni}</td>
    	      <td> <button type="button" class="btn btn-danger" onclick="eliminaruser('${doc.id }')">Eliminar</button></td>
    	       <td><button type="button" class="btn btn-info" onclick="editaruser('${doc.id }','${doc.data().nombre}','${doc.data().apellido}','${doc.data().direccion}','${doc.data().telefono}' ,'${doc.data().email}','${doc.data().fecha}','${doc.data().dni}')" data-toggle="modal" data-target="#miModal">Editar</button></td>
    	</tr>
    	`
    


      
    });

});


//borrar usuarios
function eliminaruser(iduser){
db.collection("clientes").doc(iduser).delete().then(function() {
    console.log("Document successfully deleted!");
}).catch(function(error) {
    console.error("Error removing document: ", error);
});


}

//editar clientes


function editaruser(id,nombre, apellido, direccion,telefono, email, fecha, dni){
//voy a pasar toda la informacion de esa fila a mi formulario
	document.getElementById('nombre').value = nombre;
	document.getElementById('apellido').value = apellido;
	document.getElementById('direccion').value = direccion;
	document.getElementById('telefono').value = telefono;
	document.getElementById('email').value = email;
	document.getElementById('fecha').value = fecha;
	document.getElementById('dni').value = dni;
	//obtenemos el boton y  vamos a cambiarle el nombre por 'editar'
	var a = document.getElementById('boton');
	var b = document.getElementById('botonedit');
	a.style.display='none';
	b.style.display = '';
	//limpiar formulario
	
	b.onclick= function(){
		console.log("entroo")
		var washingtonRef = db.collection("clientes").doc(id);
	
var nombre=  document.getElementById('nombre').value;
var apellido=	document.getElementById('apellido').value;
var direccion=	document.getElementById('direccion').value;
var telefono=	document.getElementById('telefono').value;
var email=	document.getElementById('email').value;
var fecha=	document.getElementById('fecha').value;
var dni=	document.getElementById('dni').value;

	return washingtonRef.update({
	 nombre: nombre,
    apellido: apellido,
    direccion: direccion,
    telefono: telefono,
    email: email,
    fecha: fecha,
    dni: dni
	})
	.then(function() {
			document.getElementById('nombre').value ='';
	document.getElementById('apellido').value = '';
	document.getElementById('direccion').value = '';
	document.getElementById('telefono').value = '';
	document.getElementById('email').value = '';
	document.getElementById('fecha').value = '';
	document.getElementById('dni').value = '';
		b.innerHTML='Guardar';

	    console.log("Document successfully updated!");
 $("#miModal").modal('hide');//ocultamos el modal

  $('body').removeClass('modal-open');//eliminamos la clase del body para poder hacer scroll
  $('.modal-backdrop').remove();//eliminamos el backdrop del modal
a.style.display='';
	b.style.display = 'none';
	})
	.catch(function(error) {
	  
	    console.error("Error updating document: ", error);
	});
	}
	
	}
function cerrarmodal(){
	document.getElementById('nombre').value ='';
	document.getElementById('apellido').value = '';
	document.getElementById('direccion').value = '';
	document.getElementById('telefono').value = '';
	document.getElementById('email').value = '';
	document.getElementById('fecha').value = '';
	document.getElementById('dni').value = '';
		

}

function buscacliente(){

	
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("tb");
   console.log(table);
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  
}
}


//////////////////////////////////ARTICULOS\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\



//agregar articulo
function guarda_articulos(){


var nombre = document.getElementById('nombre').value;
var precio = document.getElementById('precio').value;
var stock = document.getElementById('stock').value;
var descripcion = document.getElementById('descripcion').value;

if(nombre==""){
	alert("Tienes que poner un nombre");
	return false;
}else if(precio.length==""){
	alert("Tienes que poner un precio al artículo");
	return false;
}else if(stock.lenght==""){
	alert("Tienes que poner un numero de stock");
	return false;

}else if(descripcion.lenght==""){
	alert("Debes de poner una descripción al artículo");
	return false;
}else{
	db.collection("articulos").add({

    nombre: nombre,
    precio: precio,
    stock: stock,
    descripcion: descripcion
   
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);

})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
}

}
	
var tabla= document.getElementById('tablaarticulo');

db.collection("articulos").onSnapshot((querySnapshot) => {
	//limpiamos la tabla 

	tabla.innerHTML='';

    querySnapshot.forEach((doc) => {

    	tabla.innerHTML +=`
    	<tr>
    		<td>${doc.id }  </td>
    		<td>${doc.data().nombre }  </td>
    		<td>${doc.data().precio}</td>
    		<td>${doc.data().stock}</td>
    			<td>${doc.data().descripcion}</td>
    		
    	      <td> <button type="button" class="btn btn-danger" onclick="elimina_articulos('${doc.id }')">Eliminar</button></td>
    	       <td><button type="button" class="btn btn-info" onclick="editar_user('${doc.id }','${doc.data().nombre}','${doc.data().precio}','${doc.data().stock}','${doc.data().descripcion}')" data-toggle="modal" data-target="#miModalart">Editar</button></td>
    	</tr>
    	`
    


      
    });

});



function busca_articulo(){

	
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("tableart");
   console.log(table);
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  
}
}

//borrar articulos
function elimina_articulos(iduser){
db.collection("articulos").doc(iduser).delete().then(function() {
    console.log("Document successfully deleted!");
}).catch(function(error) {
    console.error("Error removing document: ", error);
});


}

//editar articulos


function editar_user(id,nombre, precio, stock,descripcion){
//voy a pasar toda la informacion de esa fila a mi formulario
	document.getElementById('nombre').value = nombre;
	document.getElementById('precio').value = precio;
	document.getElementById('stock').value = stock;
	document.getElementById('descripcion').value = descripcion;

	//obtenemos el boton y  vamos a cambiarle el nombre por 'editar'
	var a = document.getElementById('boton');
	var b = document.getElementById('botonedit');
	a.style.display='none';
	b.style.display = '';
	//limpiar formulario
	
	b.onclick= function(){
		console.log("entroo")
		var washingtonRef = db.collection("articulos").doc(id);
	
var nombre=  document.getElementById('nombre').value;
var precio=	document.getElementById('precio').value;
var stock=	document.getElementById('stock').value;
var descripcion=	document.getElementById('descripcion').value;


	return washingtonRef.update({
	 nombre: nombre,
   precio: precio,
    stock: stock,
    descripcion: descripcion
	})
	.then(function() {
			document.getElementById('nombre').value ='';
	document.getElementById('precio').value = '';
	document.getElementById('stock').value = '';
	document.getElementById('descripcion').value = '';

		b.innerHTML='Guardar';

	    console.log("Document successfully updated!");
 $("#miModalart").modal('hide');//ocultamos el modal

  $('body').removeClass('modal-open');//eliminamos la clase del body para poder hacer scroll
  $('.modal-backdrop').remove();//eliminamos el backdrop del modal
a.style.display='';
	b.style.display = 'none';
	})
	.catch(function(error) {
	  
	    console.error("Error updating document: ", error);
	});
	}
	
	}