import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, 
  IonContent, IonList, IonItem, IonLabel, IonInput, 
  IonSelect, IonSelectOption, IonTextarea, ModalController 
} from '@ionic/angular/standalone';
import { Product, Category } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, IonHeader, IonToolbar, 
    IonTitle, IonButtons, IonButton, IonContent, IonList, 
    IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonTextarea
  ]
})
export class ProductModalComponent implements OnInit {
  private fb = inject(FormBuilder);
  private modalCtrl = inject(ModalController);
  private productService = inject(ProductService);

  @Input() product?: Product;
  
  productForm!: FormGroup;
  categories = this.productService.categories;

  ngOnInit() {
    this.productForm = this.fb.group({
      nameRu: [this.product?.nameRu || '', [Validators.required]],
      nameTj: [this.product?.nameTj || ''],
      nameEn: [this.product?.nameEn || ''],
      price: [this.product?.price || 0, [Validators.required, Validators.min(0)]],
      stockQuantity: [this.product?.stockQuantity || 0, [Validators.required, Validators.min(0)]],
      unit: [this.product?.unit || 'кг', [Validators.required]],
      categoryId: [this.product?.categoryId || '', [Validators.required]],
      imageUrl: [this.product?.imageUrl || ''],
      description: [this.product?.description || '']
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  async save() {
    if (this.productForm.invalid) return;

    const productData = this.productForm.value;
    try {
      if (this.product) {
        await this.productService.updateProduct(this.product.id, productData);
      } else {
        await this.productService.addProduct(productData);
      }
      this.modalCtrl.dismiss(true);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  }
}
