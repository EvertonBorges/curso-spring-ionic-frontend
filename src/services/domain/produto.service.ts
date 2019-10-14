import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/app/config/api.config';

@Injectable()
export class ProdutoService {

    constructor(private http: HttpClient){
        
    }

    findByCategoria(categoriaId: string){
        return this.http.get(`${API_CONFIG.baseUrl}/produtos/page?categorias=${categoriaId}`);
    }

}