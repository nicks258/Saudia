import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DatabaseProvider} from "../../providers/database/database";

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  developers = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,private databaseprovider: DatabaseProvider) {
    this.loadDeveloperData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }
  loadDeveloperData() {
    this.databaseprovider.getAllDevelopers().then(data => {
      this.developers = data;
      console.log(data);
      // this.developers.forEach(functionToIterate);
      function  functionToIterate(){
        for(let dev of this.developers)
        {
          console.log(dev.firstname + "->" + dev.lastname + "->" + dev.email)
        }
      }
    })
  }
}
