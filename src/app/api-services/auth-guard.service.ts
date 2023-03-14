import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthAdminService } from './auth-admin.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Injectable({
	providedIn: 'root'
})
export class AuthGuardService {

    public role: any = sessionStorage.getItem('role');
    public matchRoutes: any = {
		0: ['/admin/profile'],
		1: ['/admin/notifications'],
		2: ['/admin/update-profile'],
		3: ['/admin/change-password'],
		4: ['/admin/manage-notifications'],
		5: ['/admin/settings-history']
	};
    public currentUrl: any = '';

	constructor(
		private router: Router,
        public authAdminService: AuthAdminService,
        public toastr: ToastrManager
	) {
        this.currentUrl = this.router.url;
    }

	canActivate(): boolean {
        if (this.role == 'admin' && this.authAdminService.isLoggedIn(this.role)) {
            return true;
        } else {
            this.getAlertMessage('warning', 'You are not authenticated or authorized user, Please login or signup.');
            this.authAdminService.isLoggedOut();
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
