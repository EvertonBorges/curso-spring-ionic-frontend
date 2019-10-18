import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  { 
    path: 'categorias', 
    loadChildren: './categorias/categorias.module#CategoriasPageModule' 
  },
  { 
    path: 'profile', 
    loadChildren: './profile/profile.module#ProfilePageModule' 
  },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'produtos', loadChildren: './produtos/produtos.module#ProdutosPageModule' },
  { path: 'produto-detail', loadChildren: './produto-detail/produto-detail.module#ProdutoDetailPageModule' },
  { path: 'cart', loadChildren: './cart/cart.module#CartPageModule' },
  { path: 'pick-address', loadChildren: './pick-address/pick-address.module#PickAddressPageModule' },
  { path: 'payment', loadChildren: './payment/payment.module#PaymentPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
