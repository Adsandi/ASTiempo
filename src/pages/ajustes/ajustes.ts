import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as papa from 'papaparse';

@IonicPage()
@Component({
  selector: 'page-ajustes',
  templateUrl: 'ajustes.html',
})
export class AjustesPage {
  //npm install papaparse --save para los .csv
  //Aqui en un principio se controlará el storage

  public idMunicipio;
  public form: FormGroup;

  public csvData: any[] = [];
  public headedRow: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: HttpClient) {
    //Validación Municipio
    this.form = new FormGroup({
      regularMunicipio: new FormControl('', Validators.pattern("[0-9]{5}")),
    });

    this.storage.get('idMunicipio').then((val) => {
      if (val != null) {
        this.idMunicipio = JSON.parse(val);
      } else {
        this.idMunicipio = '06083';//Merida Default
      }
    });
  }

  ionViewDidLoad() {
    console.log('ajustes funciona loco');
  }
  saveForm() {
    let idMunicipio = this.idMunicipio;

    console.log(idMunicipio);

    this.storage.set('idMunicipio', JSON.stringify(idMunicipio));
    this.navCtrl.push(HomePage);
  }

  readCsvData() {
    this.http.get('assets/19codmun06.csv').subscribe(
      data => this.extractData(data),
      err => this.handleError(err));

  }
  extractData(res) {
    let csvData = res['_body'] || '';
    let parsedData = papa.parse(csvData).data;

    this.headedRow = parsedData[0];
    parsedData.splice(0, 1);
    this.csvData = parsedData;

  }
  trackByFn(index: any, item: any) {
    return index;
  }
  handleError(err) {

  }
}
