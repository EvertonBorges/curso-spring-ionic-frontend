import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/services/storage.service';
import { ClienteDTO } from 'src/models/cliente.dto';
import { ClienteService } from 'src/services/domain/cliente.service';
import { API_CONFIG } from '../config/api.config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  cliente: ClienteDTO;

  constructor(
    public storage: StorageService,
    public clienteService: ClienteService,
    public router: Router) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email).subscribe(
        response => {
          this.cliente = response;
          this.getImageIfExists();
        },
        error => {
          if (error.status == 403) {
            this.router.navigate(['/home']);
          }
        }
      )
    } else {
      this.router.navigate(['/home']);
    }
  }

  getImageIfExists() {
    this.clienteService.getImageFromBucket(this.cliente.id)
      .subscribe(
        response => {
          this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
        },
        error => {

        }
      )
  }

}
