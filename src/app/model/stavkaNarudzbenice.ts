import { StavkaNarudzbeniceId } from './stavkaNarudzbeniceId';

export interface StavkaNarudzbeniceDto {
    stavkaNarudzbeniceId: StavkaNarudzbeniceId;
    kolicina : number;
    iznos: number;
    nazivIgracke: string;
    opisIgracke: string;
    cenaIgracke: number;
}
