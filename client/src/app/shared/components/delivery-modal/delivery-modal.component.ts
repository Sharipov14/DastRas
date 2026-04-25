import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, 
  IonContent, 
  IonToolbar, 
  IonTitle, 
  IonButtons, 
  IonIcon, 
  IonFooter,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonItem,
  IonRadioGroup,
  IonRadio,
  IonButton,
  IonList
} from "@ionic/angular/standalone";
import { CartService } from '../../../core/services/cart.service';
import { ModalController } from '@ionic/angular/standalone';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-delivery-modal',
  standalone: true,
  templateUrl: './delivery-modal.component.html',
  styleUrls: ['./delivery-modal.component.scss'],
  imports: [
    CommonModule,
    IonIcon, 
    IonButtons, 
    IonTitle, 
    IonToolbar, 
    IonHeader, 
    IonContent,
    IonFooter,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonItem,
    IonRadioGroup,
    IonRadio,
    IonButton,
    IonList
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliveryModalComponent {
  #modalController = inject(ModalController);
  #cartService = inject(CartService);
  #themeService = inject(ThemeService);

  protected isDark = this.#themeService.isDark;

  protected days = [
    { value: 'Сегодня', label: 'Сегодня' },
    { value: 'Завтра', label: 'Завтра' }
  ];

  protected timeSlots = [
    'Прямо сейчас',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '12:00 - 13:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00',
    '17:00 - 18:00',
    '18:00 - 19:00',
    '19:00 - 20:00',
    '20:00 - 21:00'
  ];

  protected selectedDay = signal<string>(this.#cartService.deliveryDay());
  protected selectedTime = signal<string>(this.#cartService.deliveryTime());

  protected onDayChange(event: any) {
    this.selectedDay.set(event.detail.value);
  }

  protected onTimeChange(event: any) {
    this.selectedTime.set(event.detail.value);
  }

  protected async confirm() {
    this.#cartService.setDeliveryInfo(this.selectedTime(), this.selectedDay());
    await this.#modalController.dismiss({
      day: this.selectedDay(),
      time: this.selectedTime()
    });
  }

  protected async closeModal() {
    await this.#modalController.dismiss();
  }
}