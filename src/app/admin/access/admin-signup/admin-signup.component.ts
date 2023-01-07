import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-admin-signup',
	templateUrl: './admin-signup.component.html',
	styleUrls: ['./admin-signup.component.css']
})
export class AdminSignupComponent implements OnInit {

	public formStep: any = 1;
	public isPwd: any = true;
	public isConfirmPwd: any = true;

	constructor() { }

	ngOnInit() {
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
