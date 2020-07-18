var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var general;
(function (general) {
    var Vehiculo = /** @class */ (function () {
        function Vehiculo(modelo, marca, precio) {
            this.modelo = modelo;
            this.marca = marca;
            this.precio = precio;
        }
        Vehiculo.prototype.getModelo = function () {
            return this.modelo;
        };
        Vehiculo.prototype.setModelo = function (modelo) {
            this.modelo = modelo;
        };
        Vehiculo.prototype.getMarca = function () {
            return this.modelo;
        };
        Vehiculo.prototype.setMarca = function (marca) {
            this.marca = marca;
        };
        Vehiculo.prototype.getPrecio = function () {
            return this.precio;
        };
        Vehiculo.prototype.setPrecio = function (precio) {
            this.precio = this.precio;
        };
        return Vehiculo;
    }());
    general.Vehiculo = Vehiculo;
    var Auto = /** @class */ (function (_super) {
        __extends(Auto, _super);
        function Auto(modelo, marca, precio, cantPuertas) {
            var _this = _super.call(this, modelo, marca, precio) || this;
            _this.cantPuertas = cantPuertas;
            return _this;
        }
        Auto.prototype.getcantPuertas = function () {
            return this.cantPuertas;
        };
        Auto.prototype.setcantPuertas = function (cantPuertas) {
            this.cantPuertas = cantPuertas;
        };
        return Auto;
    }(Vehiculo));
    general.Auto = Auto;
    var Camioneta = /** @class */ (function (_super) {
        __extends(Camioneta, _super);
        function Camioneta(modelo, marca, precio, cuatroXCuatro) {
            var _this = _super.call(this, modelo, marca, precio) || this;
            _this.cuatroXCuatro = cuatroXCuatro;
            return _this;
        }
        Camioneta.prototype.getcuatroXCuatro = function () {
            return this.cuatroXCuatro;
        };
        Camioneta.prototype.setcuatroXCuatro = function (cuatroXCuatro) {
            this.cuatroXCuatro = cuatroXCuatro;
        };
        return Camioneta;
    }(Vehiculo));
    general.Camioneta = Camioneta;
    window.addEventListener('load', function () {
        crearTabla();
        traerDatosForm();
        var promedioPrecio = 0;
        var h3Promedio = document.getElementById('promedioh3');
        var listsAutos = new Array();
        var form = document.getElementById('form');
        var tabla = document.getElementById('tabla');
        var btnCancelar = document.getElementById('btnCancelar');
        var btnGuardar = document.getElementById('btnGuardar');
        btnGuardar.addEventListener("click", function () {
            var filas = tabla.children;
            for (var index = 0; index < filas.length; index++) {
                var element = filas[index];
                if (index > 1) {
                    tabla.removeChild(filas[index]);
                }
            }
            var retorno = obtenerDatosForm();
            if (retorno != null) {
                switch (retorno.Tipo) {
                    case 'Auto':
                        var nuevoAuto = new Auto(retorno.Modelo, retorno.Marca, parseInt(retorno.Precio), parseInt(retorno.CantidadPuerta));
                        listsAutos.push(nuevoAuto);
                        break;
                    case 'Camioneta':
                        var nuevoCamioneta = new Camioneta(retorno.Modelo, retorno.Marca, parseInt(retorno.Precio.toString()), retorno.CuatroxCuatro);
                        listsAutos.push(nuevoCamioneta);
                        break;
                    default:
                        break;
                }
            }
            var total = 0;
            listsAutos.map(function (element) {
                // var texto = 
                agregarFilaLatabla(tabla, element);
                total = calcularPromedio(element, total);
                var promedio = total / listsAutos.length;
                console.log(promedio);
                h3Promedio.value = promedio.toString();
            });
            //agregar a la fila
        });
    });
    function calcularPromedio(element, total) {
        var precio = parseInt(element.precio);
        total = precio + total;
        return total;
    }
    function agregarFilaLatabla(fila, element) {
        var tr = document.createElement('tr');
        crearColumna(tr, '0');
        var tipo = element.constructor.name;
        console.log(tipo);
        crearColumna(tr, element.modelo);
        crearColumna(tr, element.marca);
        crearColumna(tr, element.precio);
        crearColumna(tr, tipo);
        if (tipo == 'Auto') {
            crearColumna(tr, element);
            console.log('es auto');
        }
        else {
            crearColumna(tr, '-');
        }
        if (tipo == 'Camioneta') {
            if (tipo == true) {
                crearColumna(tr, 'Sí');
            }
            else {
                crearColumna(tr, 'No');
            }
        }
        else {
            crearColumna(tr, '-');
        }
        crearColumnaBoton(tr);
        fila.appendChild(tr);
    }
    function crearColumna(tr, texto) {
        var td = document.createElement('td');
        var text = document.createTextNode(texto);
        td.appendChild(text);
        tr.appendChild(td);
    }
    function crearColumnaBoton(tr) {
        var td = document.createElement('td');
        tr.appendChild(td);
        var botonEliminar = document.createElement("button");
        botonEliminar.setAttribute("type", "button");
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.setAttribute('class', 'btnEliminar');
        td.appendChild(botonEliminar);
        botonEliminar.addEventListener("click", function (e) {
            var filaBoton = e.target.parentNode.parentNode;
            var id = filaBoton.children[0].textContent;
            var tabla = document.getElementById('tabla');
            tabla.removeChild(filaBoton);
            // if(listsAutos != null){
            //     listsAutos.reduce(eliminarItem);
            // }
            // function myFunc(listsAutos, id) {
            //     listsAutos.map()
            //     return listsAutos;
            // }
        });
        return tr;
    }
    function traerDatosForm() {
        var categorias = ["id", "Marca", "Modelo", "Precio", "Tipo"];
        var form = document.getElementById("form");
        categorias.map(function (elemento) {
            var label = document.createElement("label");
            label.style.display = "block";
            var datoLabel = document.createTextNode(elemento);
            label.appendChild(datoLabel);
            form.appendChild(label);
            var select = document.createElement('select');
            if (elemento == 'Tipo') {
                var clases = ['-', 'Auto', 'Camioneta'];
                var select = createSelect(clases);
                select.setAttribute('id', 'selectFormulario');
                form.appendChild(select);
            }
            else {
                var dato = document.createElement("input");
                dato.setAttribute("id", elemento);
                dato.setAttribute("type", "text");
                dato.style.display = "block";
                dato.setAttribute('position', 'fixed');
                dato.placeholder = elemento;
                form.appendChild(dato);
            }
        });
        document.getElementById('id').disabled = true;
        // agregarEventoSelect();
        crearBotones(form);
        // eventosBotones();    
    }
    function createSelect(clases) {
        var select = document.createElement('select');
        select.setAttribute('class', "selectTable");
        var option;
        clases.map(function (value) {
            option = document.createElement("option");
            option.setAttribute("value", value);
            var texto = document.createTextNode(value);
            option.appendChild(texto);
            select.appendChild(option);
        });
        return select;
    }
    function crearBotones(form) {
        var fila = document.createElement('tr');
        var botonGuardar = document.createElement("button");
        botonGuardar.setAttribute('id', 'btnGuardar');
        botonGuardar.setAttribute("type", "button");
        botonGuardar.textContent = 'Guardar';
        fila.appendChild(botonGuardar);
        form.appendChild(fila);
    }
    function crearTabla() {
        var tabla = document.getElementById('tabla');
        console.log('taba');
        var thead = document.createElement('thead');
        var tr = document.createElement('tr');
        tr.setAttribute('id', 'thead');
        // crearFilaFiltro();
        var encabezados = ["id", "Marca", "Modelo", "Precio", "Tipo", "CantPuertas", "CuatroxCuatro", "Accion"];
        thead.appendChild(tr);
        encabezados.map(function (value) {
            var th = document.createElement('th');
            var text = document.createTextNode(value);
            th.appendChild(text);
            tr.appendChild(th);
        });
        // animal de ejemplo
        tabla.appendChild(thead);
        // var filas = document.createElement('div');
        // filas.setAttribute('id', 'filas');
        // tabla.appendChild(filas);
        // var texto = ['Pajaro', 'Piolín', '-', '-', 'Loro'];
        // agregarFilaLatabla(tabla, texto);
    }
    // function eventosBotones() {
    //     var form = <HTMLInputElement>document.getElementById('form');
    //     var tabla = <HTMLInputElement>document.getElementById('tabla');
    //     var btnCancelar = <HTMLInputElement>document.getElementById('btnCancelar');
    //     var btnGuardar = <HTMLInputElement>document.getElementById('btnGuardar');
    //     var listaMascotas: Array<Mascota> = new Array<Mascota>();
    //     btnGuardar.addEventListener("click", () => {
    //         var retorno = obtenerDatosForm();
    //         //guardarEnListaArray;
    //         if (retorno != null) {
    //             console.log(retorno);
    //             switch (retorno.Clase) {
    //                 case 'Pajaro':
    //                     // const nuevoPajaro: Pajaro = new Pajaro(retorno.Nombre, 3);
    //                     // listaMascotas.push(nuevoPajaro);
    //                     break;
    //                 case 'Perro':
    //                     const nuevoPerro: Perro = new Perro(retorno.Nombre, retorno.Raza);
    //                     listaMascotas.push(nuevoPerro);
    //                     console.log(listaMascotas);
    //                     break;
    //                 case 'Gato':
    //                     const nuevoGato: Gato = new Gato(retorno.Nombre, retorno.CantVidas);
    //                     listaMascotas.push(nuevoGato);
    //                     console.log(listaMascotas);
    //                     break;
    //                 default:
    //                     break;
    //             }
    //         }
    //     });
    // }
    // function agregarFilaLatabla(fila, texto) {
    //     var tr = document.createElement('tr');
    //     texto.map(element => {
    //         var td = document.createElement('td');
    //         var text = document.createTextNode(element);
    //         td.appendChild(text);
    //         tr.appendChild(td);
    //     });
    //     fila.appendChild(tr);
    // }
    // function quitarFilaDeLatabla(filas) {
    //     while (filas.firstChild) {
    //         filas.firstChild.remove();
    //     }
    // }
    // function crearFilaFiltro() {
    //     var divfilter = document.getElementById('divFilter');
    //     var trFilter = document.createElement('tr');
    //     divfilter.appendChild(trFilter);
    //     var dato = document.createElement("input");
    //     dato.setAttribute("id", 'inputFilter');
    //     dato.setAttribute("type", "text");
    //     dato.style.display = "block";
    //     dato.setAttribute('position', 'fixed');
    //     trFilter.appendChild(dato);
    //     var dato = <HTMLInputElement>document.getElementById('inputFilter');
    //     dato.addEventListener('keyup', function () {
    //         var encontro = false;
    //         var texto = null;
    //         if (dato.value.length > 3) {
    //             console.log(dato.value);
    //             //buscar en lista de array
    //             var listaMascotas: Array<Mascota> = new Array<Mascota>();
    //             const nuevoPerro: Perro = new Perro('fifi', 'caniche');
    //             const nuevoPerro2: Perro = new Perro('nana', 'caniche');
    //             const nuevoPerro3: Perro = new Perro('pepe', 'caniche');
    //             const nuevoGato: Gato = new Gato('gato', 3);
    //             const nuevoPajaro: Pajaro = new Pajaro('pajaro', eTipo.Loro);
    //             listaMascotas.push(nuevoPerro);
    //             listaMascotas.push(nuevoPerro2);
    //             listaMascotas.push(nuevoPerro3);
    //             listaMascotas.push(nuevoGato);
    //             listaMascotas.push(nuevoPajaro);
    //             var fila = <HTMLInputElement>document.getElementById('filas');
    //             for (var i = 0; i < listaMascotas.length; i++) {
    //                 if (listaMascotas[i].getNombre() == dato.value) {
    //                     encontro = true;
    //                     texto = [typeof (listaMascotas[i]), listaMascotas[i].getNombre()];
    //                     var tipoMascota = listaMascotas[i].constructor.name;
    //                     switch (tipoMascota) {
    //                         case 'Perro':
    //                             texto = [tipoMascota, listaMascotas[i].getNombre(), listaMascotas[i].getRaza(), "-", "-"];
    //                             break;
    //                         case 'Pajaro':
    //                             if ((listaMascotas[i].getTipo().toString() == 1){
    //                                 texto = [tipoMascota, listaMascotas[i].getNombre(), "-", "-", "Loro"];
    //                             } else {
    //                                 texto = [tipoMascota, listaMascotas[i].getNombre(), "-", "-", "Rapiña"];
    //                             }
    //                             break;
    //                         case 'Gato':
    //                             texto = [tipoMascota, listaMascotas[i].getNombre(), "-", listaMascotas[i].getVidasGato().toString(), "-"];
    //                             break
    //                     }
    //                 }
    //             }
    //             //armar lista
    //         }
    //         if (texto != null) {
    //             agregarFilaLatabla(fila, texto);
    //         } else {
    //             quitarFilaDeLatabla(fila);
    //         }
    //     });
    // }
    // function agregarEventoSelect() {
    //     var select = <HTMLInputElement>document.getElementById('selectFormulario');
    //     select.addEventListener('change', function () {
    //         var nombreI = <HTMLInputElement>document.getElementById('Nombre');
    //         var razaI = <HTMLInputElement>document.getElementById('Raza');
    //         var tipoI = <HTMLInputElement>document.getElementById('Tipo');
    //         var cantVidasI = <HTMLInputElement>document.getElementById('CantVidas');
    //         console.log(select.value);
    //         razaI.disabled = true;
    //         tipoI.disabled = true;
    //         cantVidasI.disabled = true;
    //         nombreI.disabled = true;
    //         switch (select.value) {
    //             case 'Pajaro':
    //                 nombreI.disabled = false;
    //                 tipoI.disabled = false;
    //                 break;
    //             case 'Gato':
    //                 nombreI.disabled = false;
    //                 cantVidasI.disabled = false;
    //                 break;
    //             case 'Perro':
    //                 nombreI.disabled = false;
    //                 razaI.disabled = false;
    //                 break;
    //             default:
    //                 break;
    //         }
    //     });
    // }
    function obtenerDatosForm() {
        var tipoI = document.getElementById('selectFormulario');
        var MarcaI = document.getElementById('Marca');
        var ModeloI = document.getElementById('Modelo');
        var PrecioI = document.getElementById('Precio');
        var retorno = false;
        // retorno = validarCampos(select.value, nombreI.value, razaI.value, cantVidasI.value, tipoI.value);
        var retornoJson = null;
        // if (retorno == true) {
        retornoJson = {
            "Tipo": tipoI.value,
            "Marca": MarcaI.value,
            "Modelo": ModeloI.value,
            "Precio": PrecioI.value,
            "CantidadPuertas": 2,
            "CuatroxCuatro": true
        };
        // }
        tipoI.value = "-";
        MarcaI.value = "";
        ModeloI.value = "";
        PrecioI.value = "";
        return retornoJson;
    }
    // function validarCampos(mascota, nombre, raza, cantidadVidas, tipo) {
    //     var retorno = true;
    //     console.log(nombre.length);
    //     if (mascota == "-" || nombre.length == 0) {
    //         retorno = false;
    //     }
    //     if (raza.length == 0 && mascota == 'Perro') {
    //         alert('Uno de los datos ingresados es incorrecto');
    //         // alert('Perro');
    //         console.log(mascota);
    //         retorno = false;
    //     }
    //     if (cantidadVidas < 1 || cantidadVidas > 9 && mascota == 'Gato') {
    //         alert('Uno de los datos ingresados es incorrecto');
    //         retorno = false;
    //     }
    //     if (tipo == "-" && mascota == 'Pajaro') {
    //         alert('Uno de los datos ingresados es incorrecto');
    //         retorno = false;
    //         alert('Pajaro');
    //     }
    //     return retorno;
    // }
})(general || (general = {}));
