import { Component, OnInit } from '@angular/core';
import { PedidoDTO } from 'src/models/pedido.dto';
import { Router } from '@angular/router';
import { CartItem } from 'src/models/cart-item';
import { CartService } from 'src/services/domain/cart.service';
import { ClienteDTO } from 'src/models/cliente.dto';
import { EnderecoDTO } from 'src/models/endereco.dto';
import { ClienteService } from 'src/services/domain/cliente.service';
import { PedidoService } from 'src/services/domain/pedido.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.page.html',
  styleUrls: ['./order-confirmation.page.scss'],
})
export class OrderConfirmationPage implements OnInit {

  pedido: PedidoDTO;
  cartItems: CartItem[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;
  codPedido: string;

  constructor(
    public router: Router,
    public cartService: CartService,
    public clienteService: ClienteService,
    public pedidoService: PedidoService
  ) { 
    this.pedido = router.getCurrentNavigation().extras.state.pedido;
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.cartItems = this.cartService.getCart().items;
    this.clienteService.findById(this.pedido.cliente.id).subscribe(
      response => {
        this.cliente = response as ClienteDTO;
        this.endereco = this.findEndereco(this.pedido.enderecoDeEntrega.id, response['enderecos']);
      }, error => {
        this.router.navigate(['/home']);
      }
    );
  }

  private findEndereco(id: string, list: EnderecoDTO[]): EnderecoDTO {
    let position = list.findIndex(x => id == x.id);
    return list[position];
  }

  total(): number {
    return this.cartService.total();
  }

  back() {
    this.router.navigate(['/cart']);
  }

  home() {
    this.router.navigate(['/categorias']);
  }

  checkout() {
    this.pedidoService.insert(this.pedido).subscribe(
      response => {
        this.cartService.createOrClearCart();
        this.codPedido = this.extractId(response.headers.get('location'));
      }, error => {
        if (error.status = 404) {
          this.router.navigate(['/home']);
        }
      }
    );
  }

  private extractId(location: string): string {
    let position = location.lastIndexOf("/");
    return location.substring(position + 1, location.length);
  }

}