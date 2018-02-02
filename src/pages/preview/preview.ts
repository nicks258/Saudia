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
  imagepath: any;
  developer = {};
  users: any;
  data;
  baseImageString;
  postBody ={};
  developers = [];
  fileName: any;
  peopleDetail = {
    name:'',
    email:'',
    phone_number:''
  };
  constructor(public http :Http,public network:Network,private navParams:NavParams, private toast: Toast, private databaseprovider: DatabaseProvider, private sqlite: SQLite,private platform: Platform, public navCtrl: NavController, private fileOpener: FileOpener, private file: File) {


    let body = new FormData();
    body.append('user_id', "yy");
    body.append('password',"oo");

    let headers = new Headers();
    let options = { headers: headers };


    this.http.post('http://saudia.digitalpico.com/login_rest/', body , options ).subscribe(data => {


      var data_to_use = data.json();


        alert(data_to_use);


    });



    this.fileName = "data:image/png;base64," + navParams.get('file_name_final');
    this.baseImageString = navParams.get('file_name_final');
    this.peopleDetail = navParams.get('people_detail');
    // alert(this.fileName);
    this.imagepath = this.file.dataDirectory + '/' + this.fileName;

    this.network.onConnect().subscribe(data => {
      console.log(data);
      this.displayNetworkUpdate(data.type);
    }, error => console.error(error));

    this.network.onDisconnect().subscribe(data => {
      console.log(data);
      this.displayNetworkUpdate(data.type);
    }, error => console.error(error));
    console.log("file->" + this.imagepath);
    console.log("file->" + this.imagepath);

    // this.fileOpener.open(this.file.dataDirectory+'/'+this.fileName, 'image/png')
    //  .then(() => console.log('File is opened'))
    //  .catch(e => console.log('Error openening file', JSON.stringify(e)));
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad PreviewPage');
  // }
  // sent(){
  //   // this.addDeveloper();
  //   console.log("Function Runs");
  //   this.sendToServer();
  //   // {username: this.data.username});
  //
  // }
  // reShoot(){
  //   let nav = this.navCtrl;
  //   nav.push(CameraPage, {peopleDetail:this.peopleDetail, animate: true, animation:'transition',duration:300, direction: 'forward'});
  // }
  loadDeveloperData() {
    this.databaseprovider.getAllDevelopers().then(data => {
      this.developers = data;
      console.log(data);
    })
  }

  addDeveloper() {
    let nav = this.navCtrl;
    // this.peopleDetail = {
    //   name : this.first_name +" "+ this.last_name,
    //   email : this.email,
    //   phone_number : this.phone_number
    // };


    console.log("Button Clicked");
    //TODO Code for inserting in sqlite
    this.databaseprovider.addDeveloper(this.peopleDetail.name,this.peopleDetail.email,this.peopleDetail.phone_number,'1')
      .then(data => {
        this.loadDeveloperData();
      });

    this.developer = {};

  }
  displayNetworkUpdate(connectionState: string){
    let networkType = this.network.type;
    console.log("You are now"+ connectionState +"via " +networkType);
  }
  // public pathForImage() {
  //   {
  //     return this.imagepath;
  //   }
  // }
  // sendToServer(){
  //   console.log("Post body Build");
  //   // var headers = new Headers();
  //   // headers.append("Accept", 'application/json');
  //   // headers.append('Content-Type', 'application/json' );
  //   // let options = new RequestOptions({ headers: headers });
  //   let body = new FormData();
  //   body.append('name', this.peopleDetail.name);
  //   body.append('location', 'jaipur');
  //   body.append('email', "uuuuu");
  //   body.append('mobile', "iijjhjkh");
  //   body.append('photo_base_64', "hghjghjg");
  //   body.append('clicked_on', "24 jan 2018 11:30 pm");
  //   body.append('user_id',  'saudia_dubai');
  //   body.append('password', 'SD#123');
  //
  //   let headers = new Headers();
  //   let options = { headers: headers };
  //   this.postBody = {
  //     location :'jaipur',
  //     name : this.peopleDetail.name,
  //     email: this.peopleDetail.email,
  //     mobile : this.peopleDetail.phone_number,
  //     photo_base_64: this.baseImageString,
  //     clicked_on: new Date().toISOString(),
  //     user_id : 'saudia_dubai',
  //     password: 'SD#123'
  //   };
  //   console.log("Post body sent");
  //   this.http.post("http://www.mojitolabs.com/api/login.php",{email:"mehrasumit258@gmail.com", password : "27021990"})
  //     .map(res => res.json())
  //     .subscribe(data => {
  //       this.data = data;
  //       console.log(this.data);
  //     });
  //   // this.http.post("http://rayqube.com/projects/saudia_photobooth/saveclick_rest",body,options)
  //   //   .subscribe(data => {
  //   //     console.log(data['_body']);
  //   //   }, error => {
  //   //     console.log("Error "+error);// Error getting the data
  //   //   });
  //   console.log("Post completed sent");
  // }

  // getUsers() {
  //   if (this.data) {
  //     return Promise.resolve(this.data);
  //   }
  //
  //   return new Promise(resolve => {
  //     this.http.get('http://saudia-photobooth.springsportsacademy.com/saveclick_rest')
  //       .map(res => res.json())
  //       .subscribe(data => {
  //         this.data = data;
  //         resolve(this.data);
  //       });
  //   });
  // }
//   postRequest() {
//
//     var headers = new Headers();
//     headers.append("Accept", 'application/json');
//     headers.append('Content-Type', 'application/json' );
//     let options = new RequestOptions({ headers: headers });
//
//     let postParams = {
//       title: 'foo',
//       body: 'bar',
//       userId: 1
//     };
//
//
//
// }

}
