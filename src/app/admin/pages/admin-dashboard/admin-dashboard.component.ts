import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AuthAdminService } from 'src/app/api-services/auth-admin.service';
import * as moment from 'moment';

@Component({
	selector: 'app-admin-dashboard',
	templateUrl: './admin-dashboard.component.html',
	styleUrls: ['./admin-dashboard.component.css', '../../layouts/admin-sidemenu/admin-sidemenu.component.css']
})
export class AdminDashboardComponent implements OnInit {

	public LoggedInUser: any = '';
	public LoggedInRole: any = '';

	constructor(
		public router: Router,
        public route: ActivatedRoute,
        public authAdminService: AuthAdminService,
        public toastr: ToastrManager
	) { }

	ngOnInit() {
		this.LoggedInUser = sessionStorage.getItem('fullname');
		this.LoggedInRole = sessionStorage.getItem('role') == 'admin' ? 'Administrator' : '';
	}

}
