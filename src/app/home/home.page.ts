import { AlertService } from '../services/alert.service';

import { Component, OnInit } from '@angular/core';
import { ModalController, MenuController, NavController } from '@ionic/angular';
import { RegisterPage } from "../register/register.page";
import { dashboardPage } from '../pages/dashboard/dashboard.page';
import { ForgotPasswordPage } from '../forgot-password/forgot-password.page';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private modalController: ModalController,
    private menu: MenuController,
    private authService: AuthService,
    private navCtrl: NavController,
    private AlertService: AlertService,
  ) { 
  
  }

  ngOnInit() {
  }

    // Dismiss Login Modal
    dismissLogin() {
      this.modalController.dismiss();
    }
    
  ionViewWillEnter() {
    this.authService.getToken().then(() => {
      if(this.authService.isLoggedIn) {
        this.navCtrl.navigateRoot('/app');
      }
    });
  }

  login(form: NgForm) {
    this.authService.login(form.value).subscribe(
      data => {
        this.AlertService.presentToast("Logged In");
      },
      error => {
        console.log(error);
      },
      () => {
        this.dismissLogin();
        this.menu.enable(true);
        this.navCtrl.navigateRoot('/app');
      }
    );
  }
  

  async register() {
    const registerModal = await this.modalController.create({
      component: RegisterPage
    });
    return await registerModal.present();
  }

  // async login() {
  //   const dashboardModal = await this.modalController.create({
  //     component: dashboardPage,
  //   });
  //   return await dashboardModal.present();
  // }
  async forgetpassword() {
    const forgetpasswordModal = await this.modalController.create({
      component: ForgotPasswordPage,
    });
    return await forgetpasswordModal.present();
  }
}
