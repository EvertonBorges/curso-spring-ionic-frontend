import { Component, OnInit } from '@angular/core';
import { ProdutoDTO } from 'src/models/produto.dto';
import { ProdutoService } from 'src/services/domain/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { API_CONFIG } from '../config/api.config';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  items: ProdutoDTO[] = [];
  page: number = 0;

  constructor(
    public produtoService: ProdutoService,
    public activatedRoute: ActivatedRoute, 
    public router: Router,
    public loadingController: LoadingController) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.loadDados();
  }

  loadDados() {
    let categoriaId = this.activatedRoute.snapshot.paramMap.get("categoriaId");

    let loader = this.presentLoading();
    this.produtoService.findByCategoria(categoriaId, this.page, 10).subscribe(
      response => {
        let start = this.items.length;
        this.items = this.items.concat(response['content']);
        let end = this.items.length;
        if (start == end) {
          this.page--;
        }
        this.loadImageUrls(start, end);
      }, error => {

      }, () => {
        loader.then(l => {
          l.dismiss();
        });
      }
    );
  }

  loadImageUrls(start: number, end: number) {
    for (var i = start; i < end; i++) {
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

  async presentLoading(): Promise<HTMLIonLoadingElement> {
    const loader = await this.loadingController.create({
      message: 'Aguarde...',
      backdropDismiss: false
    });
    await loader.present();

    return loader;
  }

  doRefresh(event) {
    this.items = [];
    this.page = 0;
    this.loadDados();

    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  loadData(event) {
    this.page++;
    this.loadDados();

    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

}
