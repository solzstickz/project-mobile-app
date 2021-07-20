import { CircleProgressComponent, CircleProgressOptions } from 'ng-circle-progress';

import { HttpClientModule , HttpClient } from '@angular/common/http';
import { DatapassService } from './../../datapass.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { CreProjectPage } from '../dashboard/cre-project/cre-project.page';
import { SettProjectPage } from '../dashboard/sett-project/sett-project.page'
import Swal from 'sweetalert2';
import { Chart } from 'chart.js';
import { ModalController, MenuController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { on, title } from 'process';
import { CountdownComponent, CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-tab1',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss']
})
export class dashboardPage implements OnInit {
  @ViewChild('countdown', { static: false }) private countdown: CountdownComponent;
  @ViewChild('circleProgress') circleProgress: CircleProgressComponent;
  timeData = "0"
  checked: boolean = false;
  status_checked: string = "OFF";
  cre_project:any;
  dataitem:any = {};
  temp = 20;
  temp_line = '';


 projectid:any;
 projectname:any; 
 hours:any;
 min:any;
 sum_min:any;
 sec:any;
 weight:any;
 temp_limit:any;
 temp_start:any;
 date:any;

 
  constructor(
    private modalController: ModalController,
    private navCtrl: NavController,
    private menu: MenuController,
    private ActivatedRoute:ActivatedRoute,
    private DatapassService:DatapassService,
    private http:HttpClient
  ) {
    
  
    setInterval(function update(){ 
   
    }, 1000);

    if (this.temp >= 80 ) {
      this.temp_line = '#ff0000';
    }else if (this.temp >= 60) {
      this.temp_line = '#ff6f00';
    }else{
      this.temp_line = '#78C000';
    }
  }

  

  ionViewWillEnter(){
    this.check_status();
  }

  check_status(){

    this.cre_project = this.DatapassService.creproject;
  
 

    var status_creproject = this.cre_project
    if (status_creproject != undefined) {
      console.log('Dashboard: Datapass')
      var projectid = this.cre_project.projectid;
      this.projectname = this.cre_project.projectname;
      var hours = this.cre_project.hours;
      var min = this.cre_project.min;
      var sum_min = this.cre_project.sum_min;
      var sec = this.cre_project.sec;
      var weight = this.cre_project.weight;
      var temp_limit = this.cre_project.temp_limit;
      var temp_start = this.cre_project.temp_start;
      var date = this.cre_project.date;
      this.saveproject()
    }else{
      console.log('Dashboard: Dont project')
    }
  }
  
  
  ngOnInit() {
    // location.reload();
    this.mycharts();
  
    
  }

 
   

  saveproject() {
        this.cre_project = this.DatapassService.creproject;
        var projectname = this.cre_project.projectname
        var hours = this.cre_project.hours
        var min = this.cre_project.min
        var sum_min = this.cre_project.sum_min
        var sec = this.cre_project.sec
        var weight = this.cre_project.weight
        var temp_limit = this.cre_project.temp_limit
        var temp_start = this.cre_project.temp_start
        var date = this.cre_project.date
        const url = `https://jookcafe.com/backend/insert_creproject.php?projectname=${projectname}&hours=${hours}&min=${min}&sum_min=${sum_min}&sec=${sec}&weight=${weight}&date=${date}&temp_limit=${temp_limit}&temp_start=${temp_start}`;
        const response = fetch(url);
        Swal.fire({
          icon: 'success',
          title: 'บันทึกโปรเจ็กต์:' + projectname +'เรียบร้อยแล้ว',
          showConfirmButton: false,
          timer: 1500,
    
        })
        
     
      }
    
    // let url: string = "https://jookcafe.com/backend/insert_creproject.php";
    // // console.log("test url" + url)
    // let postdata = new FormData();
    // postdata.append('projectname',this.cre_project.projectname)
    // postdata.append('hours',this.cre_project.hours)
    // postdata.append('min',this.cre_project.min)
    // postdata.append('sum_min',this.cre_project.sum_min)
    // postdata.append('sec',this.cre_project.sec)
    // postdata.append('weight',this.cre_project.weight)
    // postdata.append('temp_limit',this.cre_project.temp_limit)
    // postdata.append('temp_start',this.cre_project.temp_start)
    // postdata.append('date',this.cre_project.date)

    // let callback:Observable<any> = this.http.post(url,postdata);
    // callback.subscribe(call =>{
    //   if (call.status == 1){
    //     console.log(call.msg);
    //   }else{
    //     console.log(call.msg);
    //   }
    // })

  

  handleEvent(event) {
    if (event.action === 'notify') {
      console.log('Hi!');
    }
  }

  pause() {
    this.countdown.pause();
  }

  start() {
    this.countdown.begin();
  }

  Clicked() {
    this.cre_project = this.DatapassService.creproject;
    var sec = this.cre_project.sec;
  

    if (this.checked = !this.checked) {
      this.status_checked = "ON";
      this.timeData = sec;
      this.countdown.begin();

    
      // console.log(typeof(this.cre_project));
      console.log(this.cre_project.sec)

    } else {
      this.status_checked = "OFF";
      this.countdown.pause();

    }
  }



  cd() {
    var cd: number = 10
    return cd
  }

  mycharts() {

    var ctx = (<any>document.getElementById('canvas-chart')).getContext('2d');
    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
        labels: ["0", "5", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55", "60", "65", "70", "75", "80", "85", "90", "95", "100", "105", "110", "115", "120"],

        datasets: [{
          label: "CHART",
          color: "#FFFFFF",
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          data: ["0", "25", "25", "30", "35", "37", "45", "46", "49", "50", "50", "50", "50", "55", "70", "70", "70", "75", "90", "95", "100", "105", "110", "105", "107"],
          borderWidth: 3,


        },
        {
          label: "Limit",
          borderColor: [
            '#FFFF00'
          ],
          data: ["110", "110", "110", "110", "110", "110", "110", "110", "110", "110", "110", "110", "110", "110", "110", "110", "110", "110", "110", "110", "110", "110", "110", "110", "110"],
          borderWidth: 1,
        },

        ]
      },
      options: {
        plugins: {
          legend: {
            labels: {
              // This more specific font property overrides the global property
              font: {
                size: 100
              }
            }
          }
        },
        scales: {
          yAxes: [{

            display: true,
            gridLines: {
              display: true,
              color: "#ffffff21"
            },
            scaleLabel: {
              display: true,
              labelString: 'Temp(°C)',
              fontColor: 'white',
              fontSize: 14,

            },
            ticks: {
              beginAtZero: true,
              fontSize: 20,
              // fontStyle: 'bold',
              title: 'Temp',
              borderColor: 'rgb(255,255,255)'
            }
          }],
          xAxes: [{
            display: true,
            gridLines: {
              display: true,
              color: "#ffffff21"
            },
            scaleLabel: {
              display: true,
              labelString: 'Time(Min)',
              fontColor: 'white',
              fontSize: 14,

            },
            ticks: {
              fontSize: 20,
              // fontStyle: 'bold'
            }
          }],

        },
      }
    }
    );
  }


  del_project() {
    Swal.fire({
      title: 'คุณต้องการลบโปรเจ็กต์นี้หรือไม่',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'ต้องการบันทึก report หรือไม่',
          text: "",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#28a745',
          cancelButtonColor: '#d33',
          confirmButtonText: 'บันทึก',
          cancelButtonText: 'ไม่บันทึก',
        }).then((result) => {
          if (result.isConfirmed) {
              
            Swal.fire(
              'ลบโปรเจ็กต์สำเร็จ',
              '',
              'success'
            )
          } else {
            Swal.fire(
              'ลบโปรเจ็กต์สำเร็จ',
              '',
              'success'
            )

          }
        })
        
      } else {

      }
    })
  }


  // async creproject() {
  //   const CreProjectPageModule = await this.modalController.create({
  //     component: CreProjectPage,
  //   });
  //   return await CreProjectPageModule.present();
  // }
  goto_creproject(){
    this.navCtrl.navigateForward('app/tabs/dashboard/cre-project')
  }

  async settproject() {
    const SettProjectPageModule = await this.modalController.create({
      component: SettProjectPage,
    });
    return await SettProjectPageModule.present();
  }
  // current: number = 50;
  // max: number = 100;
  // stroke: number = 15;
  // radius: number = 125;
  // semicircle: boolean = false;
  // rounded: boolean = false;
  // responsive: boolean = false;
  // clockwise: boolean = true;
  // color: string = '#45ccce';
  // background: string = '#eaeaea';
  // duration: number = 800;
  // animation: string = 'easeOutCubic';
  // animationDelay: number = 0;
  // animations: Array<string> = [
  //   'linearEase',
  //   'easeInQuad',
  //   'easeOutQuad',
  //   'easeInOutQuad',
  //   'easeInCubic',
  //   'easeOutCubic',
  //   'easeInOutCubic',
  //   'easeInQuart',
  //   'easeOutQuart',
  //   'easeInOutQuart',
  //   'easeInQuint',
  //   'easeOutQuint',
  //   'easeInOutQuint',
  //   'easeInSine',
  //   'easeOutSine',
  //   'easeInOutSine',
  //   'easeInExpo',
  //   'easeOutExpo',
  //   'easeInOutExpo',
  //   'easeInCirc',
  //   'easeOutCirc',
  //   'easeInOutCirc',
  //   'easeInElastic',
  //   'easeOutElastic',
  //   'easeInOutElastic',
  //   'easeInBack',
  //   'easeOutBack',
  //   'easeInOutBack',
  //   'easeInBounce',
  //   'easeOutBounce',
  //   'easeInOutBounce',
  // ];
  // gradient: boolean = false;
  // realCurrent: number = 0;

  // increment(amount = 1) {
  //   this.current += amount;
  // }

  // getOverlayStyle() {
  //   const isSemi = this.semicircle;
  //   const transform = (isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';

  //   return {
  //     top: isSemi ? 'auto' : '45%',
  //     bottom: isSemi ? '5%' : 'auto',
  //     left: '50%',
  //     transform,
  //     'font-size': this.radius / 5.0 + 'px',
  //   };
  // }

  // getOverlayStyle2() {
  //   const isSemi = this.semicircle;
  //   const transform = (isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';

  //   return {
  //     top: isSemi ? 'auto' : '60%',
  //     bottom: isSemi ? '5%' : 'auto',
  //     left: '50%',
  //     transform,
  //     'font-size': this.radius / 7.0 + 'px',
  //   };
  // }




}









