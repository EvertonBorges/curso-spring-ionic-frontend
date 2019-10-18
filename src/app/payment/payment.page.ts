import { Component, OnInit } from '@angular/core';
import { PedidoDTO } from 'src/models/pedido.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  pedido: PedidoDTO;
  parcelas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  formGroup: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    router: Router) {
    this.pedido = router.getCurrentNavigation().extras.state.pedido;

    this.formGroup = formBuilder.group({
      numeroDeParcelas: [1, [Validators.required]],
      "@type": ['pagamentoComCartao', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  nextPage() {
    this.pedido.pagamento = this.formGroup.value;
    if (this.pedido.pagamento["@type"] == "pagamentoComBoleto") {
      this.pedido.pagamento.numeroDeParcelas = 1;
    }
    console.log(this.pedido);
  }

}
