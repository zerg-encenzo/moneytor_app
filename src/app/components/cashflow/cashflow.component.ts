import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, IonCardContent, IonContent, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCard, IonCol, IonRow, IonIcon, IonFabButton, IonFabList, IonFab, IonList, IonLabel, IonButton, IonListHeader, IonItem, IonInput, IonText, IonSelect, IonSelectOption, IonHeader, IonToolbar, IonButtons, IonTitle, IonFooter } from "@ionic/angular/standalone";
import { OverlayEventDetail } from '@ionic/core/components';
import { FormsModule } from '@angular/forms';

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

  // Variable to hold the selected Type value
  selectedExpenseType: string | null = null; // Initialize as null

  // Variable to hold the selected Category value (optional but good practice)
  selectedCategory: string | null = null;

  // Variable to hold the categories available based on the selected type
  availableCategories: string[] = [];

  constructor() { }

  ngOnInit() { }

  addExpense() {

  }

  // Function called when the 'Type' selection changes
  onTypeChange(event: any) {
    // Find the expense object matching the selected type
    const selectedExpense = this.expenses.find(exp => exp.Type === this.selectedExpenseType);
    // Update the available categories
    if (selectedExpense) {
      this.availableCategories = selectedExpense.Categories;
    } else {
      this.availableCategories = []; // Clear categories if no type is selected
    }
    // IMPORTANT: Reset the category selection whenever the type changes
    this.selectedCategory = null;
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
