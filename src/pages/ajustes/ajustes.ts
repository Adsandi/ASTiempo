import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as papa from 'papaparse';
import { Http } from '@angular/http';

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
  public headerRow: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: Http) {
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

    this.readCsvData();
  }

  saveForm() {
    let idMunicipio = this.idMunicipio;

    console.log(idMunicipio);

    this.storage.set('idMunicipio', JSON.stringify(idMunicipio));
    this.navCtrl.push(HomePage);
  }
  //CSV
  private readCsvData() {
    this.http.get('assets/codmun06.csv')
      .subscribe(
      data => this.extractData(data),
      err => this.handleError(err)
      );
  }
 
  private extractData(res) {
    let csvData = res['_body'] || '';
    let parsedData = papa.parse(csvData).data;
 
    this.headerRow = parsedData[0];
 
    parsedData.splice(0, 1);
    this.csvData = parsedData;
  }
 
  downloadCSV() {
    let csv = papa.unparse({
      fields: this.headerRow,
      data: this.csvData
    });
 
    //Para descargar en escritorio y movil
    var blob = new Blob([csv]);
    var a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = "newdata.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
 
  private handleError(err) {
    console.log('something went wrong: ', err);
  }
 
  trackByFn(index: any, item: any) {
    return index;
  }
}
