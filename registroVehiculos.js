"use strict";
exports.__esModule = true;
var moto_1 = require("./moto");
var camion_1 = require("./camion");
var auto_1 = require("./auto");
var fs = require("fs");
var RegistroVehiculos = /** @class */ (function () {
    function RegistroVehiculos() {
        this.baseDatos = this.leerVehiculosDesdeArchivo('./listado-vehiculos.txt', '\r\n', ',');
    }
    RegistroVehiculos.prototype.leerVehiculosDesdeArchivo = function (rutaArchivo, separador1, separador2) {
        var texto = fs.readFileSync(rutaArchivo, 'utf8');
        var arregloTexto = texto.split(separador1);
        var arregloVehiculos = new Array(arregloTexto.length);
        for (var i = 0; i < arregloTexto.length; i++) {
            var linea = arregloTexto[i].split(separador2);
            switch (linea[0].trim()) {
                case '1': {
                    arregloVehiculos[i] = new auto_1["default"](parseInt(linea[0].trim()), linea[1].trim(), linea[2].trim(), parseInt(linea[3].trim()), linea[4].trim(), linea[5].trim(), parseInt(linea[6].trim()));
                    break;
                }
                case '2': {
                    arregloVehiculos[i] = new moto_1["default"](parseInt(linea[0].trim()), linea[1].trim(), linea[2].trim(), parseInt(linea[3].trim()), linea[4].trim(), linea[5].trim(), parseInt(linea[6].trim()));
                    break;
                }
                case '3': {
                    arregloVehiculos[i] = new camion_1["default"](parseInt(linea[0].trim()), linea[1].trim(), linea[2].trim(), parseInt(linea[3].trim()), linea[4].trim(), linea[5].trim(), parseInt(linea[6].trim()));
                    break;
                }
                default: null;
            }
        }
        return arregloVehiculos;
    };
    RegistroVehiculos.prototype.guardar = function () {
        var cadena = '';
        var dimensionArreglo = this.baseDatos.length;
        var ultPosicion = dimensionArreglo - 1;
        for (var i = 0; i < (this.baseDatos.length - 1); i++) {
            cadena = cadena + this.baseDatos[i].getNroTipo().toString() + ',  ' + this.baseDatos[i].getMarca().toString() + ',  ' + this.baseDatos[i].getModel().toString() + ',  ' + this.baseDatos[i].getYear().toString() + ',  ' + this.baseDatos[i].getColor().toString() + ',  ' + this.baseDatos[i].getPatente().toString() + ',  ' + this.baseDatos[i].getPrecio().toString() + '\r\n';
        }
        cadena = cadena + this.baseDatos[ultPosicion].getNroTipo().toString() + ',  ' + this.baseDatos[ultPosicion].getMarca().toString() + ',  ' + this.baseDatos[ultPosicion].getModel().toString() + ',  ' + this.baseDatos[ultPosicion].getYear().toString() + ',  ' + this.baseDatos[ultPosicion].getColor().toString() + ',  ' + this.baseDatos[ultPosicion].getPatente().toString() + ',  ' + this.baseDatos[ultPosicion].getPrecio().toString();
        fs.writeFileSync('listado-vehiculos.txt', cadena);
    };
    RegistroVehiculos.prototype.imprimirTodosLosVehiculos = function () {
        console.log("\n");
        for (var i = 0; i < this.baseDatos.length; i++) {
            console.log(this.baseDatos[i]);
        }
        console.log("\n");
    };
    RegistroVehiculos.prototype.addVehiculo = function (vehiculo) {
        this.baseDatos.push(vehiculo);
        this.guardar();
    };
    RegistroVehiculos.prototype.getVehiculoPorIndice = function (index) {
        if (index > 0 && index <= this.baseDatos.length)
            return this.baseDatos[(index - 1)];
        else {
            console.log("Indice inválido.\n");
            return null;
        }
    };
    RegistroVehiculos.prototype.getVehiculoPorPatente = function (patente) {
        for (var i = 0; i < this.baseDatos.length; i++) {
            if (this.baseDatos[i].getPatente().toLowerCase() == patente.toLowerCase()) {
                return this.baseDatos[i];
            }
        }
        console.log('No se ha encontrado vehículo con la patente ingresada');
        return null;
    };
    RegistroVehiculos.prototype.getIndicePorPatente = function (patente) {
        for (var i = 0; i < this.baseDatos.length; i++) {
            if (this.baseDatos[i].getPatente().toLowerCase() == patente.toLowerCase()) {
                return i;
            }
        }
        console.log('No se ha encontrado vehículo con la patente ingresada');
        return null;
    };
    RegistroVehiculos.prototype.deleteVehiculoPorIndice = function (index) {
        if (index > 0 && index <= this.baseDatos.length) {
            this.baseDatos.splice(index - 1, 1);
            console.log("Vehiculo eliminado de la lista.\n");
        }
        else {
            console.log("Indice inválido.\n");
        }
        this.guardar();
    };
    RegistroVehiculos.prototype.deleteVehiculoPorPatente = function (patente) {
        var indice = this.getIndicePorPatente(patente);
        this.baseDatos.splice(indice, 1);
        console.log("Vehiculo eliminado de la lista.\n");
        this.guardar();
    };
    RegistroVehiculos.prototype.updateVehiculoPorIndice = function (vehiculo, indice) {
        if (indice > 0 && indice <= this.baseDatos.length) {
            this.baseDatos.splice((indice - 1), 1, vehiculo);
            console.log("Vehiculo actualizado.\n");
        }
        else {
            console.log("Indice inválido debido a que ingresó un numero menor a 0 o bien un numero mayor a la cantidad de vehiculos que actualmente se enuentran en el listado\n");
            console.log('La cantidad de vehiculos actuales son los siguientes: \n');
        }
        this.guardar();
    };
    RegistroVehiculos.prototype.imprimirListadoAutos = function () {
        for (var i = 0; i < this.baseDatos.length; i++) {
            if (this.baseDatos[i] instanceof auto_1["default"])
                console.log(this.baseDatos[i]);
        }
    };
    RegistroVehiculos.prototype.imprimirListadoMotos = function () {
        for (var i = 0; i < this.baseDatos.length; i++) {
            if (this.baseDatos[i] instanceof moto_1["default"])
                console.log(this.baseDatos[i]);
        }
    };
    RegistroVehiculos.prototype.imprimirListadoCamiones = function () {
        for (var i = 0; i < this.baseDatos.length; i++) {
            if (this.baseDatos[i] instanceof camion_1["default"])
                console.log(this.baseDatos[i]);
        }
    };
    return RegistroVehiculos;
}());
exports["default"] = RegistroVehiculos;
