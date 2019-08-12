import Vehiculo from './vehiculo';
import Moto from './moto';
import Camion from './camion';
import Auto from './auto';
import * as fs from 'fs';


export default class RegistroVehiculos {
    private baseDatos: Vehiculo[]

    public constructor() {
        this.baseDatos = this.leerVehiculosDesdeArchivo('./listado-vehiculos.txt', '\r\n', ',');

    }

    private leerVehiculosDesdeArchivo(rutaArchivo, separador1, separador2): Vehiculo[] {
        let texto: string = fs.readFileSync(rutaArchivo, 'utf8');
        let arregloTexto: string[] = texto.split(separador1);
        let arregloVehiculos: Vehiculo[] = new Array(arregloTexto.length);
        for (let i = 0; i < arregloTexto.length; i++) {
            let linea: string[] = arregloTexto[i].split(separador2);
            switch (linea[0].trim()) {
                case '1': {
                    arregloVehiculos[i] = new Auto(parseInt(linea[0].trim()), linea[1].trim(), linea[2].trim(), parseInt(linea[3].trim()), linea[4].trim(), linea[5].trim(), parseInt(linea[6].trim()));
                    break;
                }
                case '2': {
                    arregloVehiculos[i] = new Moto(parseInt(linea[0].trim()), linea[1].trim(), linea[2].trim(), parseInt(linea[3].trim()), linea[4].trim(), linea[5].trim(), parseInt(linea[6].trim()));
                    break;
                }
                case '3': {
                    arregloVehiculos[i] = new Camion(parseInt(linea[0].trim()), linea[1].trim(), linea[2].trim(), parseInt(linea[3].trim()), linea[4].trim(), linea[5].trim(), parseInt(linea[6].trim()));
                    break;
                }
                default: null;
            }
        }
        return arregloVehiculos;
    }

    public guardar(): void {
        let cadena = '';
        let dimensionArreglo = this.baseDatos.length;
        let ultPosicion = dimensionArreglo - 1;
        for(let i= 0; i<(this.baseDatos.length-1); i++) {
            cadena = cadena + this.baseDatos[i].getNroTipo().toString()+ ',  ' + this.baseDatos[i].getMarca().toString() + ',  ' + this.baseDatos[i].getModel().toString() + ',  ' + this.baseDatos[i].getYear().toString() + ',  ' + this.baseDatos[i].getColor().toString() + ',  ' + this.baseDatos[i].getPatente().toString() + ',  ' + this.baseDatos[i].getPrecio().toString() + '\r\n';
        }
        cadena = cadena + this.baseDatos[ultPosicion].getNroTipo().toString()+ ',  '+ this.baseDatos[ultPosicion].getMarca().toString() + ',  ' + this.baseDatos[ultPosicion].getModel().toString() + ',  ' + this.baseDatos[ultPosicion].getYear().toString() + ',  ' + this.baseDatos[ultPosicion].getColor().toString() + ',  ' + this.baseDatos[ultPosicion].getPatente().toString() + ',  ' + this.baseDatos[ultPosicion].getPrecio().toString() 
        fs.writeFileSync('listado-vehiculos.txt', cadena);
    }

    public imprimirTodosLosVehiculos(): void {
        console.log("\n");
        for (let i = 0; i < this.baseDatos.length; i++) {
            console.log(this.baseDatos[i]);
        }   
        console.log("\n");
    }

    public addVehiculo(vehiculo: Vehiculo): void {
        this.baseDatos.push(vehiculo);
        this.guardar();
    }

    public getVehiculoPorIndice(index: number): Vehiculo {
        if (index > 0 && index <= this.baseDatos.length)
            return this.baseDatos[(index - 1)]
        else {
            console.log("Indice inválido.\n");
            return null;
        }
    }

    public getVehiculoPorPatente(patente: string): Vehiculo {
        for (let i = 0; i < this.baseDatos.length; i++) {
            if (this.baseDatos[i].getPatente().toLowerCase() == patente.toLowerCase()) {
                return this.baseDatos[i];
            }
        }
        console.log('No se ha encontrado vehículo con la patente ingresada');
        return null;
    }

    private getIndicePorPatente(patente: string): number {
        for (let i = 0; i < this.baseDatos.length; i++) {
            if (this.baseDatos[i].getPatente().toLowerCase() == patente.toLowerCase()) {
                return i;
            }
        }
        console.log('No se ha encontrado vehículo con la patente ingresada');
        return null;
    }

    public deleteVehiculoPorIndice(index: number): void {
        if (index > 0 && index <= this.baseDatos.length) {
            this.baseDatos.splice(index - 1, 1);
            console.log("Vehiculo eliminado de la lista.\n");
        }
        else {
            console.log("Indice inválido.\n");
        }
        this.guardar();
    }

    public deleteVehiculoPorPatente(patente: string): void {
        let indice = this.getIndicePorPatente(patente);
        this.baseDatos.splice(indice, 1);
        console.log("Vehiculo eliminado de la lista.\n");
        this.guardar();
    }



    public updateVehiculoPorIndice(vehiculo: Vehiculo, indice: number): void {
        if (indice > 0 && indice <= this.baseDatos.length) {
            this.baseDatos.splice((indice - 1), 1, vehiculo);
            console.log("Vehiculo actualizado.\n");
        } else {
            console.log("Indice inválido debido a que ingresó un numero menor a 0 o bien un numero mayor a la cantidad de vehiculos que actualmente se enuentran en el listado\n");
            console.log('La cantidad de vehiculos actuales son los siguientes: \n');
        }
        this.guardar();
    }

    public imprimirListadoAutos(): void {
        for(let i= 0; i< this.baseDatos.length; i++ ) {
            if(this.baseDatos[i]instanceof Auto) 
                console.log(this.baseDatos[i]);
        }
    }

    public imprimirListadoMotos(): void {
        for(let i= 0; i< this.baseDatos.length; i++ ) {
            if(this.baseDatos[i]instanceof Moto) 
                console.log(this.baseDatos[i]);
        }
    }

    public imprimirListadoCamiones(): void {
        for(let i= 0; i< this.baseDatos.length; i++ ) {
            if(this.baseDatos[i]instanceof Camion) 
                console.log(this.baseDatos[i]);
        }
    }
}

