import { Component } from '@angular/core';
import {LoadingController, NavController, NavParams, Platform} from 'ionic-angular';
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";
import { Toast } from '@ionic-native/toast';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import { DatabaseProvider } from './../../providers/database/database';
import {ReferPage} from "../refer/refer";
import {CameraPage} from "../camera/camera";
import {NativeStorage} from "@ionic-native/native-storage";
import {Headers, Http} from "@angular/http";
import {HomescreenPage} from "../homescreen/homescreen";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  developer = {};
  developers = [];
  email;
  peopleDetail = {};
  phone_number;
  last_name;
  location;
  username;
  password;
  optionSelected;
  first_name;
  db: SQLiteObject;
  database: SQLiteObject;
  name : any;
  // public database: SQLite;
  public people: Array<Object>;
  private databaseReady: BehaviorSubject<boolean>;
  constructor( public nativeStorage:NativeStorage,public loadingCtrl: LoadingController,public navParams: NavParams,public http:Http , private toast: Toast, private databaseprovider: DatabaseProvider, private sqlite: SQLite,private platform: Platform, public navCtrl: NavController) {
    this.optionSelected = this.navParams.get("optionSelected");
    this.databaseprovider.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        // this.loadDeveloperData();
      }
    })
  }

  // loadDeveloperData() {
  //   this.databaseprovider.getAllDevelopers().then(data => {
  //     this.developers = data;
  //     console.log(data);
  //   })
  // }

  addDeveloper() {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(this.email)) {
      // Invalid Email
      alert("Email is not valid !!");
    }
    else {
      this.nativeStorage.getItem('authentication')
        .then(
          data => console.log(data.username + "->" + data.password + "->" + data.location,
            this.location = data.location,
            this.username = data.username,
            this.password = data.password),
          error => console.error(error)
        );
      let nav = this.navCtrl;
      this.peopleDetail = {
        location: this.location,
        username: this.username,
        password: this.password,
        name: this.first_name + " " + this.last_name,
        email: this.email,
        phone_number: this.phone_number
      };
      if (this.optionSelected == ("refer")) {
        console.log("Take A refer");
        this.addLocalDB();
        this.sendToServer();
      }
      else {
        console.log("Take -> " + this.optionSelected);
        nav.push(CameraPage, {
          peopleDetail: this.peopleDetail,
          animate: true,
          animation: 'transition',
          duration: 300,
          direction: 'forward'
        });
      }


      //
      console.log("Button Clicked");
      //TODO Code for inserting in sqlite
      // this.databaseprovider.addDeveloper(this.first_name, this.last_name, this.phone_number, this.email)
      //   .then(data => {
      //     // this.loadDeveloperData();
      //   });
      // this.developer = {};
    }
  }

  addLocalDB() {
    let nav = this.navCtrl;
    console.log("Button Clicked");
    //TODO Code for inserting in sqlite
    this.databaseprovider.addReferEntry(this.first_name +" " + this.last_name,this.phone_number,this.email,"0")
      .then(data => {

      });

    this.developer = {};

  }


  sendToServer() {
    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading your data...',
      spinner: 'circles'
    });
    let body = new FormData();
    let date = new Date(new Date().toISOString());

    body.append('location', "Saudia boarding photo booth");
    body.append('name', this.first_name + " " + this.last_name);
    body.append('mobile', this.phone_number);
    body.append('email', this.email);
    body.append('submitted_on', date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());
    body.append('user_id', "saudia_dubai");
    body.append('password', "SD#123");
    let headers = new Headers();
    let options = {headers: headers};
    this.http.post('http://rayqube.com/projects/saudia_photobooth/savereferal_rest/', body, options).subscribe(data => {
      console.log("Data->>>" + data);
      // let data_to_use = data.json();
      loadingPopup.dismiss();
      this.navCtrl.push(HomescreenPage, {animate: true, animation: 'transition', duration: 300, direction: 'forward'});
      // console.log(data_to_use);
    }), error2 => {
      loadingPopup.dismiss();
      console.log("error->" + error2);

    };
    this.moveToNexTPage();
  }
  moveToNexTPage(){
    this.navCtrl.push(HomescreenPage, {animate: true, animation: 'transition', duration: 300, direction: 'forward'});
  }

  loadDeveloperData() {
    this.databaseprovider.getAllRefer().then(data => {
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

  sentReferToServer(){
    let body = new FormData();
    let date = new Date(new Date().toISOString());

    body.append('location', "Saudia boarding photo booth");
    body.append('name',this.first_name + " " + this.last_name);
    body.append('mobile',this.phone_number);
    body.append('email',this.email);
    body.append('clicked_on',date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate());
    body.append('user_id',"saudia_dubai");
    body.append('password',"SD#123");
    let headers = new Headers();
    let options = { headers: headers };
    this.http.post('http://rayqube.com/projects/saudia_photobooth/savereferal_rest/', body , options ).subscribe(data => {
      console.log(data);
      let data_to_use = data.json();
      console.log(data_to_use);
    });
  }
}
