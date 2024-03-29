import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import Swal from 'sweetalert2';
import { AuthAdminService } from 'src/app/api-services/auth-admin.service';
import * as moment from 'moment';

@Component({
	selector: 'app-admin-login',
	templateUrl: './admin-login.component.html',
	styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

    public spinner: any = false;
	public isPwd: any = true;
	public adminLoginName: any = null;
	public adminPassword: any = null;

	constructor(
		public router: Router,
        public route: ActivatedRoute,
        public authAdminService: AuthAdminService,
        public toastr: ToastrManager
	) { }

	ngOnInit() {
	}

	showHidePassword() {
		this.isPwd = !this.isPwd;
	}

	getAdminLogin() {
		this.spinner = true;

        if (this.setFormValidation()) {
            this.spinner = false;
            return this.toastr.errorToastr('Please fill the required fields.');
        }

        const adminPayload = {
            adminLoginName: this.adminLoginName,
            password: this.adminPassword
        }
        console.log('Post payload to get admin login data isss:', adminPayload);

        this.authAdminService.adminLogin(adminPayload).subscribe(async (response: any) => {
            console.log('Get admin login data response isss:', response);
            if (response && response.success) {
                localStorage.setItem('isSettingsMenuActive', response.error);
		        sessionStorage.setItem('isSettingsMenuActive', response.error);
                for (const [key, value] of Object.entries(response.data)) {
                    let newItem: any = value;
                    localStorage.setItem(key, newItem);
                    sessionStorage.setItem(key, newItem);
                }
                this.getAlertMessage('success', response.message);
                setTimeout(() => {
                    this.router.navigate(['/admin/dashboard']);
                }, 1000);
            } else {
                this.getAlertMessage('error', response.message);
            }
            this.spinner = false;
        }, (error: any) => {
            this.getAlertMessage('warning', 'Network failed, Please try again.');
            this.spinner = false;
        });
	}

	setFormValidation() {
		if (!this.adminLoginName || !this.adminPassword) {
			return true;
		} else {
			return false;
		}
	}

    getAlertMessage(status?: any, message?: any) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            showCloseButton: true
        });
        Toast.fire({
            icon: status,
            title: message
        });
    }
}
