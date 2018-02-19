import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SQLite } from '@ionic-native/sqlite';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Toast } from '@ionic-native/toast';
import { DatabaseProvider } from '../providers/database/database';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import {ReferPage} from "../pages/refer/refer";
import { File } from '@ionic-native/file';
import {ScreensaverPage} from "../pages/screensaver/screensaver";
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { CameraPage} from "../pages/camera/camera";
import {CameraPreview} from "@ionic-native/camera-preview";
import {FileOpener} from "@ionic-native/file-opener";
import {TestPage} from "../pages/test/test";
import {PreviewPage} from "../pages/preview/preview";
import {Network} from "@ionic-native/network";
import {OptionsPage} from "../pages/options/options";
import {NativeStorage} from "@ionic-native/native-storage";
import {HomescreenPage} from "../pages/homescreen/homescreen";
import {Screenshot} from "@ionic-native/screenshot";
import { ScreenOrientation } from '@ionic-native/screen-orientation';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TestPage,
    PreviewPage,
    OptionsPage,
    ReferPage,
    HomescreenPage,
    ScreensaverPage,
    CameraPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp,{scrollAssist:false,
                                      autoFocusAssist:false}),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // ReferPage,
    PreviewPage,
    HomePage,
    ScreensaverPage,
    TestPage,
    OptionsPage,
    HomescreenPage,
    CameraPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    NativeStorage,
    CameraPreview,
    FileOpener,
    Network,
    Screenshot,
    ScreenOrientation,
    HttpModule,
    File,
    Toast,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    SQLitePorter
  ]
})
export class AppModule {}
