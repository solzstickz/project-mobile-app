import { DatapassService } from './../../datapass.service';
import { ReportdetailPage } from './reportdetail/reportdetail.page';
import { Component, OnInit } from '@angular/core';
import { ModalController, MenuController, NavController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { HttpClientModule , HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-report',
  templateUrl: 'report.page.html',
  styleUrls: ['report.page.scss']
})
export class reportPage {
  apireportid:any[] = [];
  datareport:any;
  public data:any;
  constructor(
    private modalController: ModalController,
    private menu: MenuController,
    private navCtrl: NavController,
    private DatapassService:DatapassService,
    private http:HttpClient
  ) {
    
    this.getreportapi();
  }

  async showreportdetail(id:number) {
    this.DatapassService.sendreportid = id;
    console.log("send report id =" + this.DatapassService.sendreportid)
    const ReportdetailPageModule = await this.modalController.create({
      component: ReportdetailPage
    });
    return await ReportdetailPageModule.present();
  }
  OnInit(){

  }
  async getreportapi(){
    const url = `http://jookcafe.com/backend/api_report.php`;
    const response = await fetch(url);
    const result = await response.json();

      console.log(result)
      this.datareport = result;
      this.DatapassService.report = this.datareport

      // for (let i = 0; i < this.apireportid.length; i++) {
      
      // //   report = [{
      // //     projectid:this.apireportid[i].projectid,
      // //     projectname:this.apireportid[i].projectname,
      // //     reaction_time:this.apireportid[i].reaction_time,
      // //     heating_rate:this.apireportid[i].heating_rate,
      // //     report_date:this.apireportid[i].report_date,
         
      // //   }]
   
      // }
 
    }
   
  
  reportdetail_del(){
    Swal.fire({
      title: 'คุณต้องการลบโปรเจ็กต์นี้หรือไม่',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'ลบโปรเจ็กต์เรียบร้อยแล้ว',
          '',
          'success'
        )
      }
    })
  }
}
