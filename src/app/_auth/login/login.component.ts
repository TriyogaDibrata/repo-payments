import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../../service/app.config.service';
import { AppConfig } from '../../api/appconfig';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_requests/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [MessageService],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  valCheck: string[] = ['remember'];
  password: string;
  config: AppConfig;
  subscription: Subscription;
  formLogin: FormGroup;

  constructor(
    public configService: ConfigService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private messageService: MessageService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
    });

    if (this.auth.currentUserValue) {
      this.router.navigate(['/app'])
    }

    this.formLogin = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login(form) {
    let body = {
      'username': form.value.username,
      'password': form.value.password
    }
    this.http.get('http://localhost:8000/sanctum/csrf-cookie').toPromise()
      .then(() => {
        this.auth.login(body).subscribe((res) => {
          if (res && res.access_token) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message, life: 2000 });
            setTimeout(() => {
              this.router.navigate(['/app/dashboard']);
            }, 1500);
          }
        }, err => {
          if(err.status === 401){
            this.messageService.add({severity: 'error', summary: 'Login Failed', detail: 'No credentials found. Make sure you insert the right credentials'});
          }
        });
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
