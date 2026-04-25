import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { 
  IonHeader, 
  IonToolbar, 
  IonButtons, 
  IonButton, 
  IonIcon, 
  IonContent, 
  IonFooter,
  IonList,
  IonItem,
  IonLabel,
  IonRadio,
  IonRadioGroup
} from '@ionic/angular/standalone';
import { alertController } from '@ionic/core';
import { AddressService } from '../../core/services/address.service';
import { Address } from '../../core/models/address.model';

@Component({
  selector: 'app-addresses-page',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    IonHeader, 
    IonToolbar, 
    IonButtons, 
    IonButton, 
    IonIcon, 
    IonContent, 
    IonFooter,
    IonList,
    IonItem,
    IonLabel,
    IonRadio,
    IonRadioGroup
  ],
  templateUrl: './addresses-page.component.html',
  styleUrls: ['./addresses-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressesPageComponent implements OnInit {
  protected addressService = inject(AddressService);
  protected location = inject(Location);
  protected router = inject(Router);
  
  protected isEditMode = signal(false);
  protected tempSelectedId = signal<number | null>(null);

  ngOnInit() {
    this.tempSelectedId.set(this.addressService.selectedAddress()?.id || null);
  }

  protected toggleEditMode() {
    this.isEditMode.update(v => !v);
  }

  protected goBack() {
    this.location.back();
  }

  protected saveAndClose() {
    const id = this.tempSelectedId();
    if (id) {
        const addr = this.addressService.getAddressById(id);
        if (addr) {
            this.addressService.selectAddress(addr);
        }
    }
    this.location.back();
  }

  protected goToAdd() {
    this.router.navigate(['/addresses/new']);
  }
  
  protected goToEdit(id: number) {
    this.router.navigate(['/addresses/edit', id]);
  }

  protected select(addr: Address) {
    if (!this.isEditMode()) {
      this.tempSelectedId.set(addr.id);
    }
  }

  protected async deleteAddress(addr: Address) {
    const alert = await alertController.create({
      header: 'Удалить адрес?',
      message: `Вы уверены, что хотите удалить "${addr.title}"?`,
      buttons: [
        {
          text: 'Отмена',
          role: 'cancel'
        },
        {
          text: 'Удалить',
          role: 'destructive',
          handler: () => {
            this.addressService.deleteAddress(addr.id);
            if (this.tempSelectedId() === addr.id) {
               this.tempSelectedId.set(null);
            }
          }
        }
      ]
    });
    await alert.present();
  }
}
