import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {FileOpener} from "@ionic-native/file-opener";
import {File} from "@ionic-native/file";
import {CameraPage} from "../camera/camera";
import {DatabaseProvider} from "../../providers/database/database";
import {Toast} from "@ionic-native/toast";
import {SQLite} from "@ionic-native/sqlite";
import {Network} from "@ionic-native/network";
import { Http, Headers } from '@angular/http';
import {NativeStorage} from "@ionic-native/native-storage";
import {ScreensaverPage} from "../screensaver/screensaver";
import {HomescreenPage} from "../homescreen/homescreen";
import {Screenshot} from "@ionic-native/screenshot";


/**
 * Generated class for the PreviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-preview',
  templateUrl: 'preview.html',
})
export class PreviewPage {
  screen;
  imagepath: any;
  developer = {};
  users: any;
  data;
  baseImageString;
  postBody ={};
  developers = [];
  fileName: any;
  peopleDetail = {
    location:'',
    username:'',
    password:'',
    name:'',
    email:'',
    phone_number:''
  };
  constructor(public screenshot: Screenshot, public nativeStorage: NativeStorage, public http :Http,public network:Network,private navParams:NavParams, private toast: Toast, private databaseprovider: DatabaseProvider, private sqlite: SQLite,private platform: Platform, public navCtrl: NavController, private fileOpener: FileOpener, private file: File) {

    this.fileName = "data:image/png;base64," + navParams.get('file_name_final');
    this.baseImageString = navParams.get('file_name_final');
    this.peopleDetail = navParams.get('people_detail');
    this.imagepath = this.file.dataDirectory + '/' + this.fileName;

    this.screenShotURI();
    // setTimeout(function () {
    //
    // },100);
    // setTimeout(function () {
    //
    // },2000);
    setTimeout(function () {
      console.log("This is called ->navCtrl.push(ScreensaverPage) ");
      navCtrl.push(HomescreenPage)
    },10000);
    // this.network.onDisconnect().subscribe(data => {
    //   console.log(data);
    //   this.displayNetworkUpdate(data.type);
    // }, error => console.error(error));
  }

  reShoot(){
    let nav = this.navCtrl;
    nav.push(CameraPage, {peopleDetail:this.peopleDetail, animate: true, animation:'transition',duration:300, direction: 'forward'});
  }
  loadDeveloperData() {
    this.databaseprovider.getAllDevelopers().then(data => {
      this.developers = data;
      console.log(data);
    })
  }

  addDeveloper() {

    console.log("Button Clicked addDeveloper()");
    //TODO Code for inserting in sqlite
    this.databaseprovider.addDeveloper(this.peopleDetail.name,this.peopleDetail.phone_number,this.peopleDetail.email,this.baseImageString)
      .then(data => {
        this.loadDeveloperData();
      });
    // this.sendToServer();
    this.developer = {};

  }
  displayNetworkUpdate(connectionState: string){
    let networkType = this.network.type;
    console.log("You are now"+ connectionState +"via " +networkType);
  }

  screenShotURI() {
    this.screenshot.URI(20).then(res => {
      this.screen = res.URI;
      this.sendDetailsToServer();
      // this.state = true;
    });
  }
  sendDetailsToServer(){
    let body = new FormData();
    let date = new Date(new Date().toISOString());
    // body.append('location', "jaipur");
    // body.append('name',this.peopleDetail.name);
    // body.append('mobile',this.peopleDetail.phone_number);
    // body.append('email',this.peopleDetail.email);
    // body.append('photo_base_64',this.baseImageString);
    // body.append('clicked_on',new Date().toISOString());
    // body.append('user_id',"nicks");
    // body.append('password',"2702100000");
    // const bytes: string = atob(this.ba);
    // const byteNumbers = new Array(bytes.length);
    // for (let i = 0; i < bytes.length; i++) {
    //   byteNumbers[i] = bytes.charCodeAt(i);
    // }
    // const byteArray = new Uint8Array(byteNumbers);
    //
    // const blob: Blob = new Blob([byteArray], { type: 'image/png' });
    console.log("Base64->> " + this.screen.substr(23));
    this.addDeveloper();
    body.append('location', "Saudia boarding photo booth");
    body.append('name',this.peopleDetail.name);
    body.append('mobile',this.peopleDetail.phone_number);
    body.append('email',this.peopleDetail.email);
    body.append('photo_base_64',this.baseImageString);
    body.append('clicked_on',new Date().toISOString());
    body.append('user_id',"saudia_dubai");
    body.append('password',"SD#123");
    let headers = new Headers();
    let options = { headers: headers };
    this.http.post('http://rayqube.com/projects/saudia_photobooth/saveclick_rest/', body , options ).subscribe(data => {
      console.log(data);
      let data_to_use = data.json();
      console.log(data_to_use);
    },error2 => {
      // loadingPopup.dismiss();



      console.log("error->" + error2);
    });
  }

  sendImagesToServer(){
    let body = new FormData();
    let date = new Date(new Date().toISOString());
    // body.append('location', "jaipur");
    // body.append('name',this.peopleDetail.name);
    // body.append('mobile',this.peopleDetail.phone_number);
    // body.append('email',this.peopleDetail.email);
    // body.append('photo_base_64',this.baseImageString);
    // body.append('clicked_on',new Date().toISOString());
    // body.append('user_id',"nicks");
    // body.append('password',"2702100000");
    console.log("Base64->> " + this.screen.substr(23));
    // var compressed = LZString.compress(str);
    this.addDeveloper();
    body.append('location', "Saudia boarding photo booth");
    body.append('name',this.peopleDetail.name);
    body.append('mobile',this.peopleDetail.phone_number);
    body.append('email',this.peopleDetail.email);
    body.append('photo_base_64',this.baseImageString);
    body.append('clicked_on',new Date().toISOString());
    body.append('user_id',"saudia_dubai");
    body.append('password',"SD#123");
    let headers = new Headers();
    let options = { headers: headers };
    this.http.post('http://rayqube.com/projects/saudia_photobooth/saveclick_rest/', body , options ).subscribe(data => {
      console.log(data);
      let data_to_use = data.json();
      console.log(data_to_use);
    },error2 => {
      // loadingPopup.dismiss();



      console.log("error->" + error2);
    });
  }

}
