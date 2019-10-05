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
	var boton = document.getElementById('boton');
	boton.innerHTML='Editar';
	//limpiar formulario
	
	boton.onclick= function(){
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

	    console.log("Document successfully updated!");
	})
	.catch(function(error) {
	  
	    console.error("Error updating document: ", error);
	});
	}
	
	}






