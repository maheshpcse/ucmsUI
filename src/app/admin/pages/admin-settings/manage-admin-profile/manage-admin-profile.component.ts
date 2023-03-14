import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import Swal from 'sweetalert2';
import { AuthAdminService } from 'src/app/api-services/auth-admin.service';
import * as moment from 'moment';
declare var $: any;

@Component({
	selector: 'app-manage-admin-profile',
	templateUrl: './manage-admin-profile.component.html',
	styleUrls: ['./manage-admin-profile.component.css', '../../../layouts/admin-sidemenu/admin-sidemenu.component.css']
})
export class ManageAdminProfileComponent implements OnInit {

	public spinner: any = false;
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
	public section: any = null;
	public customModalTitleText: any = '';
	public customModalBodyText: any = '';

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
		this.getAdminProfile(null);
	}

	getAdminProfile(section?: any) {
		this.authAdminService.getAdminProfileById(Number(this.userInfoId)).subscribe(async (response: any) => {
            console.log('Get admin profile by id response isss:', response);
            if (response && response.success) {
				let adminProfile: any = Object.assign(response.data, {});
				if ([1, 4, 5, 6].includes(Number(section)) || section == null) {
					adminProfile['profile'] = JSON.parse(adminProfile['profile']);
				}
				if (section == 1 || section == null) {
					this.viewProfilePic = this.getProfileInfo(adminProfile, 'image');
				}
				if (section == 2 || section == null) {
					this.fullName = adminProfile['fullname'];
					this.userName = adminProfile['username'];
					this.emailName = adminProfile['email'];
					this.phoneNumber = adminProfile['mobile'];
				}
				if (section == 3 || section == null) {
					this.address = adminProfile['address'];
					this.cityName = adminProfile['city'];
					this.stateName = adminProfile['state'];
					this.countryName = adminProfile['country'];
					this.postalCode = adminProfile['zipcode'];
				}
				if (section == 4 || section == null) {
					this.aboutMe = this.getProfileInfo(adminProfile, 'aboutme');
				}
				if (section == 5 || section == null) {
					this.websiteUrl = this.getProfileInfo(adminProfile, 'website');
					this.githubUrl = this.getProfileInfo(adminProfile, 'github');
					this.instagramUrl = this.getProfileInfo(adminProfile, 'instagram');
					this.facebookUrl = this.getProfileInfo(adminProfile, 'facebook');
				}
				if (section == 6 || section == null) {
					this.designationName = this.getProfileInfo(adminProfile, 'designation');
					this.departmentName = this.getProfileInfo(adminProfile, 'department');
				}
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

	openConfirmModal(section?: any) {
		this.section = section;
		if (this.setFormValidation(section)) {
			this.spinner = false;
			return this.getAlertMessage('error', 'Please fill the required fields.');
		} else {
			this.customModalTitleText = section == 1 ? 'user profile' : section == 2 ? 'user info' : section == 3 ? 'contact info' : section == 4 ? 'info about me' 
			: section == 5 ? 'online profile' : section == 6 ? 'work info' : '';
			this.customModalBodyText = section == 1 ? 'user profile' : section == 2 ? 'user information' : section == 3 ? 'contact information' : section == 4 ? 'information about me' 
			: section == 5 ? 'online profile' : section == 6 ? 'work information' : '';
			$('#updateProfileConfirmModal').modal('show');
		}
	}

	closeConfirmModal(section?: any) {
		$('#updateProfileConfirmModal').modal('hide');
		setTimeout(() => {
			this.customModalTitleText = '';
			this.customModalBodyText = '';
			this.section = null;
		}, 1000);
		if (section == 1) {
			this.resetForm(section);
		}
	}

	onSelectImage(event?: any) {
		console.log('Selected event isss:', event);
		this.profilePic = event.target.files[0];
	}

	updateAdminProfile(section?: any) {
		if (this.setFormValidation(section)) {
			this.spinner = false;
			return this.getAlertMessage('error', 'Please fill the required fields.');
		}

		this.spinner = true;
		let adminProfile: any = {
			user_id: Number(this.userInfoId),
			user_section: Number(section),
			user_data: {},
			auditName: '',
			requestStartTime: moment().format('YYYY-MM-DD HH:mm:ss')
		};

		if (section == 1) {
			adminProfile['profile'] = this.profilePic;
			adminProfile['user_data'] = {
				image: null
			};
			adminProfile['auditName'] = 'user_profile';
		} else if (section == 2) {
			adminProfile['user_data'] = {
				fullname: this.fullName,
				username: this.userName,
				email: this.emailName,
				mobile: this.phoneNumber && this.phoneNumber.toString().trim() ? this.phoneNumber.toString().trim() : null
			}
			adminProfile['auditName'] = 'user_personal_information';
		} else if (section == 3) {
			adminProfile['user_data'] = {
				address: this.address,
				city: this.cityName,
				state: this.stateName,
				country: this.countryName,
				zipcode: this.postalCode && this.postalCode.toString().trim() ? this.postalCode.toString().trim() : null
			}
			adminProfile['auditName'] = 'user_contact_information';
		} else if (section == 4) {
			adminProfile['user_data'] = {
				aboutme: this.aboutMe
			}
			adminProfile['auditName'] = 'user_about_me';
		} else if (section == 5) {
			adminProfile['user_data'] = {
				website: this.websiteUrl,
				github: this.githubUrl,
				instagram: this.instagramUrl,
				facebook: this.facebookUrl
			}
			adminProfile['auditName'] = 'user_online_profile';
		} else if (section == 6) {
			adminProfile['user_data'] = {
				designation: this.designationName,
				department: this.departmentName
			}
			adminProfile['auditName'] = 'user_work_information';
		}
		console.log('Post payload to update admin profile data isss:', adminProfile);

		this.authAdminService.updateAdminProfileData(adminProfile).subscribe(async (response: any) => {
            console.log('Get update admin profile data response isss:', response);
            if (response && response.success) {
				this.getAlertMessage('success', response.message);
				this.closeConfirmModal(section);
				this.getAdminProfile(section);
            } else {
                this.getAlertMessage('error', response.message);
            }
            this.spinner = false;
        }, (error: any) => {
            this.getAlertMessage('warning', 'Network failed, Please try again.');
            this.spinner = false;
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

	getAlertMessage(status?: any, message?: any) {
		Swal.fire(
			status == 'success' ? 'Success.' : status == 'error' ? 'Error?' : status == 'warning' ? 'Warning!' : '',
			message,
			status
		);
	}
}
