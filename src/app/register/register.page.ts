

import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ModalController, MenuController, NavController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { HomePage } from '../home/home.page';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { AlertService } from '../services/alert.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private menu: MenuController,
  ) { }

  ngOnInit() {
  }

  // Dismiss Register Modal
  dismissRegister() {
    this.modalController.dismiss();
  }


  register(form: NgForm) {
    this.authService.register(form.value.firstName, form.value.lastName, form.value.email, form.value.password).subscribe(
      data => {
        this.authService.login(form.value).subscribe(
          data => {
          },
          error => {
            console.log(error);
          },
          () => {
            this.dismissRegister();
            this.menu.enable(true);
            this.navCtrl.navigateRoot('/app');
          }
        );
        this.alertService.presentToast(data['message']);
      },
      error => {
        console.log(error);
      },
      () => {
        
      }
    );
  }
}
