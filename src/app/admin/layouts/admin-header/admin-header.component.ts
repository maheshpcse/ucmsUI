import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AuthAdminService } from 'src/app/api-services/auth-admin.service';
import * as moment from 'moment';

@Component({
	selector: 'app-admin-header',
	templateUrl: './admin-header.component.html',
	styleUrls: ['./admin-header.component.css', '../admin-sidemenu/admin-sidemenu.component.css']
})
export class AdminHeaderComponent implements OnInit {

	public LoggedInUser: any = '';
	public LoggedInRole: any = '';
	public startTime: any = null;
	public sesstionTime: any = '00:30:00';

	constructor(
		public router: Router,
        public route: ActivatedRoute,
        public authAdminService: AuthAdminService,
        public toastr: ToastrManager
	) { }

	ngOnInit() {
		this.LoggedInUser = sessionStorage.getItem('fullname');
		this.LoggedInRole = sessionStorage.getItem('role');
		this.getSessionTime();
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

	ngOnDestroy(): void {
		//Called once, before the instance is destroyed.
		//Add 'implements OnDestroy' to the class.
		if (this.router.url == `/${this.LoggedInRole}/login`) {
			clearInterval(this.startTime);
			this.startTime = null;
			this.sesstionTime = '00:30:00';
		}
	}
}
