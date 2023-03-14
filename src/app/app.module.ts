import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ToastrModule } from 'ng6-toastr-notifications';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AuthAdminService } from './api-services/auth-admin.service';
import { AuthGuardService } from './api-services/auth-guard.service';
import { AuthTokenInterceptorService } from './api-services/auth-token-interceptor.service';
import { CommonService } from './api-services/common.service';
import { DataTruncatePipe } from './app-services/data-truncate.pipe';
import { DataTransferPipe } from './app-services/data-transfer.pipe';
import { MyFilterPipe } from './app-services/my-filter.pipe';
import { HighlightDirective } from './app-services/highlight.directive';
import { CustomDirective } from './app-services/custom.directive';
import { AppComponent } from './app.component';
import { AdminLoginComponent } from './admin/access/admin-login/admin-login.component';
import { AdminSignupComponent } from './admin/access/admin-signup/admin-signup.component';
import { AdminHeaderComponent } from './admin/layouts/admin-header/admin-header.component';
import { AdminFooterComponent } from './admin/layouts/admin-footer/admin-footer.component';
import { AdminSidemenuComponent } from './admin/layouts/admin-sidemenu/admin-sidemenu.component';
import { AdminDashboardComponent } from './admin/pages/admin-dashboard/admin-dashboard.component';
import { AdminProfileComponent } from './admin/pages/admin-profile/admin-profile.component';
import { ManageAdminProfileComponent } from './admin/pages/admin-settings/manage-admin-profile/manage-admin-profile.component';
import { ManageAdminPasswordComponent } from './admin/pages/admin-settings/manage-admin-password/manage-admin-password.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminForgotPasswordComponent } from './admin/access/admin-forgot-password/admin-forgot-password.component';
import { ManageAdminNotificationsComponent } from './admin/pages/admin-settings/manage-admin-notifications/manage-admin-notifications.component';
import { AdminSettingsHistoryComponent } from './admin/pages/admin-settings/admin-settings-history/admin-settings-history.component';
import { TestPageComponent } from './test-page/test-page.component';
import { 
  MatFormFieldModule, 
  MatCardModule, 
  MatInputModule, 
  MatIconModule,
  MatToolbarModule,
  MatSelectModule,
  MatButtonModule, 
  MatCheckboxModule,
  MatDialogModule
} from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AdminPageLoaderComponent } from './admin/layouts/admin-page-loader/admin-page-loader.component';
import { AdminNotificationsComponent } from './admin/pages/admin-notifications/admin-notifications.component';
import { AdminHomeComponent } from './admin/pages/admin-home/admin-home.component';
import { AdminSettingsService } from './api-services/admin-settings.service';
import { AdminContactsService } from './api-services/admin-contacts.service';
import { AdminUsersService } from './api-services/admin-users.service';
import { AdminUploadService } from './api-services/admin-upload.service';
// import { OneSignalService } from './one-signal.service';

@NgModule({
  declarations: [
    CustomDirective,
    DataTransferPipe,
    DataTruncatePipe,
    HighlightDirective,
    MyFilterPipe,
    AppComponent,
    AdminLoginComponent,
    AdminSignupComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    AdminSidemenuComponent,
    AdminDashboardComponent,
    AdminProfileComponent,
    ManageAdminProfileComponent,
    ManageAdminPasswordComponent,
    AdminForgotPasswordComponent,
    NotFoundComponent,
    ManageAdminNotificationsComponent,
    AdminSettingsHistoryComponent,
    TestPageComponent,
    AdminPageLoaderComponent,
    AdminNotificationsComponent,
    AdminHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    CalendarModule,
    ToastrModule.forRoot(),
    AngularMultiSelectModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatFormFieldModule, 
    MatCardModule, 
    MatInputModule, 
    MatIconModule,
    MatToolbarModule,
    MatSelectModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SweetAlert2Module.forRoot(),
    Ng2SearchPipeModule,
    MatAutocompleteModule
  ],
  providers: [
    AuthGuardService,
    AuthAdminService,
    CommonService,
    AdminSettingsService,
    AdminContactsService,
    AdminUsersService,
    AdminUploadService,
    // OneSignalService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
