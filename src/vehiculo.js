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
        h3Promedio.textContent = "Valor aprox. :";
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
                console.log("h3Promedio");
                console.log(h3Promedio);
                console.log(promedio.toString());
                h3Promedio.textContent = "Valor aprox. :" + promedio;
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
        var encabezados = ["id", "Marca", "Modelo", "Precio", "Tipo", "CantPuertas", "CuatroxCuatro", "Accion"];
        thead.appendChild(tr);
        encabezados.map(function (value) {
            var th = document.createElement('th');
            var text = document.createTextNode(value);
            th.appendChild(text);
            tr.appendChild(th);
        });
        tabla.appendChild(thead);
    }
    function obtenerDatosForm() {
        var tipoI = document.getElementById('selectFormulario');
        var MarcaI = document.getElementById('Marca');
        var ModeloI = document.getElementById('Modelo');
        var PrecioI = document.getElementById('Precio');
        var retorno = false;
        var retornoJson = null;
        retornoJson = {
            "Tipo": tipoI.value,
            "Marca": MarcaI.value,
            "Modelo": ModeloI.value,
            "Precio": PrecioI.value,
            "CantidadPuertas": 2,
            "CuatroxCuatro": true
        };
        tipoI.value = "-";
        MarcaI.value = "";
        ModeloI.value = "";
        PrecioI.value = "";
        return retornoJson;
    }
})(general || (general = {}));
