import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AuthAdminService } from 'src/app/api-services/auth-admin.service';
declare var $: any;
declare function mySidemenuToggles(): any;

@Component({
	selector: 'app-admin-sidemenu',
	templateUrl: './admin-sidemenu.component.html',
	styleUrls: ['./admin-sidemenu.component.css']
})
export class AdminSidemenuComponent implements OnInit {

	public currentUrl: any = '';
	public LoggedInUser: any = '';
	public LoggedInRole: any = '';
	public matchRoutes: any = {
		0: ['/admin/dashboard'],
		12: ['/admin/update-profile'],
		13: ['/admin/change-password'],
		16: ['/admin/profile']
	};

	constructor(
		public router: Router,
        public authAdminService: AuthAdminService,
        public toastr: ToastrManager
	) { }

	ngOnInit() {
		mySidemenuToggles();
		this.currentUrl = this.router.url;
		this.LoggedInUser = sessionStorage.getItem('fullname');
		this.LoggedInRole = sessionStorage.getItem('role');
	}

	getMainMenuActive(indexes?: any) {
		return {'show': (indexes.map(id => this.matchRoutes[id][0] == this.currentUrl).includes(true))};
	}

	getSubMenuActive(index?: any) {
		return {'active': this.matchRoutes[index][0] == this.currentUrl};
	}

	userLogout() {
		this.toastr.successToastr('Admin logout successful');
		this.authAdminService.isLoggedOut(this.LoggedInRole);
	}

}
