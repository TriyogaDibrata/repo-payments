import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from 'src/app/_interfaces/user';
import { AuthService } from 'src/app/_requests/auth.service';
import { UserService } from 'src/app/_requests/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  providers: [ConfirmationService, MessageService],
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user : User;
  old_password : any;
  new_password : any;
  c_new_password : any;

  constructor(
    private auth : AuthService,
    private router : Router,
    private confirmationService : ConfirmationService,
    private messageService : MessageService,
    private userSvc : UserService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to log out?',
      icon: 'pi pi-sign-out',
      accept: () => {
        this.logOut();
      },
      reject: () => {
        //do nothing
      }
    })
  }
  logOut() {
    this.auth.logOut().subscribe((res) => {
      if(res && res['success']) {
        this.router.navigate(['/auth/login']);
      }
    });
  }

  getUser() {
    this.auth.getUser().subscribe((data) => {
      this.user = data;
    })
  }

  updateUser() {
    let params = {
      'name' : this.user.name,
      'username' : this.user.username,
      'email' : this.user.email,
      'role' : this.user.role
    }
    this.userSvc.updateUser(this.user.id, params).subscribe((res) => {
      if(res && res['success']) {
        this.messageService.add({severity: 'success', summary: 'Success', detail: res['msg']});
        this.ngOnInit();
      }
    })
  }

  updatePassword(){
    if(this.new_password == this.c_new_password) {
      let params = {
        'old_password' : this.old_password,
        'new_password' : this.new_password,
        'c_new_password' : this.c_new_password
      }
      this.userSvc.updatePassword(params).subscribe((res) => {
        if(res && res['success']) {
          this.messageService.add({severity: 'success', summary: 'Success', detail: res['msg']});
          this.ngOnInit();
          this.old_password = '';
          this.new_password = '';
          this.c_new_password = '';
        }
      })
    } else {
      this.messageService.add({severity:'error', summary: 'Failed', detail: 'New Password does not match'});
    }
  }

}
