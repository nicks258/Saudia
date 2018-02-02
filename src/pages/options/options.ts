import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DatabaseProvider} from "../../providers/database/database";

/**
 * Generated class for the OptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-options',
  templateUrl: 'options.html',
})
export class OptionsPage {
  username:any;
  password:any;
  developers = [];
  developer = {};
  location:any;
  constructor(public databaseprovider:DatabaseProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OptionsPage');
  }
  authenticate(){

  }
  sync(){
    this.databaseprovider.getAllDevelopers().then(data => {
      this.developers = data;
      console.log(data);
    })
  }
}
