import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Address } from '../models/address.model';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/Addresses`;
  
  #addresses = signal<Address[]>([]);

  selectedAddress = signal<Address | null>(null);
  addresses = this.#addresses.asReadonly();

  constructor() {
    this.loadAddresses();
  }

  private async loadAddresses() {
    try {
      const addresses = await firstValueFrom(this.http.get<Address[]>(this.apiUrl));
      this.#addresses.set(addresses);
      if (addresses.length > 0) {
        this.selectedAddress.set(addresses[0]);
      }
    } catch (error) {
      console.error('Error loading addresses:', error);
    }
  }

  public selectAddress(address: Address) {
    this.selectedAddress.set(address);
  }

  getAddressById(id: number): Address | undefined {
    return this.#addresses().find(a => a.id === id);
  }

  async addAddress(address: Omit<Address, 'id'>) {
    try {
      const created = await firstValueFrom(this.http.post<Address>(this.apiUrl, address));
      this.#addresses.update(list => [...list, created]);
      this.selectedAddress.set(created);
      return created;
    } catch (error) {
      console.error('Error adding address:', error);
      throw error;
    }
  }

  async updateAddress(updatedAddress: Address) {
    try {
      await firstValueFrom(this.http.put(`${this.apiUrl}/${updatedAddress.id}`, updatedAddress));
      this.#addresses.update(list =>
        list.map(a => a.id === updatedAddress.id ? updatedAddress : a)
      );
      if (this.selectedAddress()?.id === updatedAddress.id) {
        this.selectedAddress.set(updatedAddress);
      }
    } catch (error) {
      console.error('Error updating address:', error);
    }
  }

  async deleteAddress(id: number) {
    try {
      await firstValueFrom(this.http.delete(`${this.apiUrl}/${id}`));
      this.#addresses.update(list => list.filter(a => a.id !== id));
      if (this.selectedAddress()?.id === id) {
        const remaining = this.#addresses();
        this.selectedAddress.set(remaining.length > 0 ? remaining[0] : null);
      }
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  }
}
