import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavController } from '@ionic/angular';
import { AlertService } from '../../services/alert.service';

import { User } from '../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class profilePage implements OnInit {
  user: User;
  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.authService.user().subscribe(
      user => {
        this.user = user;
      }
    );
  }

  // When Logout Button is pressed 
  logout() {
    this.authService.logout().subscribe(
        data => {
        this.alertService.presentToast(data['message']);        
        },
        error => {
        console.log(error);
        },
        () => {
        this.navCtrl.navigateRoot('/home');
        }
    );
    }
}
