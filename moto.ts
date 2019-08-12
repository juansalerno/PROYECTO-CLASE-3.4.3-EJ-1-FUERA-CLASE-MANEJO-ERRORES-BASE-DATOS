import Vehiculo from './vehiculo';

export default class Moto extends Vehiculo {
    private cilindradas: number;

    public constructor(tipo: number, marca: string, modelo: string, year: number, color: string, patente: string, precio: number) {
        super(tipo, marca, modelo, year, color, patente, precio);
    }

    public acelerar(): void {
        this.velocidadActual += 10;
    }

    public frenar(): void {
        this.velocidadActual -= 10;
    }

    public getCilindradas(): number {
        return this.cilindradas; 
    }
}