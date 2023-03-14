import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './api-services/auth-guard.service';
import { AdminLoginComponent } from './admin/access/admin-login/admin-login.component';
import { AdminSignupComponent } from './admin/access/admin-signup/admin-signup.component';
import { AdminForgotPasswordComponent } from './admin/access/admin-forgot-password/admin-forgot-password.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminDashboardComponent } from './admin/pages/admin-dashboard/admin-dashboard.component';
import { AdminProfileComponent } from './admin/pages/admin-profile/admin-profile.component';
import { ManageAdminProfileComponent } from './admin/pages/admin-settings/manage-admin-profile/manage-admin-profile.component';
import { ManageAdminPasswordComponent } from './admin/pages/admin-settings/manage-admin-password/manage-admin-password.component';
import { ManageAdminNotificationsComponent } from './admin/pages/admin-settings/manage-admin-notifications/manage-admin-notifications.component';
import { AdminSettingsHistoryComponent } from './admin/pages/admin-settings/admin-settings-history/admin-settings-history.component';
import { AdminNotificationsComponent } from './admin/pages/admin-notifications/admin-notifications.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'admin/login',
		pathMatch: 'full'
	},
	{
		path: 'admin/login',
		component: AdminLoginComponent
	},
	{
		path: 'admin/signup',
		component: AdminSignupComponent
	},
	{
		path: 'admin/forgot-password',
		component: AdminForgotPasswordComponent
	},

	// ************** Admin Menu Routes ********************
	{
		path: 'admin/dashboard',
		canActivate: [AuthGuardService],
		component: AdminDashboardComponent
	},

	// ************** Admin Settings Menu Routes ********************
	{
		path: 'admin/profile',
		canActivate: [AuthGuardService],
		component: AdminProfileComponent
	},
	{
		path: 'admin/notifications',
		canActivate: [AuthGuardService],
		component: AdminNotificationsComponent
	},
	{
		path: 'admin/update-profile',
		canActivate: [AuthGuardService],
		component: ManageAdminProfileComponent
	},
	{
		path: 'admin/change-password',
		canActivate: [AuthGuardService],
		component: ManageAdminPasswordComponent
	},
	{
		path: 'admin/manage-notifications',
		canActivate: [AuthGuardService],
		component: ManageAdminNotificationsComponent
	},
	{
		path: 'admin/settings-history',
		canActivate: [AuthGuardService],
		component: AdminSettingsHistoryComponent
	},
	{
		path: '**',
		component: NotFoundComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
