import { ChangeDetectionStrategy, Component, inject, signal, OnInit, AfterViewInit, OnDestroy, computed } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, 
  IonToolbar, 
  IonButtons, 
  IonButton, 
  IonIcon, 
  IonContent, 
  IonToggle,
  IonSpinner,
  IonTitle, IonFooter,
  IonModal,
  IonList,
  IonItem,
  IonLabel,
  IonInput } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBack, checkmarkCircleOutline, location, locationOutline, locate, compassOutline, alertCircleOutline, search, closeCircle } from 'ionicons/icons';
import { toastController } from '@ionic/core';
import { AddressService } from '../../core/services/address.service';
import { Address } from '../../core/models/address.model';
import { Geolocation } from '@capacitor/geolocation';

// Declare Leaflet global
declare const L: any;

@Component({
  selector: 'app-address-add-page',
  standalone: true,
  imports: [IonFooter, 
    CommonModule, 
    FormsModule,
    IonHeader, 
    IonToolbar, 
    IonButtons, 
    IonButton, 
    IonIcon, 
    IonContent, 
    IonToggle,
    IonSpinner,
    IonTitle,
    IonModal,
    IonList,
    IonItem,
    IonLabel,
    IonInput
  ],
  templateUrl: './address-add-page.component.html',
  styleUrls: ['./address-add-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressAddPageComponent implements OnInit, AfterViewInit, OnDestroy {
  protected addressService = inject(AddressService);
  protected location = inject(Location);
  protected route = inject(ActivatedRoute);
  protected router = inject(Router);
  
  protected step = signal<'map' | 'form'>('map');
  protected isMapLoading = signal(false);
  protected isLocating = signal(false);
  protected mapBearing = signal(0);
  protected isInsideZone = signal(true);
  protected editId = signal<number | null>(null);

  // Search Modal Signals
  protected isSearchModalOpen = signal(false);
  protected searchQuery = signal('');
  protected searchResults = signal<any[]>([]);
  protected isSearching = signal(false);
  #searchTimeout: any;

  // Константы зоны доставки
  readonly STORE_LOCATION = { lat: 38.5598, lng: 68.7870 }; // Центр Душанбе
  readonly MAX_DELIVERY_RADIUS = 6000; // 6 км в метрах
  
  // Form Data
  protected formData: Partial<Address> = {
    title: '',
    details: '',
    type: 'other',
    isPrivateHouse: false,
    entrance: '',
    floor: '',
    apartment: '',
    intercom: ''
  };

  #map: any;
  #moveTimeout: any;

  constructor() {
    addIcons({ arrowBack, checkmarkCircleOutline, location, locationOutline, locate, compassOutline, 'alert-circle-outline': alertCircleOutline, search, 'close-circle': closeCircle });
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      this.editId.set(id);
      const existing = this.addressService.getAddressById(id);
      if (existing) {
        this.formData = { ...existing };
        this.step.set('form');
      }
    } else {
      this.step.set('map');
    }
  }

  ngAfterViewInit() {
    if (this.step() === 'map') {
      setTimeout(() => this.#initMap(), 100);
    }
  }

  ngOnDestroy() {
    if (this.#map) {
      this.#map.remove();
    }
  }

  #initMap() {
    this.#map = L.map('map', {
      center: [this.STORE_LOCATION.lat, this.STORE_LOCATION.lng],
      zoom: 15,
      zoomControl: false,
      attributionControl: false,
      rotate: true,
      touchRotate: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap'
    }).addTo(this.#map);

    // Добавляем зону доставки на карту
    L.circle([this.STORE_LOCATION.lat, this.STORE_LOCATION.lng], {
      radius: this.MAX_DELIVERY_RADIUS,
      color: '#ff6b35', // Яркий брендовый оранжевый
      weight: 4,        // Толстая линия
      fillColor: '#ff6b35',
      fillOpacity: 0.2, // Более насыщенная заливка
      opacity: 0.8      // Прозрачность границы
    }).addTo(this.#map);

    this.#reverseGeocode(this.STORE_LOCATION.lat, this.STORE_LOCATION.lng);

    this.#map.on('moveend', () => {
      const center = this.#map.getCenter();
      this.isMapLoading.set(true);
      
      // Проверяем расстояние
      const distance = this.#map.distance(
        [center.lat, center.lng], 
        [this.STORE_LOCATION.lat, this.STORE_LOCATION.lng]
      );
      this.isInsideZone.set(distance <= this.MAX_DELIVERY_RADIUS);

      if (this.#moveTimeout) clearTimeout(this.#moveTimeout);
      this.#moveTimeout = setTimeout(() => {
        this.#reverseGeocode(center.lat, center.lng);
      }, 600);
    });

    this.#map.on('rotate', () => {
        this.mapBearing.set(this.#map.getBearing());
    });
  }

  protected resetNorth() {
    if (this.#map) {
        this.#map.setBearing(0);
    }
  }

  protected async getCurrentPosition() {
    if (this.isLocating()) return;
    this.isLocating.set(true);
    
    try {
      const coordinates = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 5000
      });

      const { latitude, longitude } = coordinates.coords;
      if (this.#map) {
        this.#map.setView([latitude, longitude], 17);
        this.#reverseGeocode(latitude, longitude);
      }
    } catch (error: any) {
      console.error('Error getting location', error);
      let message = 'Не удалось получить доступ к местоположению';
      if (error.code === 1) {
        message = 'Пожалуйста, разрешите доступ к геолокации в настройках';
      }
      this.#showToast(message, 'warning');
    } finally {
      this.isLocating.set(false);
    }
  }

  async #showToast(message: string, color: string = 'dark') {
    const toast = await toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top'
    });
    await toast.present();
  }

  async #reverseGeocode(lat: number, lng: number) {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=ru`);
      const data = await response.json();
      
      if (data && data.address) {
        const addr = data.address;
        const street = addr.road || addr.pedestrian || addr.suburb || '';
        const house = addr.house_number || '';
        
        let formattedAddress = '';
        if (street) formattedAddress += street;
        if (house) formattedAddress += `, ${house}`;
        
        if (!formattedAddress) {
             formattedAddress = data.display_name.split(',')[0];
        }

        this.formData.details = formattedAddress;
        this.formData.lat = lat;
        this.formData.lng = lng;
      }
    } catch (error) {
      console.error('Geocoding error:', error);
    } finally {
      this.isMapLoading.set(false);
    }
  }

  protected goBack() {
    if (this.step() === 'form' && !this.editId()) {
      this.step.set('map');
      setTimeout(() => this.#initMap(), 100);
    } else {
      this.location.back();
    }
  }

  protected goToFormStep() {
    if (!this.isInsideZone()) return;
    if (!this.formData.title) {
        this.formData.title = this.formData.details?.split(',')[0] || '';
    }
    this.step.set('form');
  }

  protected isValid() {
    if (!this.formData.title || !this.formData.details) return false;
    if (!this.formData.isPrivateHouse && !this.formData.apartment) return false;
    return true;
  }

  protected async save() {
    if (!this.isValid()) return;

    if (this.editId()) {
      await this.addressService.updateAddress({
        ...this.formData as Address,
        id: this.editId()!
      });
    } else {
      await this.addressService.addAddress(this.formData as Address);
    }

    const toast = await toastController.create({
      message: 'Адрес успешно сохранен',
      duration: 1500,
      color: 'success',
      position: 'top',
      icon: 'checkmark-circle-outline'
    });
    await toast.present();

    this.router.navigate(['/addresses']);
  }

  // Address Search Logic
  protected openSearchModal() {
    this.searchQuery.set(this.formData.details || '');
    if (this.formData.details) {
      this.searchAddress(this.formData.details);
    }
    this.isSearchModalOpen.set(true);
  }

  protected clearSearch() {
    this.searchQuery.set('');
    this.searchResults.set([]);
  }

  protected onSearchInput(query: string) {
    this.searchQuery.set(query);
    if (!query.trim()) {
      this.searchResults.set([]);
      return;
    }
    
    if (this.#searchTimeout) clearTimeout(this.#searchTimeout);
    
    this.#searchTimeout = setTimeout(() => {
      this.searchAddress(query);
    }, 500);
  }

  protected async searchAddress(query: string) {
    this.isSearching.set(true);
    try {
      // Ищем с приоритетом по Таджикистану
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&accept-language=ru&countrycodes=tj`);
      const data = await response.json();
      this.searchResults.set(data);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      this.isSearching.set(false);
    }
  }

  protected selectAddress(result: any) {
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);
    
    this.isSearchModalOpen.set(false);
    this.clearSearch();
    
    if (this.#map) {
      this.#map.flyTo([lat, lon], 17);
    }
  }
}
