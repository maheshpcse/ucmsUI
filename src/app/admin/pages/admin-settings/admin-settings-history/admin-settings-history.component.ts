import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import Swal from 'sweetalert2';
import { AuthAdminService } from 'src/app/api-services/auth-admin.service';
import { AdminSettingsService } from 'src/app/api-services/admin-settings.service';
import * as moment from 'moment';
declare var $: any;

@Component({
	selector: 'app-admin-settings-history',
	templateUrl: './admin-settings-history.component.html',
	styleUrls: ['./admin-settings-history.component.css', '../../../layouts/admin-sidemenu/admin-sidemenu.component.css']
})
export class AdminSettingsHistoryComponent implements OnInit {

	public pageSpinner: any = false;
	public spinner: any = false;
	public LoggedInUser: any = '';
	public LoggedInRole: any = '';
	public userInfoId: any = null;
	public userName: any = null;
	public limit: any = 10;
	public page: any = 1;
	public count: any = 0;
	public totalPages: any = 0;
	public pager: any = {};
	public searchQuery: any = '';
	public searchBy: any = '';
	public sortBy: any = 'ash.setting_log_id';
	public sortOrder: any = 'DESC';
	public settingsHistoryDataList: any = [];
	public settingsHistoryDataCount: any = 0;
	public settingHistoryItem: any = {};

	constructor(
		public router: Router,
        public route: ActivatedRoute,
        public authAdminService: AuthAdminService,
		public adminSettingsService: AdminSettingsService,
        public toastr: ToastrManager
	) { }

	ngOnInit() {
		this.LoggedInUser = sessionStorage.getItem('fullname');
		this.LoggedInRole = sessionStorage.getItem('role');
		this.userInfoId = sessionStorage.getItem('user_info_id');
		// console.log('userInfoId isss:', this.userInfoId);
		this.userName = sessionStorage.getItem('username');
		// console.log('userName isss:', this.userName);
		this.getAdminSettingsHistory();
	}

	getAdminSettingsHistory() {
		this.spinner = true;

		const settingsPayload = {
			limit: Number(this.limit),
			page: Number(this.page),
			search_query: this.searchQuery ? this.searchQuery.toString().trim() : this.searchQuery,
			search_by: {
				fullname: false,
				setting_name: false,
				setting_detail: false,
				request_info: false
			},
			sort_by: this.sortBy,
			sort_order: this.sortOrder,
			get_count: false,
			created_by: this.userName
		}
		console.log('Post payload to get admin settings history data isss:', settingsPayload);

		this.adminSettingsService.getAdminSettingsHistoryData(settingsPayload).subscribe(async (response: any) => {
            console.log('Get admin settings history data response isss:', response);
            if (response && response.success) {
				this.settingsHistoryDataList = response.data.list;
				this.settingsHistoryDataCount = response.data.count;
            } else {
				this.getAlertMessage('error', response.message);
            }
            this.spinner = false;
        }, (error: any) => {
			this.getAlertMessage('warning', 'Network failed, Please try again.');
            this.spinner = false;
        });
	}

	openViewSettingLogModal(item?: any) {
		$('#viewSettingLogModal').modal('show');
		this.settingHistoryItem = item;
	}

	closeviewSettingLogModal() {
		$('#viewSettingLogModal').modal('hide');
		this.settingHistoryItem = {};
	}

	getAlertMessage(status?: any, message?: any) {
		Swal.fire(
			status == 'success' ? 'Success.' : status == 'error' ? 'Error?' : status == 'warning' ? 'Warning!' : '',
			message,
			status
		);
	}
}
