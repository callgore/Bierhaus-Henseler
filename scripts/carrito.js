const descripciones = {
    indiaPaleAle: "Cerveza  lupulada y amarga, moderadamente fuerte. Prominente aroma a lúpulo.  Cuerpo ligero con una textura suave. Color dorado medio, de apariencia clara",
    creamstout: "Cerveza Ale maltosa, tostada, muy oscura y de cuerpo pleno con un sabor complementario a avena. Dulzor maltoso con una impresión a café y crema. Aroma a lúpulo medio, terroso o floral. Espuma gruesa, cremosa y persistente",
    Bufalo: "Cerveza centrada en la malta, acaramelada, con sabores de migas de pan tostadas, bizcochos de vainilla y galletas inglesas. Color cobre pálido a marrón muy oscuro",
    GoldenAle: "Cerveza dorada suave, clara y brillante con notas a fruta, lúpulo y carácter de malta. Bien balanceada, limpia y de espuma clara y brillante",
    Porter: "Cerveza marrón de moderada intensidad con un restringido carácter tostado y amargor, sabores tostados, con  perfil de malta-chocolate-caramelo. Aroma de malta a pan suave, bizcocho y tostado. Espuma moderada, blanquecina",
    ScotchAle: "Cerveza centrada en la malta, acaramelada, con sabores de migas de pan tostadas, bizcochos y galletas inglesas;  con carácter a frutas de carozo. Color cobre pálido ",
}

const imagenes = {
    indiaPaleAle: "imagenes/indiaPale.jpg",
    creamstout: "imagenes/creamstout.jpg",
    Bufalo: "imagenes/bufalo.jpg",
    GoldenAle: "imagenes/goldenAle.jpg",
    Porter: "imagenes/porter.jpg",
    ScotchAle: "imagenes/scochAle.jpg",
}

class creador {
    constructor(nombre, precio, cantidad) {
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}

let productosGlobales = [];
let precioGlobal;
let nombreGlobal;

function traerVariables(nombre, precio) {

    console.log(productosGlobales)
    let descripcion = "";
    let foto = "";

    //traer descripcion
    if (nombre == "India Pale Ale") {
        descripcion = descripciones.indiaPaleAle;
        console.log(descripcion)
      } else if (nombre == "Cream Stout") {
            descripcion = descripciones.creamstout;
            console.log(descripcion)
            } else if (nombre == "Bufalo") {
                descripcion = descripciones.Bufalo;
                console.log(descripcion)
                } else if (nombre == "Golden Ale") {
                    descripcion = descripciones.GoldenAle;
                    console.log(descripcion)
                    } else if (nombre == "Porter") {
                        descripcion = descripciones.Porter;
                        console.log(descripcion)
                        } else if (nombre == "Scottish Ale") {
                            descripcion = descripciones.ScotchAle;
                            console.log(descripcion)
    }
    //traer foto
    if (nombre == "India Pale Ale") {
        foto = imagenes.indiaPaleAle;
        } else if (nombre == "Cream Stout") {
             foto  = imagenes.creamstout;
            } else if (nombre == "Bufalo") {
                 foto  = imagenes.Bufalo;
                } else if (nombre == "Golden Ale") {
                     foto  = imagenes.GoldenAle;
                    } else if (nombre == "Porter") {
                         foto = imagenes.Porter;
                        } else if (nombre == "Scottish Ale") {
                             foto  = imagenes.ScotchAle;
                        }


    precioGlobal = precio;
    nombreGlobal = nombre;

    mostrarProducto(nombre, precio, descripcion, foto);

   
}

let preCantidad = 1;

function addMenosOMas(valor) {

    if (preCantidad <= 0) {
        cerrarProducto();
        } else if (valor === "+") {
            ++preCantidad;
            } else if (valor === "-") {
                --preCantidad;
            }

    document.getElementById("cantidad-numeros").innerHTML = preCantidad;
    document.getElementById("pre-carrito-valor").innerHTML = `Precio: $${precioGlobal * preCantidad}`
}

function mostrarProducto(nombre, precio, descripcion, foto) {
    document.getElementById("pre-carrito").style.display = 'inline';
    document.getElementById("pre-carrito-picture").style.backgroundImage = `url(${foto})`;
    document.getElementById("pre-carrito-nombre").innerHTML = nombre;
    document.getElementById("pre-carrito-description").innerHTML = descripcion;
    document.getElementById("pre-carrito-valor").innerHTML = `Precio: $${precio}`; 
    document.getElementById("carrito-btn").style.display = 'none';
}
function cerrarProducto() {
    document.getElementById("pre-carrito").style.display = 'none';
    preCantidad = 1;
    document.getElementById("cantidad-numeros").innerHTML = preCantidad;
}

function agregarCarrito() {
    const producto = new creador(nombreGlobal, precioGlobal * preCantidad, preCantidad);

    preCantidad = 1;
    document.getElementById("cantidad-numeros").innerHTML = preCantidad;
    document.getElementById("pre-carrito").style.display = 'none';
    document.getElementById("carrito-btn").style.display = 'inline';

    for (i of productosGlobales) {
        if (i.nombre == producto.nombre) {
            producto.precio += i.precio;
            producto.cantidad += i.cantidad;
            productosGlobales.splice(productosGlobales.indexOf(i), 1);
        }
    }

    productosGlobales.push(producto);

    let prePrecioFinal = 0;

    for (i of productosGlobales) {
        prePrecioFinal += i.precio;
    }

    document.getElementById("carrito-btn-valor").innerHTML = `Total: $${prePrecioFinal}`;

    mensajeAddCarrito();
}
function abrirCarrito() {
    document.getElementById("carrito").style.display = 'inline';
    document.getElementById("productos-en-carrito").style.display = "inline";
    document.getElementById("carrito-btn").style.display = 'none';

    armarCarrito();
}
function cerrarCarrito() {
    document.getElementById("carrito").style.display = 'none';
    document.getElementById("info-pre-warap").style.display = "none";
    document.getElementById("carrito-btn").style.display = 'inline';
}

let precioFinalGlobal = 0;
let cantProductos = 0;

function armarCarrito() {
   
    let html = document.getElementById("productoFinal");
    let precioFinalHtml = document.getElementById("precioFinal");
    let precioFinal = 0;

    html.innerHTML = "";

    if (productosGlobales.length <= 0) {
        cerrarCarrito();
    }
    

    for (i of productosGlobales) {

        html.innerHTML +=
            `<tr>
                 <td></td>
                 <td>${i.nombre}</td>
                 <td></td>
                 <td>$${i.precio}</td>
                 <td> <div id="btn-menos"><input id="btnSumarORestar" type="button" value="-" name=${i.nombre} onclick="MenosOMas(this.value, this.name)" /></div></td>
                 <td>${i.cantidad}</td>
                 <td> <div id="btn-menos"><input id="btnSumarORestar" type="button" value="+" name=${i.nombre} onclick="MenosOMas(this.value, this.name)" /></div></td>
<td></td>
            </tr>`;

        precioFinal += i.precio;
        precioFinalGlobal = precioFinal;

        precioFinalHtml.innerHTML = `Valor final: $${precioFinal}`;
    }
}
function MenosOMas(valor, nombreModificar) {

    if (nombreModificar == "Cream") {
        nombreModificar = "Cream Stout";
        } else if (nombreModificar == "India") {
            nombreModificar = "India Pale Ale";
            } else if (nombreModificar == "Golden") {
                nombreModificar = "Golden Ale";
                } else if (nombreModificar == "Scottish") {
                        nombreModificar = "Scottish Ale";
                    }

    for (i of productosGlobales) {

        const precioInicial = 850;


        if (valor == "-" && i.nombre == nombreModificar) {
            --i.cantidad;
            i.precio = precioInicial * i.cantidad;
        }
        if (valor == "+" && i.nombre == nombreModificar) {
            ++i.cantidad;
            i.precio = precioInicial * i.cantidad;
        }
        if (valor == "-" && i.nombre == nombreModificar && i.cantidad < 1) {
            productosGlobales.splice(productosGlobales.indexOf(i), 1);
        }
    }

    let prePrecioFinal = 0;

    for (i of productosGlobales) {
        prePrecioFinal += i.precio;
    }

    document.getElementById("carrito-btn-valor").innerHTML = `Total: $${prePrecioFinal}`;

    armarCarrito();
}
function mensajeAddCarrito() {
    document.getElementById("mensajeError").style.display = 'none';
    document.getElementById("mensajeAddCarrito").style.display = 'inline';
    setTimeout(borrarmensajeAddCarrito, 6000);
}
function borrarmensajeAddCarrito() {
    document.getElementById("mensajeAddCarrito").style.display = 'none';
    document.getElementById("mensajeError").style.display = 'none';
}
function mensajeError() {
    document.getElementById("mensajeAddCarrito").style.display = 'none';
    document.getElementById("mensajeError").style.display = 'inline';
    setTimeout(borrarmensajeAddCarrito, 7000);
}
function preFinalizarCompra() {
    document.getElementById("productos-en-carrito").style.display = "none";
    document.getElementById("info-pre-warap").style.display = "inline";
}
function finalizarCompra() {
    
    let nombreCliente = document.getElementById("nombreCliente").value;
    let telefonoCliente = document.getElementById("telefonoCliente").value;

    if (nombreCliente == ""  || telefonoCliente == "" ) {
        mensajeError();
    } else {
        let nombre = [];

        for (i of productosGlobales) {
            nombre += `%20▫️${i.nombre} --> ${i.cantidad} %0A`;
        }

        let telefono = "5492944506988";

        let url = `https://api.whatsapp.com/send?phone=${telefono}&text=
		*_Bierhaus Henseler_*%0A
		Pedido de *${nombreCliente}*:%0A
        Telefono: *${telefonoCliente}*%0A
        ${nombre}%0A%0A
        *Total:*$${precioFinalGlobal}%0A`
            ;

        window.open(url);
    }
}