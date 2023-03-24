import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "../features/login/login.component";
import {PadletIndexComponent} from "../features/padlet-index/padlet-index.component";
import {NotFoundComponent} from "../features/not-found/not-found.component";
import {PadletShowComponent} from "../features/padlet-show/padlet-show.component";
import {PadletStoreComponent} from "../features/padlet-store/padlet-store.component";
import {SettingsComponent} from "../features/settings/settings.component";
import {DaisyuiComponent} from "../features/daisyui/daisyui.component";

const routes: Routes = [
  {path: '', component: PadletIndexComponent},
  {path: 'login', component: LoginComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'test-ui', component: DaisyuiComponent},
  {path: 'padlet/:id', component: PadletShowComponent},
  {path: 'new/padlet', component: PadletStoreComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [],
  // imports: [
  //   CommonModule
  // ]
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
