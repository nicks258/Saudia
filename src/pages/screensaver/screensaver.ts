import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, } from 'ionic-angular';
import {HomePage} from "../home/home";
import {ReferPage} from "../refer/refer";
import {Network} from "@ionic-native/network";
import {Toast} from "@ionic-native/toast";
import {CameraPage} from "../camera/camera";
import {Headers, Http} from "@angular/http";
import {OptionsPage} from "../options/options";


/**
 * Generated class for the ScreensaverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-screensaver',
  templateUrl: 'screensaver.html',
})
export class ScreensaverPage {

  constructor( public http :Http,public toast: Toast,public network:Network, public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScreensaverPage');
  }
  options(){
    this.navCtrl.push(OptionsPage,{animate: true, animation:'transition',duration:300, direction: 'forward'})
  }
  enterADraw(){
    let nav = this.navCtrl;
    nav.push(ReferPage, {animate: true, animation:'transition',duration:300, direction: 'forward'});
  }
  takeAShot(){
    let nav = this.navCtrl;
    console.log("Take A Shot");
    nav.push(HomePage, {animate: true, animation:'transition',duration:300, direction: 'forward'});
  }

}
