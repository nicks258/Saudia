import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DatabaseProvider} from "../../providers/database/database";
import {NativeStorage} from "@ionic-native/native-storage";
import {Http} from "@angular/http";

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
  refer = [];
  developer = {};
  location:any;
  constructor(public nativeStorage: NativeStorage, public databaseprovider:DatabaseProvider, public navCtrl: NavController, public navParams: NavParams,private http:Http) {
    this.loadDeveloperData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OptionsPage');
  }
  authenticate(){
    this.nativeStorage.setItem('authentication', {username: this.username, password: this.password,location: this.location})
      .then(
        () => console.log('Stored item!'),
        error => console.error('Error storing item', error)
      );
    console.log("Native Storage->>");

  }

  sync(){
    // this.databaseprovider.getAllDevelopers().then(data => {
    //   this.developers = data;
    //   console.log(data);
      this.loadDeveloperData();


  }

  loadDeveloperData() {
    this.databaseprovider.getAllDevelopers().then(data => {
      this.developers = data;
      console.log(data);
      // this.developers.forEach(functionToIterate);
      for(let dev of this.developers)
      {
        // console.log(dev.firstname + "->" + dev.lastname + "->" + dev.email);
        console.log(dev.name + "->" + dev.phonenumber + "->" + dev.email);
        this.sentReferWithImageToServer(dev.name,dev.phonenumber,dev.email,dev.image);
        setTimeout(300)
      }
    })
  }
  syncRefer(){
    this.databaseprovider.getAllRefer().then(data => {
      this.refer = data;
      console.log(data);
      // this.developers.forEach(functionToIterate);
      for(let dev of this.developers)
      {
        console.log(dev.name + "->" + dev.phonenumber + "->" + dev.email);
        this.sentReferToServer(dev.name,dev.phonenumber,dev.email);
        setTimeout(300)
      }
    })
  }
  sentReferToServer(name,phoneNumber,email){
    let body = new FormData();
    let date = new Date(new Date().toISOString());

    body.append('location', "Saudia boarding photo booth");
    body.append('name',name);
    body.append('mobile',phoneNumber);
    body.append('email',email);
    body.append('clicked_on',date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate());
    body.append('user_id',"saudia_dubai");
    body.append('password',"SD#123");
    let headers = new Headers();
    let opt = { headers: headers };
    this.http.post('http://rayqube.com/projects/saudia_photobooth/savereferal_rest/', body).subscribe(data => {
      console.log(data);
      let data_to_use = data.json();
      console.log(data_to_use);
    });
  }

  sentReferWithImageToServer(name, phoneNumber, email,image){
    let body = new FormData();
    let date = new Date(new Date().toISOString());

    body.append('location', "Saudia boarding photo booth");
    body.append('name',name);
    body.append('mobile',phoneNumber);
    body.append('email',email);
    body.append('photo_base_64',image);
    body.append('clicked_on',date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate());
    body.append('user_id',"saudia_dubai");
    body.append('password',"SD#123");
    let headers = new Headers();
    let opt = { headers: headers };
    this.http.post('http://rayqube.com/projects/saudia_photobooth/saveclick_rest/', body).subscribe(data => {
      console.log(data);
      let data_to_use = data.json();
      console.log(data_to_use);
    });
  }

}
