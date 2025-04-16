import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, IonCardContent, IonContent, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCard, IonCol, IonRow, IonIcon, IonFabButton, IonFabList, IonFab, IonList, IonLabel, IonButton, IonListHeader, IonItem, IonInput, IonText, IonSelect, IonSelectOption, IonHeader, IonToolbar, IonButtons, IonTitle, IonFooter } from "@ionic/angular/standalone";
import { OverlayEventDetail } from '@ionic/core/components';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

interface Expense {
  Type: string;
  Categories: string[];
}

@Component({
  selector: 'app-cashflow',
  templateUrl: './cashflow.component.html',
  styleUrls: ['./cashflow.component.scss'],
  imports: [FormsModule, IonFooter, IonTitle, IonButtons, IonToolbar, IonHeader, IonModal, IonText, IonInput, IonItem, IonListHeader, IonButton, IonLabel, IonList, IonFab, IonFabList, IonFabButton, IonIcon, IonRow, IonCol, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonCardContent, IonSelect, IonSelectOption]
})
export class CashflowComponent implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string | undefined;
  canDismiss = false;

  expenses: Expense[] = [
    {
      Type: "Variable",
      Categories: ["Gasoline", "Food", "Self-care", "Personal"]
    },
    {
      Type: "Fixed",
      Categories: ["Rent", "Water District", "Internet"]
    },
    {
      Type: "Extra",
      Categories: []
    }
  ]

  selectedExpenseType: string | null = null;  // Variable to hold the selected Type value
  selectedCategory: string | null = null;     // Variable to hold the selected Category value (optional but good practice)
  availableCategories: string[] = [];         // Variable to hold the categories available based on the selected type

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.getExpenseCategories();
  }

  /**
   * 
   * @param event 
   */
  getExpenseCategories() {
    this.apiService.getData('/Moneytor/ExpenseCategory').subscribe((res: any) => {
      console.log(res);
    });
  }

  // Function called when the 'Type' selection changes
  onTypeChange(event: any) {
    const selectedExpense = this.expenses.find(exp => exp.Type === this.selectedExpenseType);   // Find the expense object matching the selected type
    if (selectedExpense) {            // Update the available categories
      this.availableCategories = selectedExpense.Categories;
    } else {
      this.availableCategories = [];  // Clear categories if no type is selected
    }
    this.selectedCategory = null;     // IMPORTANT: Reset the category selection whenever the type changes
  }

  cancel() {
    this.canDismiss = true;
    this.modal.dismiss(null, 'cancel').then(() => {
      this.canDismiss = false;
    })
  }

  confirm() {
    this.canDismiss = true;
    this.modal.dismiss(null, 'confirm').then(() => {
      this.selectedExpenseType = null;
      this.selectedCategory = null;
      this.availableCategories = [];
      this.canDismiss = false;
    })
  }

}
