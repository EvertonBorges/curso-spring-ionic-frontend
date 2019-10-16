import { Component, OnInit } from '@angular/core';
import { ProdutoDTO } from 'src/models/produto.dto';
import { ProdutoService } from 'src/services/domain/produto.service';
import { ActivatedRoute } from '@angular/router';
import { API_CONFIG } from '../config/api.config';

@Component({
  selector: 'app-produto-detail',
  templateUrl: './produto-detail.page.html',
  styleUrls: ['./produto-detail.page.scss'],
})
export class ProdutoDetailPage implements OnInit {

  item: ProdutoDTO;

  constructor(
    public produtoService: ProdutoService,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    const id = this.activatedRoute.snapshot.paramMap.get("produtoId");
    if (id) {
      this.showDetail(id);
    }
  }

  showDetail(id: string) {
    this.produtoService.findById(id).subscribe(
      response => {
        this.item = response;
        this.getImageUrlIfExists();
      }, error => {

      }
    );
  }

  getImageUrlIfExists(){
    this.produtoService.getImageFromBucket(this.item.id).subscribe(
      response => {
        this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`;
      }, error => {
        this.item.imageUrl = null;
      }
    );
  }

}
