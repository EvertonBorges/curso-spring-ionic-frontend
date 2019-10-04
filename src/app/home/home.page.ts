import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { CredenciaisDTO } from 'src/models/credenciais.dto';
import { Routes, Route, Router } from '@angular/router';

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

  constructor(private menu: MenuController, private router: Router) {}

  ionViewWillEnter(){
    this.menu.swipeGesture(false);
  }

  ionViewWillLeave(){
    this.menu.swipeGesture(true);
  }

  login() {
    console.log(this.creds);
    this.router.navigate(['/categorias', this.creds]);
  }

}
