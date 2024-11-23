import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SubscriptionEnum } from '../../models/Enums/SubscriptionEnum';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ISubscriptionRequest } from '../../models/SubscriptionModel/ISubscriptionRequest';
import { SubscriptionStatus } from '../../models/Enums/SubscriptionStatus';
import { SubscriptionService } from '../../services/subscription.service';
import { ToastService } from 'angular-toastify';
import { ISubscription } from '../../models/SubscriptionModel/ISubscription';
import { ISubscriptionProperties, PropertyCategoryMapping } from '../../models/ISubscriptionProperties';

@Component({
  selector: 'app-admin-subscription',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminComponent implements OnInit {
  SubscriptionEnum = SubscriptionEnum;
  SubscriptionStatus = SubscriptionStatus;
  selectedCategory: string = 'Suporte';
  username: string | null = null;
  isAuthenticated: boolean = false;
  showTypeDropdown: boolean = false;
  selectedType: SubscriptionEnum | null = null;
  isTransitioning: boolean = false;

  subscriptionForm = new FormGroup({
    description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    price: new FormControl(0, Validators.required),
    mercadoPagoPlanId: new FormControl(''),
    subscriptionProperties: new FormControl({}, Validators.required),
    type: new FormControl(0, Validators.required),
    status: new FormControl(SubscriptionStatus.Inactive, Validators.required)
  });

  subscriptionPropertiesForm = new FormGroup({
    support: new FormControl(false, Validators.required),
    phone: new FormControl(false, Validators.required),
    email: new FormControl(false, Validators.required),
    messenger: new FormControl(false, Validators.required),
    chat: new FormControl(false, Validators.required),
    liveSupport: new FormControl(false, Validators.required),
    documentation: new FormControl(false, Validators.required),
    onboarding: new FormControl(false, Validators.required),
    training: new FormControl(false, Validators.required),
    updates: new FormControl(false, Validators.required),
    backup: new FormControl(false, Validators.required),
    customization: new FormControl(false, Validators.required),
    analytics: new FormControl(false, Validators.required),
    integration: new FormControl(false, Validators.required),
    apiAccess: new FormControl(false, Validators.required),
    cloudStorage: new FormControl(false, Validators.required),
    multiUser: new FormControl(false, Validators.required),
    prioritySupport: new FormControl(false, Validators.required),
    sla: new FormControl(false, Validators.required),
    serviceLevel: new FormControl(false, Validators.required)
  });

  subscriptions: ISubscription[] = [];

  subscriptionPropertiesRequest: ISubscriptionProperties = {
    support: false,
    phone: false,
    email: false,
    messenger: false,
    chat: false,
    liveSupport: false,
    documentation: false,
    onboarding: false,
    training: false,
    updates: false,
    backup: false,
    customization: false,
    analytics: false,
    integration: false,
    apiAccess: false,
    cloudStorage: false,
    multiUser: false,
    prioritySupport: false,
    sla: false,
    serviceLevel: false,
  };

  selectedSubscription: ISubscriptionRequest = {
    id: '',
    type: SubscriptionEnum.Basic,
    description: '',
    price: 0,
    mercadoPagoPlanId: '',
    status: SubscriptionStatus.Active,
    subscriptionProperties: this.subscriptionPropertiesRequest
  };

  subscriptionTypes = [
    SubscriptionEnum.Basic,
    SubscriptionEnum.Medium,
    SubscriptionEnum.Advanced,
    SubscriptionEnum.Personalized
  ];

  constructor(private subscriptionService: SubscriptionService, private toastr: ToastService) {
    this.checkUserLogin();
  }

  ngOnInit(): void {
    this.getSubscriptions();
  }

  setSelectedCategory(category: string): void {
    this.isTransitioning = true;
    setTimeout(() => {
      this.selectedCategory = category;
      this.isTransitioning = false;
    }, 300);
  }

  getPropertiesForCategory() {
    return this.propertyCategoryMapping[this.selectedCategory] || [];
  }

  subscriptionEnumToString(enumValue: SubscriptionEnum): string {
    switch (enumValue) {
      case SubscriptionEnum.Basic:
        return 'Básico';
      case SubscriptionEnum.Medium:
        return 'Médio';
      case SubscriptionEnum.Advanced:
        return 'Avançado';
      case SubscriptionEnum.Personalized:
        return 'Personalizado';
      default:
        return 'Sem plano';
    }
  }

  getSubscriptions() {
    this.subscriptionService.getAll()
      .subscribe({
        next: (data) => {
          this.subscriptions = data;
        },
        error: (error) => {
          this.toastr.error('Erro ao carregar assinaturas.');
        }
      });
  }

  updatedForm(id: string) {
    this.subscriptionService.getById(id).subscribe({
      next: (data: ISubscription) => {
        this.selectedSubscription = data;
        this.subscriptionForm.patchValue({
          ...this.selectedSubscription,
        });
      },
      error: () => {
        this.toastr.error("Erro ao buscar plano");
      }
    });
  }

  checkUserLogin() {
    const token = localStorage.getItem('token');
    this.username = localStorage.getItem('username');
    this.isAuthenticated = !!token;
  }

  toggleTypeDropdown(): void {
    this.showTypeDropdown = !this.showTypeDropdown;
  }

  selectType(type: SubscriptionEnum): void {
    this.selectedType = type;
    this.showTypeDropdown = false;
  }

  saveEditedSubscription(): void {
    if (!this.selectedSubscription.id) {
      console.error('A assinatura selecionada precisa ter um ID válido.');
      return;
    }

    this.selectedSubscription.description = this.subscriptionForm.get('description')?.value ?? '';
    this.selectedSubscription.price = this.subscriptionForm.get('price')?.value ?? 0;
    this.selectedSubscription.mercadoPagoPlanId = this.subscriptionForm.get('mercadoPagoPlanId')?.value ?? '';
    this.selectedSubscription.type = this.subscriptionForm.get('type')?.value ?? SubscriptionEnum.Basic;
    this.selectedSubscription.status = this.subscriptionForm.get('status')?.value ?? SubscriptionStatus.Inactive;

    this.subscriptionService.updateSubscription(this.selectedSubscription)
      .subscribe({
        next: () => {
          this.toastr.success('Assinatura atualizada com sucesso!');
          this.getSubscriptions();
        },
        error: (err) => {
          this.toastr.error('Erro ao atualizar assinatura.');
        }
      });
  }

  categories = [
    { name: 'Suporte' },
    { name: 'Documentação' },
    { name: 'Funcionalidades' },
    { name: 'Suporte Prioritário' },
  ];

  onSubscriptionPropertyChange(key: keyof ISubscriptionProperties, event: Event): void {
    const input = event.target as HTMLInputElement;

    if (this.selectedSubscription.subscriptionProperties) {
      this.selectedSubscription.subscriptionProperties = {
        ...this.selectedSubscription.subscriptionProperties,
        [key]: input.checked,
      };
    }
  }

  propertyCategoryMapping: PropertyCategoryMapping = {
    'Suporte': [
      { key: 'support', name: 'Suporte' },
      { key: 'phone', name: 'Telefone' },
      { key: 'email', name: 'E-mail' },
      { key: 'messenger', name: 'Messenger' },
      { key: 'chat', name: 'Chat' }
    ],
    'Documentação': [
      { key: 'documentation', name: 'Documentação' },
      { key: 'onboarding', name: 'Onboarding' },
      { key: 'training', name: 'Treinamento' },
      { key: 'updates', name: 'Atualizações' },
    ],
    'Funcionalidades': [
      { key: 'backup', name: 'Backup' },
      { key: 'customization', name: 'Customização' },
      { key: 'analytics', name: 'Analytics' },
      { key: 'integration', name: 'Integração' },
      { key: 'apiAccess', name: 'Acesso à API' },
      { key: 'cloudStorage', name: 'Armazenamento em Nuvem' },
      { key: 'multiUser', name: 'Múltiplos Usuários' },
      { key: 'prioritySupport', name: 'Suporte Prioritário' },
      { key: 'sla', name: 'SLA' },
      { key: 'serviceLevel', name: 'Nível de Serviço' }
    ]
  };
}