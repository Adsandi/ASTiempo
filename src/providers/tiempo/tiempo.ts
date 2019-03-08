import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class TiempoProvider {

  public apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZHNhbmRpYXpAaG90bWFpbC5lcyIsImp0aSI6IjMyMjI4Y2ViLTE1NTItNGY3Ny1iNWIwLTY0NGFhNDczMDRiMiIsImlzcyI6IkFFTUVUIiwiaWF0IjoxNTUxODEyNDk2LCJ1c2VySWQiOiIzMjIyOGNlYi0xNTUyLTRmNzctYjViMC02NDRhYTQ3MzA0YjIiLCJyb2xlIjoiIn0.dd-3uBr9Dr-zIEhAHtoYvqGU1xLc0g_kS0GMJBMXOoc';
  public url;

  constructor(public http: HttpClient) {
  }
  
  getTiempo(idMunicipio): Promise<any> {
    return new Promise((resolve) => {
      this.http.get<any>('https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/' + idMunicipio + '?api_key=' + this.apiKey + '').subscribe(
        datos => resolve(datos)
      )
    });
  }

  //__zone_symbol__value

  getDatos(idMunicipio): Promise<any> {
    return new Promise(resolve => {
      this.getTiempo(idMunicipio).then((data) => {
        this.http.get<any>(data.datos).subscribe(datos => {
          resolve(datos[0]);
        });
      });
    })
  }
}
