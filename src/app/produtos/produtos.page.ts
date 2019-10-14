import { Component, OnInit } from '@angular/core';
import { ProdutoDTO } from 'src/models/produto.dto';
import { ProdutoService } from 'src/services/domain/produto.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  items: ProdutoDTO[];

  constructor(
    public produtoService: ProdutoService,
    public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    let categoriaId = this.activatedRoute.snapshot.paramMap.get("categoriaId");

    this.produtoService.findByCategoria(categoriaId).subscribe(
      response => {
        this.items = response['content'];
      }, error => {

      }
    );
  }

}
