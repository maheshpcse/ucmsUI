import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AuthAdminService } from 'src/app/api-services/auth-admin.service';
import * as moment from 'moment';

@Component({
	selector: 'app-admin-profile',
	templateUrl: './admin-profile.component.html',
	styleUrls: ['./admin-profile.component.css', '../../layouts/admin-sidemenu/admin-sidemenu.component.css']
})
export class AdminProfileComponent implements OnInit {

	public pageSpinner: any = false;
	public LoggedInUser: any = '';
	public LoggedInRole: any = '';
	public userInfoId: any = null;
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
	public userStatus: any = null;
	public userRole: any = null;
	public aboutMe: any = null;
	public websiteUrl: any = null;
	public githubUrl: any = null;
	public instagramUrl: any = null;
	public facebookUrl: any = null;
	public designationName: any = null;
	public departmentName: any = null;

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
				this.userRole = adminProfile['role'];
				this.userStatus = adminProfile['status'] == 1 ? 'Active' : 'Inactive';
				adminProfile['profile'] = JSON.parse(adminProfile['profile']);
				this.profilePic = this.getProfileInfo(adminProfile, 'image');
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
	
	openLink(url?: any) {
		window.open(url, "_blank");
	}

}
