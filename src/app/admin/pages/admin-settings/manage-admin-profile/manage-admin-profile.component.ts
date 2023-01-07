import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AuthAdminService } from 'src/app/api-services/auth-admin.service';
import * as moment from 'moment';

@Component({
	selector: 'app-manage-admin-profile',
	templateUrl: './manage-admin-profile.component.html',
	styleUrls: ['./manage-admin-profile.component.css', '../../../layouts/admin-sidemenu/admin-sidemenu.component.css']
})
export class ManageAdminProfileComponent implements OnInit {

	public spinner: any = [false, false, false, false, false, false, false];
	public LoggedInUser: any = '';
	public LoggedInRole: any = '';
	public userInfoId: any = null;
	public viewProfilePic: any = null;
	public profilePic: any = null;
	public fullName: any = null;
	public userName: any = null;
	public emailName: any = null;
	public phoneNumber: any = null;
	public address: any = null;
	public cityName: any = null;
	public stateName: any = null;
	public countryName: any = null;
	public postalCode: any = null;
	public aboutMe: any = null;
	public websiteUrl: any = null;
	public githubUrl: any = null;
	public instagramUrl: any = null;
	public facebookUrl: any = null;
	public designationName: any = null;
	public departmentName: any = null;
	@ViewChild('ProfileForm', { static: false }) ProfileFormRef: NgForm;
	@ViewChild('PersonalInfoForm', { static: false }) PersonalInfoFormRef: NgForm;
	@ViewChild('AddressInfoForm', { static: false }) AddressInfoFormRef: NgForm;
	@ViewChild('AboutInfoForm', { static: false }) AboutInfoFormRef: NgForm;
	@ViewChild('OnlineInfoForm', { static: false }) OnlineInfoFormRef: NgForm;
	@ViewChild('WorkInfoForm', { static: false }) WorkInfoFormRef: NgForm;
	@ViewChild('fileInput', { static: false }) fileInputRef: ElementRef;

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
		this.getAdminProfile();
	}

	getAdminProfile() {
		this.authAdminService.getAdminProfileById(Number(this.userInfoId)).subscribe(async (response: any) => {
            console.log('Get admin profile by id response isss:', response);
            if (response && response.success) {
				let adminProfile: any = Object.assign(response.data, {});
				this.fullName = adminProfile['fullname'];
				this.userName = adminProfile['username'];
				this.emailName = adminProfile['email'];
				this.phoneNumber = adminProfile['mobile'];
				this.address = adminProfile['address'];
				this.cityName = adminProfile['city'];
				this.stateName = adminProfile['state'];
				this.countryName = adminProfile['country'];
				this.postalCode = adminProfile['zipcode'];
				adminProfile['profile'] = JSON.parse(adminProfile['profile']);
				this.viewProfilePic = this.getProfileInfo(adminProfile, 'image');
				this.aboutMe = this.getProfileInfo(adminProfile, 'aboutme');
				this.websiteUrl = this.getProfileInfo(adminProfile, 'website');
				this.githubUrl = this.getProfileInfo(adminProfile, 'github');
				this.instagramUrl = this.getProfileInfo(adminProfile, 'instagram');
				this.facebookUrl = this.getProfileInfo(adminProfile, 'facebook');
				this.designationName = this.getProfileInfo(adminProfile, 'designation');
				this.departmentName = this.getProfileInfo(adminProfile, 'department');
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

	onSelectImage(event?: any) {
		console.log('Selected event isss:', event);
		this.profilePic = event.target.files[0];
	}

	updateAdminProfile(section?: any) {
		if (this.setFormValidation(section)) {
			this.spinner[section] = false;
			return this.toastr.errorToastr('Please fill the required fields.');
		}

		this.spinner[section] = true;
		let adminProfile: any = {
			user_id: Number(this.userInfoId),
			user_section: Number(section),
			user_data: {}
		};

		if (section == 1) {
			adminProfile['profile'] = this.profilePic;
			adminProfile['user_data'] = {
				image: null
			}
		} else if (section == 2) {
			adminProfile['user_data'] = {
				fullname: this.fullName,
				username: this.userName,
				email: this.emailName,
				mobile: this.phoneNumber && this.phoneNumber.trim() ? this.phoneNumber.toString() : null
			}
		} else if (section == 3) {
			adminProfile['user_data'] = {
				address: this.address,
				city: this.cityName,
				state: this.stateName,
				country: this.countryName,
				zipcode: this.postalCode && this.postalCode.trim() ? this.postalCode.toString() : null
			}
		} else if (section == 4) {
			adminProfile['user_data'] = {
				aboutme: this.aboutMe
			}
		} else if (section == 5) {
			adminProfile['user_data'] = {
				website: this.websiteUrl,
				github: this.githubUrl,
				instagram: this.instagramUrl,
				facebook: this.facebookUrl
			}
		} else if (section == 6) {
			adminProfile['user_data'] = {
				designation: this.designationName,
				department: this.departmentName
			}
		}
		console.log('Post payload to update admin profile data isss:', adminProfile);

		this.authAdminService.updateAdminProfileData(adminProfile).subscribe(async (response: any) => {
            console.log('Get update admin profile data response isss:', response);
            if (response && response.success) {
				this.toastr.successToastr(response.message);
				this.getAdminProfile();
				if (section == 1){
					this.resetForm(section);
				}
            } else {
                this.toastr.errorToastr(response.message);
            }
            this.spinner[section] = false;
        }, (error: any) => {
            this.toastr.errorToastr('Network failed, Please try again.');
            this.spinner[section] = false;
        });
	}

	setFormValidation(section?: any) {
		if (section == 1) {
			return !this.profilePic;
		} else if (section == 2) {
			return !this.fullName || !this.userName || !this.emailName || !this.phoneNumber;
		} else if (section == 3) {
			return !this.address || !this.cityName || !this.stateName || !this.countryName || !this.postalCode;
		} else if (section == 4) {
			return !this.aboutMe;
		} else if (section == 5) {
			return !this.websiteUrl || !this.githubUrl || !this.instagramUrl || !this.facebookUrl;
		} else if (section == 6) {
			return !this.designationName || !this.departmentName;
		}
	}

	resetForm(section?: any) {
		if (section == 1) {
			this.ProfileFormRef.reset();
			this.fileInputRef.nativeElement.value = "";
			this.profilePic = null;
		} else if (section == 2) {
			this.PersonalInfoFormRef.reset();
			this.fullName = null;
			this.userName = null;
			this.emailName = null;
			this.phoneNumber = null;
		} else if (section == 3) {
			this.AddressInfoFormRef.reset();
			this.address = null;
			this.cityName = null;
			this.stateName = null;
			this.countryName = null;
			this.postalCode = null;
		} else if (section == 4) {
			this.AboutInfoFormRef.reset();
			this.aboutMe = null;
		} else if (section == 5) {
			this.OnlineInfoFormRef.reset();
			this.websiteUrl = null;
			this.githubUrl = null;
			this.instagramUrl = null;
			this.facebookUrl = null;
		} else if (section == 5) {
			this.WorkInfoFormRef.reset();
			this.designationName = null;
			this.departmentName = null;
		}
	}

}
