import { Component, OnInit } from '@angular/core';
import { ProdutoDTO } from 'src/models/produto.dto';
import { ProdutoService } from 'src/services/domain/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { API_CONFIG } from '../config/api.config';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  items: ProdutoDTO[];

  constructor(
    public produtoService: ProdutoService,
    public activatedRoute: ActivatedRoute, 
    public router: Router) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    let categoriaId = this.activatedRoute.snapshot.paramMap.get("categoriaId");

    this.produtoService.findByCategoria(categoriaId).subscribe(
      response => {
        this.items = response['content'];
        this.loadImageUrls();
      }, error => {

      }
    );
  }

  loadImageUrls() {
    for (var i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id).subscribe(
        response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
        }, error => {

        }
      );
    }
  }

  showDetail(produtoId: string) {
    this.router.navigate(['/produto-detail', {produtoId: produtoId}]);
  }

}
