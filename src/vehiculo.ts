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


        var promedioPrecio = 0;

        var h3Promedio = <HTMLInputElement>document.getElementById('promedioh3');

        h3Promedio.textContent = "Valor aprox. :";

        const listsAutos: Array<Vehiculo> = new Array<Vehiculo>();


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



            var total: number = 0;
            listsAutos.map(element => {

                // var texto = 
                agregarFilaLatabla(tabla, element);


                total = calcularPromedio(element, total);

                var promedio = total / listsAutos.length;
                console.log(promedio);
                console.log("h3Promedio");

                console.log(h3Promedio);
                console.log(promedio.toString());



                h3Promedio.textContent ="Valor aprox. :" +  promedio;
                

                

            });

            //agregar a la fila

        });



    });

    function calcularPromedio(element, total): number {


        var precio: Number = parseInt(element.precio);

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



        fila.appendChild(botonGuardar);
        form.appendChild(fila);




    }


    function crearTabla() {

        let tabla = document.getElementById('tabla');
        console.log('taba');
        var thead = document.createElement('thead');
        var tr = document.createElement('tr');
        tr.setAttribute('id', 'thead');

        var encabezados = ["id", "Marca", "Modelo", "Precio", "Tipo", "CantPuertas", "CuatroxCuatro", "Accion"];
        thead.appendChild(tr);

        encabezados.map((value) => {

            var th = document.createElement('th');
            var text = document.createTextNode(value);
            th.appendChild(text);
            tr.appendChild(th);

        });


        tabla.appendChild(thead);



    }


    function obtenerDatosForm() {


        var tipoI = <HTMLInputElement>document.getElementById('selectFormulario');
        var MarcaI = <HTMLInputElement>document.getElementById('Marca');
        var ModeloI = <HTMLInputElement>document.getElementById('Modelo');
        var PrecioI = <HTMLInputElement>document.getElementById('Precio');
        var retorno = false;
        var retornoJson = null;

        retornoJson = {
            "Tipo": tipoI.value,
            "Marca": MarcaI.value,
            "Modelo": ModeloI.value,
            "Precio": PrecioI.value,
            "CantidadPuertas": 2,
            "CuatroxCuatro": true,
        }


        tipoI.value = "-";
        MarcaI.value = "";
        ModeloI.value = "";
        PrecioI.value = "";

        return retornoJson;

    }




}