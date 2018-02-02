import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";
import { Toast } from '@ionic-native/toast';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import { DatabaseProvider } from './../../providers/database/database';
import {ReferPage} from "../refer/refer";
import {CameraPage} from "../camera/camera";
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

  first_name;
  db: SQLiteObject;
  database: SQLiteObject;
  name : any;
  // public database: SQLite;
  public people: Array<Object>;
  private databaseReady: BehaviorSubject<boolean>;
  constructor(private toast: Toast, private databaseprovider: DatabaseProvider, private sqlite: SQLite,private platform: Platform, public navCtrl: NavController) {
    this.databaseprovider.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.loadDeveloperData();
      }
    })
  }

  loadDeveloperData() {
    this.databaseprovider.getAllDevelopers().then(data => {
      this.developers = data;
      console.log(data);
    })
  }

  addDeveloper() {
    let nav = this.navCtrl;
    this.peopleDetail = {
      name : this.first_name +" "+ this.last_name,
      email : this.email,
      phone_number : this.phone_number
    };
    nav.push(CameraPage, {peopleDetail:this.peopleDetail, animate: true, animation:'transition',duration:300, direction: 'forward'});
    console.log("Button Clicked");
    //TODO Code for inserting in sqlite
    this.databaseprovider.addDeveloper(this.first_name,this.last_name,this.phone_number,this.email)
      .then(data => {
        this.loadDeveloperData();
      });
    this.developer = {};
  }

  Fetchdashboard(){
    // this.sqlite.create({
    //   name: 'data.db',
    //   location: 'default'
    // }).then((db: SQLiteObject) => {
    this.db.executeSql('SELECT firstname AS firstname  FROM people ', {})
      .then(res => {
        if(res.rows.length>0) {
          this.people.push({firstname:res.rows.item(0).firstname});
          // for(var i=0; i<res.rows.length; i++) {
          //   this.people.push({firstname:res.firstname.item(i).type,lastname:res.rows.item(i).lastname})
          // }
          console.log("name->" + res.rows.item(0).firstname);
          console.log("Itesm->" + this.people);
          alert("Data saved " + this.name);
        }
      })
      .catch(e => {
        console.log(e);
        this.toast.show(e, '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      });


    // console.log("phone_number->" + this.phone_number +" " + "last_name" + this.last_name);
    // this.sqlobj.executeSql("INSERT INTO people (firstname, lastname) VALUES ('Nic', 'Raboy')", []).then((data) => {
    //   console.log("INSERTED: " + JSON.stringify(data));
    //   alert("INSERTED: " + JSON.stringify(data));
    // }, (error) => {
    //   console.log("ERROR: " + JSON.stringify(error.err));
    // });
  // })
  }
  // fillDatabase() {
  //   this.http.get('assets/dummyDump.sql')
  //     .map(res => res.text())
  //     .subscribe(sql => {
  //       this.sqlitePorter.importSqlToDb(this.database, sql)
  //         .then(data => {
  //           this.databaseReady.next(true);
  //           this.storage.set('database_filled', true);
  //         })
  //         .catch(e => console.error(e));
  //     });
  // }
}
