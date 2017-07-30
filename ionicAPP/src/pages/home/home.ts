import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  coords: any;
  lat: any;
  long: any;
  top: any;
  left: any;
  Latitude: any;
  Longitude: any;
  error: any;
  pinHidden: any;

  constructor(private geolocation: Geolocation, public navCtrl: NavController) {

  }

  getPos() {
    this.lat = this.Latitude;
    this.long = this.Longitude;
    this.findme();
    // this.geolocation.getCurrentPosition().then((resp) => {
    // //  this.coords = resp.coords.latitude + ' ' + resp.coords.longitude + '+/-' + resp.coords.accuracy	+ ' ' + resp.coords.heading + ' ' + resp.coords.speed;
    //  this.lat = resp.coords.latitude;
    //  this.long = resp.coords.longitude;
    //  console.log("@@@", this.lat,this.long);
    //  // resp.coords.longitude
    // }).catch((error) => {
    //   console.log('Error getting location', error);
    // });
  }
  watch() {
    this.geolocation.watchPosition().subscribe((data) => {
     // data can be a set of coordinates, or an error (if an error occurred).
     this.lat = data.coords.latitude;
     this.long = data.coords.longitude;
     this.findme();
    });
  }
  findme() {
    this.pinHidden = true;
    this.error = "";
    var pos1 = { top: 110, left: 126, lat: 26.195213, long: 91.688814 };
    var pos2 = {top: 200, left: 305, lat: 26.191553, long: 91.698153};
    var pos3 = {top: 361, left: 260, lat: 26.183925, long: 91.695704};
    console.log(this.lat, this.long);
    var x_dim = (pos2.left - pos1.left)/(pos2.long - pos1.long);
    var y_dim = (pos3.top - pos1.top)/(pos3.lat - pos1.lat);
    var x = (x_dim*(this.long - pos2.long) + pos2.left);
    var y = (y_dim*(this.lat - pos2.lat) + pos2.top);
    if((x < 0 || x > 500) || (y < 0 || y > 500)) {
      console.log("it came here");
      this.error = "It seems you are outside the campus, you can try by putting the right coordinates above.";
    } else {
      this.pinHidden = false;
      this.left = x + 'px';
      this.top = y + 'px';
    }
    console.log(this.left, this.top, this.error);
  }
  setStyle() {

  }
}
