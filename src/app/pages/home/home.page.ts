import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFooter, IonFab, IonFabButton, IonFabList, IonIcon, IonButtons, IonMenu , IonMenuButton, IonButton, IonMenuToggle, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent } from '@ionic/angular/standalone';
import { HeaderNavigationComponent } from "../../components/header-navigation/header-navigation.component";
import { CashflowComponent } from "../../components/cashflow/cashflow.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonCardContent, IonCardSubtitle, IonCardHeader, IonCard, IonButton, IonButtons, IonIcon, IonFabList, IonFabButton, IonFab, IonFooter, IonHeader, IonToolbar, IonTitle, IonContent, HeaderNavigationComponent, CashflowComponent, IonMenu, IonMenuButton, IonMenuToggle ],
})
export class HomePage {
  constructor() {}
}
