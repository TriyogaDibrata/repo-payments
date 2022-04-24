import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from 'src/app/_interfaces/user';
import { UserService } from 'src/app/_requests/user.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    //new
    userDialog: boolean;
    users: User[];
    user: User;
    selectedUsers: User[];
    deleteUserDialog: boolean = false;
    deleteUsersDialog: boolean = false;
    rowsPerPageOptions = [5, 10, 20];
    cols: any[];
    submitted: boolean;
    roles: any[];

    constructor(
        private userSvc: UserService,
        private messageService: MessageService) { }

    ngOnInit() {
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'username', header: 'Username' },
            { field: 'email', header: 'Email' },
            { field: 'role', header: 'Role' }
        ];

        this.roles = [
            { id: '1', slug: 'Admin' },
            { id: '2', slug: 'Operator' }
        ]

        this.getUsers();
    }

    getUsers() {
        this.userSvc.getUsers().subscribe((data) => {
            this.users = data['data'];
            console.log(this.users)
        })
    }


    openNew() {
        this.user = {};
        this.submitted = false;
        this.userDialog = true;
    }

    editUser(user: User) {
        this.user = { ...user };
        this.userDialog = true;
    }

    deleteUser(user : User) {
        this.deleteUserDialog = true;
        this.user = { ...user }
    }

    confirmDelete() {
        this.userSvc.deleteUser(this.user.id).subscribe((res) => {
            if(res && res['success']) {
                this.deleteUserDialog = false;
                this.messageService.add({severity: 'success', summary: 'Success', detail: res['msg']});
                this.ngOnInit();
            }
        })
    }

    hideDialog() {
        this.userDialog = false;
        this.submitted = false;
    }

    saveUser() {
        this.submitted = true;
        console.log(this.user);
        if (this.user.id) {
            let params = {
                'name': this.user.name,
                'username': this.user.username,
                'role': this.user.role,
                'email': this.user.email
            }
            this.userSvc.updateUser(this.user.id, params).subscribe((res) => {
                if (res && res['success']) {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: res['msg'] });
                    this.userDialog = false;
                    this.ngOnInit();
                }
            })
        } else {
            let body = {
                'name': this.user.name,
                'email': this.user.email,
                'password': this.user.password,
                'username': this.user.username,
                'role': this.user.role
            }

            this.userSvc.storeUser(body).subscribe((res) => {
                if (res && res['success']) {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: res['msg'] });
                    this.userDialog = false;
                    this.ngOnInit();
                }
            })
        }
    }
}
