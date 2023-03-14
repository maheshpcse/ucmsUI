import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
	selector: 'app-admin-signup',
	templateUrl: './admin-signup.component.html',
	styleUrls: ['./admin-signup.component.css']
})
export class AdminSignupComponent implements OnInit {

	public formStep: any = 1;
	public isPwd: any = true;
	public isConfirmPwd: any = true;
	public firstName: any = null;
	public lastName: any = null;
	public userName: any = null;
	public emailName: any = null;
	public address: any = null;
	public cityName: any = null;
	public stateName: any = null;
	public countryName: any = null;
	public zipCode: any = null;
	public mobile: any = null;
	public roleName: any = null;
	public profilePic: any = null;
	public viewProfile: any = null;
	public password: any = null;
	public confirmPassword: any = null;
	@ViewChild('filename', { static: false }) filenameRef: any = ElementRef;

	constructor() { }

	ngOnInit() {
	}

	readURL(event: any): void {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0];
	
			const reader = new FileReader();
			reader.onload = (e: any) => this.viewProfile = reader.result;
	
			reader.readAsDataURL(file);
		}
	}

	closePreview() {
		this.filenameRef.nativeElement.value = '';
		this.viewProfile = null;
	}

	nextOrPrevForm(step: any) {
		this.formStep = Number(step);
	}

	showHidePassword(type: any) {
		if (Number(type) == 1) {
			this.isPwd = !this.isPwd;
		} else {
			this.isConfirmPwd = !this.isConfirmPwd;
		}
	}

}
