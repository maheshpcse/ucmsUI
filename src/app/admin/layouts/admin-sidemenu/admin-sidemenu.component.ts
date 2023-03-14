import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import Swal from 'sweetalert2';
import { AuthAdminService } from 'src/app/api-services/auth-admin.service';
declare var $: any;
declare var menuStatus: any;
declare function mySidemenuToggles(menuStatus): any;

@Component({
	selector: 'app-admin-sidemenu',
	templateUrl: './admin-sidemenu.component.html',
	styleUrls: ['./admin-sidemenu.component.css']
})
export class AdminSidemenuComponent implements OnInit {

	public spinner: any = false;
	public currentUrl: any = '';
	public LoggedInUser: any = '';
	public LoggedInRole: any = '';
	public userInfoId: any = null;
	public matchRoutes: any = {
		0: ['/admin/dashboard'],
		12: ['/admin/update-profile'],
		13: ['/admin/change-password'],
		16: ['/admin/profile'],
		17: ['/admin/notifications'],
		18: ['/admin/manage-notifications'],
		19: ['/admin/settings-history']
	};
	public isSettingsMenuActive: any = null;
	public isPwd: any = true;
	public settingsLoginName: any = null;
	public adminPassword: any = null;
	@ViewChild('settingsForm', { static: false }) settingsFormRef: NgForm;

	constructor(
		public router: Router,
        public authAdminService: AuthAdminService,
        public toastr: ToastrManager
	) { }

	ngOnInit() {
		mySidemenuToggles(true);
		this.currentUrl = this.router.url;
		this.LoggedInUser = sessionStorage.getItem('fullname');
		this.LoggedInRole = sessionStorage.getItem('role');
		this.userInfoId = sessionStorage.getItem('user_info_id');
		// console.log('userInfoId isss:', this.userInfoId);
		this.settingsLoginName = sessionStorage.getItem('adminLoginName');
		this.getAdminSettings();
	}

	getMainMenuActive(indexes?: any) {
		return {'show': (indexes.map((id: any) => this.matchRoutes[id][0] == this.currentUrl).includes(true))};
	}

	getSubMenuActive(index?: any) {
		return {'active': this.matchRoutes[index][0] == this.currentUrl};
	}

	getAdminSettings() {
		const tempSettingsMenuStatus = sessionStorage.getItem('isSettingsMenuActive') == 'true' ? true :
			sessionStorage.getItem('isSettingsMenuActive') == 'false' ? false : null;
		
		if (tempSettingsMenuStatus !== null) {
			this.isSettingsMenuActive = tempSettingsMenuStatus;
		} else {
			const settingsPayload = {
				user_info_id: Number(this.userInfoId),
				settingsLoginName: this.settingsLoginName
			}
			console.log('Post payload to get admin settings data isss:', settingsPayload);
	
			this.authAdminService.getAdminSettingsData(settingsPayload).subscribe(async (response: any) => {
				console.log('Get admin settings data response isss:', response);
				if (response && response.success) {
					let loginStatus: any = response.data['loginStatus'] == 0 ? false : response.data['loginStatus'] == 1 ? true : null;
					if (loginStatus !== null && loginStatus == true) {
						localStorage.setItem('isSettingsMenuActive', loginStatus);
						sessionStorage.setItem('isSettingsMenuActive', loginStatus);
						this.isSettingsMenuActive = loginStatus;
					} else {
						this.getAdminSettingsLoginOrLogout(false, this.matchRoutes[0], false);
					}
				} else {
					this.getAlertMessage('error', response.message);
				}
			}, (error: any) => {
				this.getAlertMessage('warning', 'Network failed, Please try again.');
			});
		}
	}

	showHideSettings(status?: any, routeUrl?: any, required?: any) {
		// localStorage.setItem('isSettingsMenuActive', status);
		// sessionStorage.setItem('isSettingsMenuActive', status);
		// this.isSettingsMenuActive = status;
		// this.router.navigate(routeUrl);
		this.getAdminSettingsLoginOrLogout(status, routeUrl, required);
	}

	showHidePassword() {
		this.isPwd = !this.isPwd;
	}

	getAdminSettingsLoginOrLogout(status?: any, routeUrl?: any, required?: any) {
		this.spinner = status ? true : false;

        if (status && this.setFormValidation()) {
            this.spinner = false;
            return this.toastr.errorToastr('Please fill the required fields.');
        }

        const settingsPayload = {
            settingsLoginName: this.settingsLoginName,
            password: this.adminPassword,
			isPasswordEntered: required,
			loginStatus: status ? 1 : 0
        }
        console.log('Post payload to get admin settings login/logout data isss:', settingsPayload);

        this.authAdminService.adminSettingsLoginOrLogout(settingsPayload).subscribe(async (response: any) => {
            console.log('Get admin settings login/logout data response isss:', response);
            if (response && response.success) {
                if (required) {
					this.getAlertMessage('success', response.message);
				}
				this.closeSettingsModal(status);
                setTimeout(() => {
                    this.router.navigate(routeUrl);
					localStorage.setItem('isSettingsMenuActive', status);
					sessionStorage.setItem('isSettingsMenuActive', status);
					this.isSettingsMenuActive = status;
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
		if (!this.settingsLoginName || !this.adminPassword) {
			return true;
		} else {
			return false;
		}
	}

	closeSettingsModal(status?: any) {
		if (status) {
			$('#settingsLoginConfirmModal').modal('hide');
		} else {
			$('#settingsLogoutConfirmModal').modal('hide');
		}
		if (this.settingsFormRef) {
			this.settingsFormRef.reset();
		}
		this.adminPassword = null;
	}

	userLogout() {
		// $('#sessionLogoutConfirmModal').modal('hide');
		// this.getAlertMessage('success', 'Admin logout successful');
		// this.authAdminService.isLoggedOut(this.LoggedInRole);
		this.spinner = true;

		const adminLoginPayload = {
			user_info_id: Number(this.userInfoId)
		}
        console.log('Post payload to get admin and settings logout data isss:', adminLoginPayload);

		this.authAdminService.adminAndSettingsLogout(adminLoginPayload).subscribe(async (response: any) => {
            console.log('Get admin and settings logout data response isss:', response);
            if (response && response.success) {
                this.getAlertMessage('success', response.message);
				$('#sessionLogoutConfirmModal').modal('hide');
                setTimeout(() => {
					this.authAdminService.isLoggedOut(this.LoggedInRole);
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

	getAlertMessage(status?: any, message?: any) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top',
			timer: 1000,
            timerProgressBar: true,
            showConfirmButton: false,
            showCloseButton: true
        });
        Toast.fire({
            icon: status,
            title: message
        });
    }
}
