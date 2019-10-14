import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/app/config/api.config';
import { CidadeDTO } from 'src/models/cidade.dto';
import { Observable } from 'rxjs';

@Injectable()
export class CidadeService {

    constructor (private http: HttpClient){
        
    }

    findAll(estadoId: string) : Observable<CidadeDTO[]> {
        if (estadoId) {
            return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/estados/${estadoId}/cidades`);
        }

        return null;
    }

}