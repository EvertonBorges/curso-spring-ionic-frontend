import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/services/domain/categoria.service';
import { CategoriaDTO } from 'src/models/categoria.dto';
import { API_CONFIG } from '../config/api.config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;
  items: CategoriaDTO[];

  constructor(public categoriaService: CategoriaService, public router: Router) { }

  ngOnInit() {
    
  }

  ionViewDidEnter(){
    this.categoriaService.findAll().subscribe(response => {
        this.items = response;
      },
      error => {}
    );
  }

  showProdutos(categoriaId: string) {
    this.router.navigate(['/produtos', {categoriaId: categoriaId}]);
  }

}
