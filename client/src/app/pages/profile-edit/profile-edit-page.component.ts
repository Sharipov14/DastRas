import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButton,
  IonIcon,
  IonButtons,
  IonItem,
  IonLabel,
  IonInput,
  IonNote
} from "@ionic/angular/standalone";
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile-edit-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonButton,
    IonIcon,
    IonButtons,
    IonItem,
    IonLabel,
    IonInput,
    IonNote
  ],
  templateUrl: './profile-edit-page.component.html',
  styleUrl: './profile-edit-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileEditPageComponent implements OnInit {
  #router = inject(Router);
  #location = inject(Location);
  #fb = inject(FormBuilder);

  profileForm!: FormGroup;
  
  // Имитация текущего пользователя (в будущем брать из сервиса)
  protected user = signal({
    firstName: 'Алишер',
    lastName: 'Собиров',
    phone: '+992 900 00 00 00',
    avatar: 'https://i.pravatar.cc/150?u=alisher'
  });

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    const currentUser = this.user();
    this.profileForm = this.#fb.group({
      firstName: [currentUser.firstName, [Validators.required, Validators.minLength(2)]],
      lastName: [currentUser.lastName, [Validators.required, Validators.minLength(2)]],
      phone: [currentUser.phone, [Validators.required, Validators.pattern(/^\+?[0-9\s-]{10,}$/)]],
    });
  }

  protected goBack() {
    this.#location.back();
  }

  protected save() {
    if (this.profileForm.valid) {
      console.log('Saved data:', this.profileForm.value);
      // TODO: Сохранить через сервис
      this.goBack();
    } else {
      this.profileForm.markAllAsTouched();
    }
  }
}
