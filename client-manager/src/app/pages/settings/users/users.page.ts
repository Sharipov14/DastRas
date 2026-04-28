import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonToolbar, IonTitle, IonItem, IonLabel, 
  IonInput, IonButton, IonIcon, IonList, IonItemSliding, 
  IonItemOptions, IonItemOption, IonSelect, IonSelectOption, 
  IonFab, IonFabButton, IonModal, IonSegment, IonSegmentButton,
  IonToggle, IonBadge, IonButtons
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  addOutline, trashOutline, personAddOutline, 
  createOutline, refreshOutline, eyeOutline, 
  eyeOffOutline, checkmarkCircleOutline, closeCircleOutline
} from 'ionicons/icons';
import { UserService, CreateUserRequest, UpdateUserRequest } from '../../../core/services/user.service';
import { User, UserRole } from '../../../core/models/auth.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonContent, IonHeader, IonToolbar, 
    IonTitle, IonItem, IonLabel, IonInput, IonButton, IonIcon, 
    IonList, IonItemSliding, IonItemOptions, IonItemOption, IonSelect, 
    IonSelectOption, IonFab, IonFabButton, IonModal, IonSegment, 
    IonSegmentButton, IonToggle, IonBadge, IonButtons
  ]
})
export class UsersPage implements OnInit {
  private userService = inject(UserService);

  allUsers = signal<User[]>([]);
  segment = signal<'active' | 'deleted'>('active');
  isModalOpen = signal(false);
  isEditMode = signal(false);
  isLoading = signal(false);
  selectedUserId: number | null = null;

  filteredUsers = computed(() => {
    const isDeleted = this.segment() === 'deleted';
    return this.allUsers().filter(u => !!u.isDeleted === isDeleted);
  });

  // Form
  formData = {
    username: '',
    password: '',
    phone: '',
    name: '',
    role: UserRole.Manager,
    isActive: true
  };

  roles = [
    { label: 'Администратор', value: UserRole.Admin },
    { label: 'Менеджер', value: UserRole.Manager },
    { label: 'Сборщик', value: UserRole.Assembler },
    { label: 'Курьер', value: UserRole.Courier }
  ];

  constructor() {
    addIcons({ 
      addOutline, trashOutline, personAddOutline, 
      createOutline, refreshOutline, eyeOutline, 
      eyeOffOutline, checkmarkCircleOutline, closeCircleOutline
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  async loadUsers() {
    try {
      const data = await this.userService.getAll(true);
      this.allUsers.set(data);
    } catch (error) {
      console.error('Failed to load users', error);
    }
  }

  openAddModal() {
    this.isEditMode.set(false);
    this.selectedUserId = null;
    this.formData = {
      username: '',
      password: '',
      phone: '',
      name: '',
      role: UserRole.Manager,
      isActive: true
    };
    this.isModalOpen.set(true);
  }

  openEditModal(user: User) {
    this.isEditMode.set(true);
    this.selectedUserId = user.id;
    this.formData = {
      username: user.username,
      password: '', // Пароль пустой, если не меняем
      phone: user.phone,
      name: user.name || '',
      role: user.role,
      isActive: user.isActive !== false
    };
    this.isModalOpen.set(true);
  }

  async onSave() {
    this.isLoading.set(true);
    try {
      if (this.isEditMode() && this.selectedUserId) {
        const updateData: UpdateUserRequest = {
          name: this.formData.name,
          phone: this.formData.phone,
          role: this.formData.role,
          isActive: this.formData.isActive,
          password: this.formData.password || undefined
        };
        await this.userService.update(this.selectedUserId, updateData);
      } else {
        const createData: CreateUserRequest = {
          username: this.formData.username,
          password: this.formData.password,
          phone: this.formData.phone,
          name: this.formData.name,
          role: this.formData.role
        };
        await this.userService.create(createData);
      }
      this.isModalOpen.set(false);
      await this.loadUsers();
    } catch (error) {
      console.error('Failed to save user', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async onDeleteUser(id: number) {
    try {
      await this.userService.delete(id);
      await this.loadUsers();
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  }

  async onRestoreUser(id: number) {
    try {
      await this.userService.restore(id);
      await this.loadUsers();
    } catch (error) {
      console.error('Failed to restore user', error);
    }
  }

  getRoleLabel(roleValue: UserRole): string {
    return this.roles.find(r => r.value === roleValue)?.label || 'Неизвестно';
  }
}
