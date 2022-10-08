import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey:string = 'WdSnxQtRDmvYx7Glf6RY0ZqKlNWdUget';
  private servicioUrl:string = 'https://api.giphy.com/v1/gifs';
  private _historial:string[] = [];

  // TODO: cambiar any por respuesta correspondiente
  public resultados:Gif[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor(private http:HttpClient){

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];

    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];


    /* if(localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    } */

  }

  buscarGifs(query:string){

    query = query.toLowerCase();

    //Idea para siempre mantener 10
    /* if(this._historial.length >= 10){
      this._historial.pop();
    } */

    if(!this._historial.includes(query)){

      this._historial.unshift(query);
      //otra forma de mantener 10 es con splice
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));

    }

    const params = new HttpParams().set('api_key', this.apiKey).set('limit', '10').set('q', query);

    

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params})
      .subscribe(resp => {
        
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      })
    
    
    
    
  }

}
