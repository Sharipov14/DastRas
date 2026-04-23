import { Injectable, signal, inject } from '@angular/core';
import { Address } from '../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  #addresses = signal<Address[]>([
    {
      id: 1,
      title: 'Дом',
      details: 'ул. Пушкина, д. 10',
      type: 'home',
      isPrivateHouse: false,
      entrance: '1',
      floor: '5',
      apartment: '42',
      intercom: '42k'
    },
    {
      id: 2,
      title: 'Работа',
      details: 'пр. Мира, д. 25',
      type: 'work',
      isPrivateHouse: false,
      entrance: '2',
      floor: '12',
      apartment: '1201'
    }
  ]);

  selectedAddress = signal<Address | null>(null);
  addresses = this.#addresses.asReadonly();

  constructor() {
    // Set default selected address
    const initial = this.#addresses();
    if (initial.length > 0) {
      this.selectedAddress.set(initial[0]);
    }
  }

  public selectAddress(address: Address) {
    this.selectedAddress.set(address);
  }

  getAddressById(id: number): Address | undefined {
    return this.#addresses().find(a => a.id === id);
  }

  async addAddress(address: Omit<Address, 'id'>) {
    const newId = Math.max(0, ...this.#addresses().map(a => a.id)) + 1;
    const created: Address = { ...address, id: newId };
    
    this.#addresses.update(list => [...list, created]);
    this.selectedAddress.set(created);
    return created;
  }

  async updateAddress(updatedAddress: Address) {
    this.#addresses.update(list =>
      list.map(a => a.id === updatedAddress.id ? updatedAddress : a)
    );
    if (this.selectedAddress()?.id === updatedAddress.id) {
      this.selectedAddress.set(updatedAddress);
    }
  }

  async deleteAddress(id: number) {
    this.#addresses.update(list => list.filter(a => a.id !== id));
    if (this.selectedAddress()?.id === id) {
      const remaining = this.#addresses();
      this.selectedAddress.set(remaining.length > 0 ? remaining[0] : null);
    }
  }
}
