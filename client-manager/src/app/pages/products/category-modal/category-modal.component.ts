import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, 
  IonContent, IonItem, IonLabel, IonInput, IonSelect, 
  IonSelectOption, ModalController 
} from '@ionic/angular/standalone';
import { ProductService } from '../../../core/services/product.service';
import { Category, CreateCategoryRequest, UpdateCategoryRequest } from '../../../core/models/product.model';

@Component({
  selector: 'app-category-modal',
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, 
    IonButtons, IonButton, IonContent, IonItem, IonLabel, 
    IonInput, IonSelect, IonSelectOption
  ],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ category ? 'Редактировать' : 'Добавить' }} категорию</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">Закрыть</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="space-y-4">
        <ion-item>
          <ion-label position="stacked">Название *</ion-label>
          <ion-input [(ngModel)]="formData.name" placeholder="Пример: Овощи"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Emoji *</ion-label>
          <ion-input [(ngModel)]="formData.emoji" placeholder="Пример: 🥬"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Родительская категория</ion-label>
          <ion-select [(ngModel)]="formData.parentId" placeholder="Нет (корневая)">
            <ion-select-option [value]="undefined">Нет (корневая)</ion-select-option>
            @for (cat of parentCategories(); track cat.id) {
              <ion-select-option [value]="cat.id">{{ cat.emoji }} {{ cat.name }}</ion-select-option>
            }
          </ion-select>
        </ion-item>

        <div class="mt-8">
          <ion-button expand="block" (click)="save()" [disabled]="!formData.name || !formData.emoji">
            {{ category ? 'Сохранить изменения' : 'Создать категорию' }}
          </ion-button>
        </div>
      </div>
    </ion-content>
  `
})
export class CategoryModalComponent implements OnInit {
  @Input() category?: Category;

  private modalCtrl = inject(ModalController);
  private productService = inject(ProductService);

  formData: CreateCategoryRequest = {
    name: '',
    emoji: '',
    parentId: undefined
  };

  parentCategories = signal<Category[]>([]);

  ngOnInit() {
    // Нельзя выбрать категорию родителем саму себя или ее подкатегории (упрощенно только саму себя)
    this.parentCategories.set(
      this.productService.categories().filter(c => !this.category || c.id !== this.category.id)
    );

    if (this.category) {
      this.formData = {
        name: this.category.name,
        emoji: this.category.emoji,
        parentId: this.category.parentId
      };
    }
  }

  async save() {
    try {
      if (this.category) {
        await this.productService.updateCategory(this.category.id, this.formData);
      } else {
        await this.productService.addCategory(this.formData);
      }
      this.modalCtrl.dismiss(true);
    } catch (error) {
      console.error('Error saving category:', error);
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
