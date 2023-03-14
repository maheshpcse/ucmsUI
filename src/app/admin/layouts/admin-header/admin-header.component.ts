import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import Swal from 'sweetalert2';
import { AuthAdminService } from 'src/app/api-services/auth-admin.service';
import * as moment from 'moment';
declare var $: any;

@Component({
	selector: 'app-admin-header',
	templateUrl: './admin-header.component.html',
	styleUrls: ['./admin-header.component.css', '../admin-sidemenu/admin-sidemenu.component.css']
})
export class AdminHeaderComponent implements OnInit {

	public spinner: any = false;
	public currentUrl: any = '';
	public LoggedInUser: any = '';
	public LoggedInRole: any = '';
	public userInfoId: any = null;
	public profilePic: any = null;
	public fullName: any = null;
	public userName: any = null;
	public userStatus: any = null;
	public userRole: any = null;
	public startTime: any = null;
	public sesstionTime: any = '00:30:00';
	public matchRoutes: any = {
		0: ['/admin/profile'],
		1: ['/admin/update-profile'],
		2: ['/admin/notifications']
	};
	public isSettingsMenuActive: any = null;
	public isPwd: any = true;
	public settingsLoginName: any = null;
	public adminPassword: any = null;
	@ViewChild('settingsForm', { static: false }) settingsFormRef: NgForm;

	constructor(
		public router: Router,
        public route: ActivatedRoute,
        public authAdminService: AuthAdminService,
        public toastr: ToastrManager
	) { }

	ngOnInit() {
		this.currentUrl = this.router.url;
		this.LoggedInUser = sessionStorage.getItem('fullname');
		this.LoggedInRole = sessionStorage.getItem('role');
		this.userInfoId = sessionStorage.getItem('user_info_id');
		// console.log('userInfoId isss:', this.userInfoId);
		this.settingsLoginName = sessionStorage.getItem('adminLoginName');
		this.getSessionTime();
		this.getAdminProfile();
		this.getAdminSettings();
	}

	getSubMenuActive(index?: any) {
		return {'active': this.matchRoutes[index][0] == this.currentUrl, 'disabled': this.isSettingsMenuActive == false};
	}

	hmsToSeconds(s: any) {
		var b: any = s.split(':');
		return b[0]*3600 + b[1]*60 + (+b[2] || 0);
	}

	secondsToHMS(secs: any) {
		function z(n) { return (n < 10 ? '0' : '') + n; }
		var sign: any = secs < 0 ? '-' : '';
		secs = Math.abs(secs);
		return sign + z(secs / 3600 | 0) + ':' + z((secs % 3600) / 60 | 0) + ':' + z(secs % 60);
	}

	getSessionTime() {
		const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
        const expiresTime = sessionStorage.getItem('expired');
        // console.log('currentTime isss:', currentTime);
        // console.log('expiresTime isss:', expiresTime);
		this.sesstionTime = this.secondsToHMS(this.hmsToSeconds(moment(expiresTime).format('HH:mm:ss')) - this.hmsToSeconds(moment(currentTime).format('HH:mm:ss')));
		this.startTime = setInterval(async() => {
			let currentTime = moment(moment().format('YYYY-MM-DD') + ` ${this.sesstionTime}`).subtract(1, 'seconds').format('HH:mm:ss');
			this.sesstionTime = currentTime;
			// console.log('sesstionTime', this.sesstionTime);
			if (this.sesstionTime == '00:00:00') {
				// this.clearSessionTime(this.startTime);
				clearInterval(this.startTime);
				this.startTime = null;
				this.sesstionTime = '00:30:00';
				this.authAdminService.isLoggedOut(this.LoggedInRole);
			}
		}, 1000);
	}

	getAdminProfile() {
		this.authAdminService.getAdminProfileById(Number(this.userInfoId)).subscribe(async (response: any) => {
            console.log('Get admin profile by id response isss:', response);
            if (response && response.success) {
				let adminProfile: any = Object.assign(response.data, {});
				this.fullName = adminProfile['fullname'];
				this.userName = adminProfile['username'];
				this.userRole = adminProfile['role'];
				this.userStatus = adminProfile['status'] == 1 ? 'Active' : 'Inactive';
				adminProfile['profile'] = JSON.parse(adminProfile['profile']);
				this.profilePic = this.getProfileInfo(adminProfile, 'image');
            } else {
                this.toastr.errorToastr(response.message);
            }
        }, (error: any) => {
            this.toastr.errorToastr('Network failed, Please try again.');
        });
	}

	getProfileInfo(data?: any, key?: any) {
		return data['profile'] && Object.keys(data['profile']).length > 0 && data['profile'].hasOwnProperty(key) ? data['profile'][key] : null;
	}

	getAdminSettings() {
		const tempSettingsMenuStatus = sessionStorage.getItem('isSettingsMenuActive') == 'true' ? true :
			sessionStorage.getItem('isSettingsMenuActive') == 'false' ? false : null;
		
		if (tempSettingsMenuStatus !== null) {
			this.isSettingsMenuActive = tempSettingsMenuStatus;
		} else {
			let loginStatus: any = null;

			const settingsPayload = {
				user_info_id: Number(this.userInfoId),
				settingsLoginName: this.settingsLoginName
			}
			console.log('Post payload to get admin settings data isss:', settingsPayload);
	
			this.authAdminService.getAdminSettingsData(settingsPayload).subscribe(async (response: any) => {
				console.log('Get admin settings data response isss:', response);
				if (response && response.success) {
					loginStatus = response.data['loginStatus'] == 0 ? false : response.data['loginStatus'] == 1 ? true : null;
				} else {
					this.getAlertMessage('error', response.message);
				}
				localStorage.setItem('isSettingsMenuActive', loginStatus);
				sessionStorage.setItem('isSettingsMenuActive', loginStatus);
				this.isSettingsMenuActive = loginStatus;
			}, (error: any) => {
				this.getAlertMessage('warning', 'Network failed, Please try again.');
				localStorage.setItem('isSettingsMenuActive', loginStatus);
				sessionStorage.setItem('isSettingsMenuActive', loginStatus);
				this.isSettingsMenuActive = loginStatus;
			});
		}
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

	ngOnDestroy(): void {
		//Called once, before the instance is destroyed.
		//Add 'implements OnDestroy' to the class.
		if (this.router.url == `/${this.LoggedInRole}/login`) {
			clearInterval(this.startTime);
			this.startTime = null;
			this.sesstionTime = '00:30:00';
			this.userLogout();
		}
	}
}
