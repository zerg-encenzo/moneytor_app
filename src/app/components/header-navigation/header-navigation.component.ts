import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonToolbar, IonIcon, IonAvatar, IonButton, IonButtons, IonTitle, IonHeader, IonContent, IonMenu, IonMenuButton, IonMenuToggle, IonGrid, IonCol, IonRow } from "@ionic/angular/standalone";
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-header-navigation',
  templateUrl: './header-navigation.component.html',
  styleUrls: ['./header-navigation.component.scss'],
  imports: [IonRow, IonCol, IonGrid, IonContent, IonHeader, CommonModule, IonTitle, IonButtons, IonButton, IonAvatar, IonIcon, IonToolbar, IonMenu, IonMenuButton, IonMenuToggle]
})
export class HeaderNavigationComponent implements OnInit {

  showDefaultAvatar: boolean = false;
  profile_filename: string = "moneytor_admin.jpg";

  selection: string = "Cashflow";


  constructor(
    private api: ApiService,
    private toast: ToastService
  ) { }

  ngOnInit() { }

  useDefaultImage(event: Event) {
    const img = event.target as HTMLImageElement;

    // Prevent false triggers by checking if the image failed to load
    if (!img.complete || img.naturalWidth === 0) {
      this.showDefaultAvatar = true;
    }
  }

  toggleNavigation(selection: string) {
    this.selection = selection;
    console.log(this.selection);
    if (selection === "Cashflow") {
      this.api.getData('/Moneytor/Auth').subscribe((res: any) => {
        console.log(res);
      });
    }
  }
}
