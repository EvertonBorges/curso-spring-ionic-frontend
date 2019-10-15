import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/app/config/api.config';
import { Observable } from 'rxjs';

@Injectable()
export class ProdutoService {

    constructor(private http: HttpClient){
        
    }

    findByCategoria(categoriaId: string){
        return this.http.get(`${API_CONFIG.baseUrl}/produtos/page?categorias=${categoriaId}`);
    }

    getSmallImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`;
        return this.http.get(url, {responseType : 'blob'});
    }

    getImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`;
        return this.http.get(url, {responseType : 'blob'});
    }

}