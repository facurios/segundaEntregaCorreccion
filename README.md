INSTRUCCIONES PARA PROBAR LA APLICACION

INICIALIZAR la Base de datos mongo del repositorio ubicada en ./database/mongodb


METODOS PARA PRUEBA DE PRODUCTOS

get: localhost:3000/api/productos  //trae todos los productos

get: localhost:3000/api/productos/:id //trae producto por id

post: localhost:3000/api/productos   //agrega productos a la base de datos
	si falta algun dato en el body, devuelve error "faltan datos"
	{
	 "title": "Producto X",
        "description": "description X",
        "thumbnail": "Imagen del producto",
        "price": 1234,
        "stock": 50

	}

put:  localhost:3000/api/productos/:id  //modifica algun producto existente
	se puede enviar en el body, cualquiera de los datos anteriores

delete: localhost:3000/api/productos/:id   //elimina el producto segun el id 

METODOS PARA PRUEBA DE CARRITOS

get: localhost:3000/api/carrito/:id //devuelve el carrito segun el id

post: localhost:3000/api/carrito   //crea un nuevo carrito

put: localhost:3000/api/carrito/:id  //agrega un producto al carrito
	se debe enviar el id del producto por body. De no enviar el id de producto emite error
	{
	   "id": x
	}

delete: localhost:3000/api/carrito/:id //elimina o resta la cantidad del producto en el carrito de debe enviar id de producto por body
	{
	   "id": x
	}
