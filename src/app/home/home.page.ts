import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { CredenciaisDTO } from 'src/models/credenciais.dto';
import { Routes, Route, Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  };

  constructor(
    private menu: MenuController, 
    private router: Router,
    private auth: AuthService,
    private storage: StorageService) {}

  ionViewWillEnter(){
    this.menu.swipeGesture(false);
  }

  ionViewWillLeave(){
    this.menu.swipeGesture(true);
  }

  ionViewDidEnter(){
    if (this.storage.getLocalUser()) {
      this.auth.refreshToken().subscribe(
        response => {
          this.auth.successfulLogin(response.headers.get('Authorization'));
          this.router.navigate(['/categorias']);
        },
        error => {
  
        }
      );
    }
  }

  login() {
    this.auth.authenticate(this.creds).subscribe(
      response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.router.navigate(['/categorias']);
      },
      error => {

      }
    );
  }

  signup() {
    this.router.navigate(['/signup']);
  }

}
