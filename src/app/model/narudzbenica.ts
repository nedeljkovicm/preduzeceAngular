import { StavkaNarudzbeniceDto } from './stavkaNarudzbenice';
import { KupacDto } from './kupac';
import { KatalogDto } from './katalog';

export interface NarudzbenicaDto {
    narudzbenicaId: number;
    datum: Date;
    ukupanIznos: number;
    status: string;
    kupac:KupacDto;
    katalog : KatalogDto;
    stavkeNarudzbenice: StavkaNarudzbeniceDto[];
}
