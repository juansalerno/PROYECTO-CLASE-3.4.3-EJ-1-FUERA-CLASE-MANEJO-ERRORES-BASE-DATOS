
export default abstract class Vehiculo {

    protected estaPrendido: boolean
    protected velocidadActual: number
    protected color: string
    protected marca: string
    protected modelo: string
    protected year: number
    protected kilometraje: number
    protected patente: string
    protected precio: number
    protected numeroTipo: number

    public constructor(numeroTipo: number, marca: string, modelo: string, year: number, color: string, patente: string, precio: number) {
        this.estaPrendido = false;
        this.velocidadActual = 0;
        this.color = color;
        this.marca = marca;
        this.modelo = modelo;
        this.year = year;
        this.kilometraje = 0;
        this.patente = patente;
        this.precio = precio;
        this.numeroTipo = numeroTipo;
    }

    public encenderApagar(): void {
        if (this.estaPrendido) {
            this.estaPrendido = false;
        } else {
            this.estaPrendido = true;
        }
    }

    abstract acelerar(): void

    abstract frenar(): void 

    public setKilometraje(n: number): void {
        this.kilometraje += n;
    }

    public getStatus(): boolean {
        return this.estaPrendido;
    }

    public getVelocidadActual(): number {
        return this.velocidadActual;
    }

    public getMarca(): string {
        return this.marca;
    }

    public getModel(): string {
        return this.modelo;
    }

    public getYear(): number {
        return this.year;
    }

    public getKilometraje(): number {
        return this.kilometraje;
    }

    public getColor(): string {
        return this.color;
    }

    public getPatente(): string {
        return this.patente;
    }

    public getNroTipo(): number {
        return this.numeroTipo;
    }

    public getPrecio(): number {
        return this.precio
    }
}