namespace general {

    export class Vehiculo {

        private id: number;
        private modelo: string;
        private marca: string;
        private precio: number;


        public constructor(modelo: string, marca: string, precio: number) {

            this.modelo = modelo;
            this.marca = marca;
            this.precio = precio;


        }

        public getModelo(): string {

            return this.modelo;

        }

        public setModelo(modelo: string): void {

            this.modelo = modelo;

        }


        public getMarca(): string {

            return this.modelo;

        }

        public setMarca(marca: string): void {

            this.marca = marca;

        }

        public getPrecio(): number {

            return this.precio;

        }

        public setPrecio(precio: number): void {

            this.precio = this.precio;

        }



    }



    export class Auto extends Vehiculo {

        private cantPuertas: number;


        public constructor(modelo: string, marca: string, precio: number, cantPuertas: number) {
            super(modelo, marca, precio);

            this.cantPuertas = cantPuertas;


        }

        public getcantPuertas(): number {

            return this.cantPuertas;

        }

        public setcantPuertas(cantPuertas: number): void {

            this.cantPuertas = cantPuertas;

        }

    }

    export class Camioneta extends Vehiculo {

        private cuatroXCuatro: boolean;


        public constructor(modelo: string, marca: string, precio: number, cuatroXCuatro: boolean) {
            super(modelo, marca, precio);

            this.cuatroXCuatro = cuatroXCuatro;

        }

        public getcuatroXCuatro(): boolean {

            return this.cuatroXCuatro;

        }

        public setcuatroXCuatro(cuatroXCuatro: boolean): void {

            this.cuatroXCuatro = cuatroXCuatro;

        }

    }



    window.addEventListener('load', function () {
        crearTabla();
        traerDatosForm();



        var listsAutos: Array<Vehiculo> = new Array<Vehiculo>();


        var form = <HTMLInputElement>document.getElementById('form');
        var tabla = <HTMLInputElement>document.getElementById('tabla');
        var btnCancelar = <HTMLInputElement>document.getElementById('btnCancelar');
        var btnGuardar = <HTMLInputElement>document.getElementById('btnGuardar');




        btnGuardar.addEventListener("click", () => {


            var filas = tabla.children;

            for (let index = 0; index < filas.length; index++) {
                const element = filas[index];

                if (index > 1) {

                    tabla.removeChild(filas[index]);

                }



            }


            var retorno = obtenerDatosForm();

            if (retorno != null) {



                switch (retorno.Tipo) {
                    case 'Auto':


                        const nuevoAuto: Auto = new Auto(retorno.Modelo, retorno.Marca, parseInt(retorno.Precio), parseInt(retorno.CantidadPuerta));
                        listsAutos.push(nuevoAuto);


                        break;
                    case 'Camioneta':
                        const nuevoCamioneta: Camioneta = new Camioneta(retorno.Modelo, retorno.Marca, parseInt(retorno.Precio.toString()), retorno.CuatroxCuatro);
                        listsAutos.push(nuevoCamioneta);


                        break;


                    default:
                        break;
                }

            }




            listsAutos.map(element => {

                // var texto = 
                agregarFilaLatabla(tabla, element);

            });

            //agregar a la fila

        });



    });




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

        } else {
            crearColumna(tr, '-');

        }
        if (tipo == 'Camioneta') {
            if (tipo == true) {
                crearColumna(tr, 'Sí');

            } else {
                crearColumna(tr, 'No');

            }
        } else {

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

        botonEliminar.addEventListener("click", (e) => {

            var filaBoton = e.target.parentNode.parentNode;

            var id = filaBoton.children[0].textContent;
            var tabla = <HTMLInputElement>document.getElementById('tabla');

            tabla.removeChild(filaBoton);


        });


        return tr;

    }

    function traerDatosForm() {


        var categorias = ["id", "Marca", "Modelo", "Precio", "Tipo"];

        var form = document.getElementById("form");

        categorias.map((elemento) => {

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



            } else {



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

        clases.map((value) => {

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



        var botonCancelar = document.createElement("button");
        botonCancelar.setAttribute("type", "button");
        botonCancelar.textContent = 'Cerrar';
        botonCancelar.setAttribute('id', 'btnCancelar');


    
        fila.appendChild(botonGuardar);
        fila.appendChild(botonCancelar);
        form.appendChild(fila);




    }


    function crearTabla() {

        let tabla = document.getElementById('tabla');
        console.log('taba');
        var thead = document.createElement('thead');
        var tr = document.createElement('tr');
        tr.setAttribute('id', 'thead');

        // crearFilaFiltro();

        var encabezados = ["id", "Marca", "Modelo", "Precio", "Tipo", "CantPuertas", "CuatroxCuatro", "Accion"];
        thead.appendChild(tr);

        encabezados.map((value) => {

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


        var tipoI = <HTMLInputElement>document.getElementById('selectFormulario');
        var MarcaI = <HTMLInputElement>document.getElementById('Marca');
        var ModeloI = <HTMLInputElement>document.getElementById('Modelo');
        var PrecioI = <HTMLInputElement>document.getElementById('Precio');
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
            "CuatroxCuatro": true,
        }


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


}