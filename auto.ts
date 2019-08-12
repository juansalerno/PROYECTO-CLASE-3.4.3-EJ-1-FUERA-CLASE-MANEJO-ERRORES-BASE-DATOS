import Vehiculo from './vehiculo';

export default class Auto extends Vehiculo {
    private conBaul: boolean;

    public constructor(tipo: number, marca: string, modelo: string, year: number, color: string, patente: string, precio: number) {
        super(tipo, marca, modelo, year, color, patente, precio);
        this.conBaul = true;
    }

    public getConBaul(): boolean {
        return this.conBaul
    }

    public cambiarEstadoBaul(): void {
        if (this.conBaul)
            this.conBaul = false;
        else
            this.conBaul = true;
    }

    public acelerar(): void {
        this.velocidadActual += 20;
    }

    public frenar(): void {
        this.velocidadActual -= 20;
    }

}