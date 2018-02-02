import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ReferPage} from "../pages/refer/refer";
import { HomePage } from '../pages/home/home';
import { ScreensaverPage} from "../pages/screensaver/screensaver";
import {CameraPage} from "../pages/camera/camera";
import {TestPage} from "../pages/test/test";
import {PreviewPage} from "../pages/preview/preview";
import {OptionsPage} from "../pages/options/options";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = ScreensaverPage;

  constructor(private sqlite: SQLite,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      statusBar.hide();
      splashScreen.hide();

      // this.sqlite.create({
      //   name: 'data.db',
      //   location: 'default'
      // }).then((db: SQLiteObject) => {
      //
      //   db.executeSql("CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT)", {}).then((data) => {
      //     console.log("TABLE CREATED: ", data);
      //   }, (error) => {
      //     console.error("Unable to execute sql", error);
      //   })
      // }, (error) => {
      //   console.error("Unable to open database", error);
      // });
    });
  }
}

