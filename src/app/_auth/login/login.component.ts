import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../../service/app.config.service';
import { AppConfig } from '../../api/appconfig';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_requests/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [MessageService],
  styles:[`
    :host ::ng-deep .p-password input {
    width: 100%;
    padding:1rem;
    }

    :host ::ng-deep .pi-eye{
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }

    :host ::ng-deep .pi-eye-slash{
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }
  `]
})
export class LoginComponent implements OnInit, OnDestroy {

  valCheck: string[] = ['remember'];
  password: string;
  config: AppConfig;
  subscription: Subscription;
  formLogin : FormGroup;

  constructor(
    public configService: ConfigService,
    private formBuilder : FormBuilder,
    private auth : AuthService,
    private router : Router,
    private messageService : MessageService
    ){ }

  ngOnInit(): void {
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
    });
    
    if(this.auth.currentUserValue) {
      this.router.navigate(['/app'])
    }

    this.formLogin = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  
  async login(form) {
    let body = {
      'username' : form.value.username,
      'password' : form.value.password
    }
    
    await this.auth.login(body).subscribe((res) => {
      if(res && res.access_token) {
        this.messageService.add({severity: 'success', summary: 'Success', detail: res.message, life: 2000});
        setTimeout(() => {
          this.router.navigate(['/app/dashboard']);
        }, 1500);
        // return this.messageService.add({severity: 'success', summary: 'Success', detail: res.message, life: 3000});
      }
    })
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
