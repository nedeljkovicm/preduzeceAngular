import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IgrackaDto } from '../model/igracka';
import { KatalogDto } from '../model/katalog';
import { KupacDto } from '../model/kupac';
import { NarudzbenicaDto } from '../model/narudzbenica';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  private GET_ALL_KUPAC_URL = 'http://localhost:9000/kupac/get/all';
  private GET_BY_ID_KUPAC_URL = 'http://localhost:9000/kupac/get/';
  private DELETE_KUPAC_URL = 'http://localhost:9000/kupac/delete/';
  private SAVE_KUPAC_URL = 'http://localhost:9000/kupac/save';
  private UPDATE_KUPAC_URL = 'http://localhost:9000/kupac/update';
  private GET_ALL_IGRACKA_URL = 'http://localhost:9000/igracka/get/all';
  private GET_BY_ID_IGRACKA_URL = 'http://localhost:9000/igracka/get/';
  private DELETE_IGRACKA_URL = 'http://localhost:9000/igracka/delete/';
  private SAVE_IGRACKA_URL = 'http://localhost:9000/igracka/save';
  private UPDATE_IGRACKA_URL = 'http://localhost:9000/igracka/update';
  private GET_ALL_NARUDZBENICA_URL = 'http://localhost:9000/narudzbenica/get/all';
  private GET_BY_ID_NARUDZBENICA_URL = 'http://localhost:9000/narudzbenica/get/';
  private DELETE_NARUDZBENICA_URL = 'http://localhost:9000/narudzbenica/delete/';
  private SAVE_NARUDZBENICA_URL = 'http://localhost:9000/narudzbenica/save';
  private UPDATE_NARUDZBENICA_URL = 'http://localhost:9000/narudzbenica/update/';
  private GET_ALL_KATALOG_URL = 'http://localhost:9000/katalog/get/all';
  private GET_BY_ID_KATALOG_URL = 'http://localhost:9000/katalog/get/';
  private DELETE_KATALOG_URL = 'http://localhost:9000/katalog/delete/';
  private SAVE_KATALOG_URL = 'http://localhost:9000/katalog/save';
  private UPDATE_KATALOG_URL = 'http://localhost:9000/katalog/update/';

  getAllKupac(): Observable<KupacDto[]> {
    return this.http.get<KupacDto[]>(this.GET_ALL_KUPAC_URL);
  }
  getKupac(id: string): Observable<any> {
    return this.http.get(this.GET_BY_ID_KUPAC_URL + id);
  }
  deleteKupac(id: string): Observable<any> {
    return this.http.delete(this.DELETE_KUPAC_URL + id);
  }
  saveKupac(kupac: KupacDto): Observable<KupacDto> {
    return this.http.post<KupacDto>(this.SAVE_KUPAC_URL, kupac);
  }
  updateKupac(kupac: KupacDto): Observable<KupacDto> {
    return this.http.put<KupacDto>(this.UPDATE_KUPAC_URL, kupac);
  }

  getAllIgracka(): Observable<IgrackaDto[]> {
    return this.http.get<IgrackaDto[]>(this.GET_ALL_IGRACKA_URL);
  }
  getIgracka(id: string): Observable<any> {
    return this.http.get(this.GET_BY_ID_IGRACKA_URL + id);
  }
  deleteIgracka(id: string): Observable<any> {
    return this.http.delete(this.DELETE_IGRACKA_URL + id);
  }
  saveIgracka(igracka: IgrackaDto): Observable<IgrackaDto> {
    return this.http.post<IgrackaDto>(this.SAVE_IGRACKA_URL, igracka);
  }
  updateIgracka(igracka: IgrackaDto): Observable<IgrackaDto> {
    return this.http.put<IgrackaDto>(this.UPDATE_IGRACKA_URL, igracka);
  }

  getAllNarudzbenica(): Observable<NarudzbenicaDto[]> {
    return this.http.get<NarudzbenicaDto[]>(this.GET_ALL_NARUDZBENICA_URL);
  }
  getNarudzbenica(id: string): Observable<any> {
    return this.http.get(this.GET_BY_ID_NARUDZBENICA_URL + id);
  }
  deleteNarudzbenica(id: string): Observable<any> {
    return this.http.delete(this.DELETE_NARUDZBENICA_URL + id);
  }
  saveNarudzbenica(narudzbenica: NarudzbenicaDto): Observable<NarudzbenicaDto> {
    return this.http.post<NarudzbenicaDto>(this.SAVE_NARUDZBENICA_URL, narudzbenica);
  }
  updateNarudzbenica(narudzbenica: NarudzbenicaDto, id: string): Observable<NarudzbenicaDto> {
    return this.http.put<NarudzbenicaDto>(this.UPDATE_NARUDZBENICA_URL + id, narudzbenica);
  }

  getAllKatalog(): Observable<KatalogDto[]> {
    return this.http.get<KatalogDto[]>(this.GET_ALL_KATALOG_URL);
  }
  getKatalog(id: string): Observable<any> {
    return this.http.get(this.GET_BY_ID_KATALOG_URL + id);
  }
  deleteKatalog(id: string): Observable<any> {
    return this.http.delete(this.DELETE_KATALOG_URL + id);
  }
  saveKatalog(katalog: KatalogDto): Observable<KatalogDto> {
    return this.http.post<KatalogDto>(this.SAVE_KATALOG_URL, katalog);
  }
  updateKatalog(katalog: KatalogDto, id: string): Observable<KatalogDto> {
    return this.http.put<KatalogDto>(this.UPDATE_KATALOG_URL + id, katalog);
  }

}
