import Vehiculo from './vehiculo';

export default class Camion extends Vehiculo {

    public constructor(tipo:number, marca: string, modelo: string, year: number, color: string, patente: string, precio: number) {
        super(tipo, marca, modelo, year, color, patente, precio);

    }

    public acelerar(): void {
        this.velocidadActual += 50;
    }

    public frenar(): void {
        this.velocidadActual -= 50;
    }
}