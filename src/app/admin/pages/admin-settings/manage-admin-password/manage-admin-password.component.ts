import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AuthAdminService } from 'src/app/api-services/auth-admin.service';
import * as moment from 'moment';
declare var $: any;

@Component({
	selector: 'app-manage-admin-password',
	templateUrl: './manage-admin-password.component.html',
	styleUrls: ['./manage-admin-password.component.css','../manage-admin-profile/manage-admin-profile.component.css']
})
export class ManageAdminPasswordComponent implements OnInit {

	public spinner: any = false;
	public LoggedInUser: any = '';
	public LoggedInRole: any = '';
	public userInfoId: any = null;
	public oldPassword: any = null;
	public newPassword: any = null;
	public confirmPassword: any = null;
	@ViewChild('PasswordInfoForm', { static: false }) PasswordInfoFormRef: NgForm;

	constructor(
		public router: Router,
        public route: ActivatedRoute,
        public authAdminService: AuthAdminService,
        public toastr: ToastrManager
	) { }

	ngOnInit() {
		this.LoggedInUser = sessionStorage.getItem('fullname');
		this.LoggedInRole = sessionStorage.getItem('role');
		this.userInfoId = sessionStorage.getItem('user_info_id');
		// console.log('userInfoId isss:', this.userInfoId);
	}

	openConfirmModal() {
		if (this.setFormValidation()) {
			this.spinner = false;
			return this.toastr.errorToastr('Please fill the required fields.');
		} else if (this.newPassword !== this.confirmPassword) {
			this.spinner = false;
			return this.toastr.errorToastr('The new password and the confirm password do not match.');
		} else {
			$('#updatePwdConfirmModal').modal('show');
		}
	}

	closeConfirmModal() {
		$('#updatePwdConfirmModal').modal('hide');
		this.resetForm();
	}

	updateAdminPassword() {
		this.spinner = true;
		let adminProfile: any = {
			user_info_id: Number(this.userInfoId),
			old_password: this.oldPassword,
			new_password: this.newPassword
		};
		console.log('Post payload to change admin password data isss:', adminProfile);

		this.authAdminService.updateAdminPassword(adminProfile).subscribe(async (response: any) => {
            console.log('Get change admin password data response isss:', response);
            if (response && response.success) {
				this.toastr.successToastr(response.message);
				localStorage.setItem('password', response.data);
				sessionStorage.setItem('password', response.data);
				this.closeConfirmModal();
            } else {
                this.toastr.errorToastr(response.message);
            }
            this.spinner = false;
        }, (error: any) => {
            this.toastr.errorToastr('Network failed, Please try again.');
            this.spinner = false;
        });
	}

	setFormValidation() {
		return (!this.oldPassword || !this.newPassword || !this.confirmPassword);
	}

	resetForm() {
		this.PasswordInfoFormRef.reset();
		this.oldPassword = null;
		this.newPassword = null;
		this.confirmPassword = null;
	}

}
