import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/app/config/api.config';
import { PedidoDTO } from 'src/models/pedido.dto';

@Injectable()
export class PedidoService {

    constructor (private http: HttpClient){
        
    }

    insert (obj: PedidoDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/pedidos`, 
            obj,
            {
              observe: 'response',
              responseType: 'text'
            }
        );
    }

}