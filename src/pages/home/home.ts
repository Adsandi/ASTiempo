import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TiempoProvider } from '../../providers/tiempo/tiempo';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public datosTiempo: any;
  public idMunicipio2 = '06083';//Merida predeterminado por si algo falla
  public mostrar = false;

  constructor(public navCtrl: NavController, public tiempoProvider: TiempoProvider, public storage: Storage) {

  }

  ionViewWillEnter() {
    console.log("1 mostrar: " + this.mostrar + " municipio: " + this.idMunicipio2);
    //--STORAGE--
    this.storage.get('idMunicipio').then((val) => {
      console.log("val: " + val + " json :" + JSON.stringify(JSON.parse(val)));
      //cualquier cosa almacenada en el storage, estará en "val"
      console.log("2 mostrar: " + this.mostrar + " municipio: " + this.idMunicipio2);
      if (val != null) {
        this.idMunicipio2 = JSON.parse(val);
        console.log("3 mostrar: " + this.mostrar + " municipio: " + this.idMunicipio2);
      } else {
        this.idMunicipio2 = '06083';//Merida predeterminado
      }
      this.getMetadatos();
    });
    console.log(this.tiempoProvider.getDatos(this.idMunicipio2));
    console.log("4 mostrar: " + this.mostrar + " municipio: " + this.idMunicipio2);
   
  }

  async getMetadatos() {
    await this.tiempoProvider.getDatos(this.idMunicipio2).then((data => { this.datosTiempo = data }));
    console.log(this.tiempoProvider.getDatos(this.idMunicipio2));
    this.mostrar = true;
  }

}
