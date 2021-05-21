import {Component, OnInit} from '@angular/core';
import {VehicleService} from "../../services/vehicle.service";
import {forkJoin} from "rxjs";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  rentedVehicles: any = [];
  meVehicles: any;
  userId: any;
  isShowingRentedList: any
  warningMessage: any;
  emptyMessage: any;
  userName: any;

  constructor(
    private vehicleSvc: VehicleService,
    private router: Router,
    private userSvc: UserService
  ) {
  }

  async ngOnInit() {
    if (await this.verifyUser()) {
      this.loadVehicles();
      this.switchListView(true);
    }

  }

  async verifyUser(): Promise<boolean> {
    let isLogged = false;
    if (localStorage.userId === "undefined" || localStorage.length == 0 ) {
      await this.router.navigateByUrl('/login')
    } else {
      this.userId = localStorage.getItem("userId");
      this.userName = localStorage.getItem("username");
      this.userName = this.userName[0].toUpperCase() + this.userName.substr(1);
      isLogged = true;
    }

    return isLogged;
  }


  loadVehicles() {
    forkJoin([
      this.vehicleSvc.loadVehicles(),
      this.vehicleSvc.loadMeVehicles(this.userId),
    ]).subscribe((res) => {
      this.rentedVehicles = res[0].data
      this.meVehicles = res[1].data
      this.verifyVehicles();

    })
  }

  verifyVehicles() {
    if(this.rentedVehicles.length === 0) {
      this.emptyMessage = "Desculpe, estamos sem veículos disponíveis"
    } else if (this.meVehicles === 0 ) {
      this.emptyMessage = "Você não possui nenhum veículo alugado"
    }
  }
  switchListView(isShowing: boolean) {
    this.loadVehicles();
    this.isShowingRentedList = isShowing;
    this.warningMessage = "";
  }

  rentVehicle(vehicleInformation: any) {
    const rentInformation = {vehicleId: vehicleInformation.id, userId: this.userId}

    this.vehicleSvc.rentVehicle(rentInformation).subscribe(res => {
        if (res.success) {
          this.loadVehicles()
          this.warningMessage = "";
        } else {
          this.warningMessage = res.message
        }
      }, error => {
          this.warningMessage = error.error.message;
      }
    );
  }

  quitVehicle(vehicleInformation: any) {
    this.vehicleSvc.quitVehicle(vehicleInformation).subscribe(res => {
        if (res.success) {
          this.loadVehicles()
          this.warningMessage = "";
        } else {
          this.warningMessage = res.message
        }
      }, error => {
        this.warningMessage = error.error.message;
      }
    );
  }

  logout() {
    this.userSvc.doSignOut(localStorage.getItem("username")).subscribe(
      res => null,
      error => this.warningMessage = error.error.message,
      async () => {
        localStorage.clear();
        await this.router.navigateByUrl("/login")
      }
    )
  }



}
