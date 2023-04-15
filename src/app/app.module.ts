import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InviteUserComponent } from './Pre-Onboarding/invite-user/invite-user.component';
import { LoginComponent } from './Pre-Onboarding/login/login.component';
import { CandidateDetailsComponent } from './Pre-Onboarding/candidate-details/candidate-details.component';
import { PreonboardingCompleteComponent } from './Pre-Onboarding/preonboarding-complete/preonboarding-complete.component';
import { PreOnboardingComponent } from './Pre-Onboarding/pre-onboarding/pre-onboarding.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContStateCityService } from './services/cont-state-city.service';
import { ConstcityComponent } from './Testing/constcity/constcity.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PreonboardingCompleteNextpartComponent } from './Pre-Onboarding/preonboarding-complete-nextpart/preonboarding-complete-nextpart.component';
import { TagInputModule } from 'ngx-chips';
import { ApplyLeaveComponent } from './Onboaring/apply-leave/apply-leave.component';
import { ContactUsComponent } from './Onboaring/contact-us/contact-us.component';
import { LoginOnboaringComponent } from './Onboaring/login-onboaring/login-onboaring.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

import { CommonModule, DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './Onboaring/header/header.component';
import { FooterComponent } from './Onboaring/footer/footer.component';
import { LeftPanelComponent } from './Onboaring/left-panel/left-panel.component';
import { RestrictcharComponent } from './Testing/restrictchar/restrictchar.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSelectFilterModule } from 'mat-select-filter';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { UserComponent } from './Testing/user/user.component';
import { PendingReportComponent } from './hr/pending-report/pending-report.component';
import { NewHiresComponent } from './hr/new-hires/new-hires.component';
import { AddExitDetailsComponent } from './hr/add-exitdetails/add-exit-details/add-exit-details.component';

import { AddLeaveComponent } from './hr/add-leave/add-leave.component';

import { ConfigurePayPeriodComponent } from './hr/configure-pay-period/configure-pay-period.component';
import { EmployeeRegistrationOnboardingComponent } from './Onboaring/employee-registration-onboarding/employee-registration-onboarding.component';
// import { EmployeeComponent } from './hr/employee/employee.component';
import { MyInfoComponent } from './Onboaring/my-info/my-info.component';
import { EditCandidateDetailsComponent } from './Pre-Onboarding/edit-candidate-details/edit-candidate-details.component';
import { EditDesignationComponent } from './hr/edit-designation/edit-designation.component';
import { EditDepartmentComponent } from './hr/edit-department/edit-department.component';
import { LeaveApplicationComponent } from './hr/leave/leave-application/leave-application.component';
import { LeaveTrackerComponent } from './hr/leave/leave-tracker/leave-tracker.component';
import { EditApplyLeaveComponent } from './hr/leave/edit-apply-leave/edit-apply-leave.component';
import { DepartmentComponent } from './hr/department/department.component';
import { DesignationComponent } from './hr/designation/designation.component';
import { DesignationDetailsComponent } from './hr/designation-details/designation-details.component';
// import { MatSelectFilterModule } from 'mat-select-filter';
import { DepartmentDetailsComponent } from './hr/department-details/department-details.component';
import { ProjectsComponent } from './hr/project/projects/projects.component';
import { EditProjectsComponent } from './hr/project/edit-projects/edit-projects.component';
import { AddDocumentComponent } from './hr/master/add-document/add-document.component';
import { EditDocumentComponent } from './hr/master/edit-document/edit-document.component';
import { DocumentManegmentComponent } from './hr/master/document-manegment/document-manegment.component';
import { HolidayComponent } from './hr/holiday/holiday/holiday.component';
import { EditHolidayComponent } from './hr/edit-holiday/edit-holiday/edit-holiday.component';
import { AddHolidayComponent } from './hr/add-holiday/add-holiday/add-holiday.component';
import { OnboardingLeftPanelComponent } from './Onboaring/onboarding-left-panel/onboarding-left-panel.component';
import { LeaveTrackerOnboardingComponent } from './Onboaring/leave/leave-tracker-onboarding/leave-tracker-onboarding.component';
import { ApplyLeaveOnboardingComponent } from './Onboaring/apply-leave-onboarding/apply-leave-onboarding.component';

import { CompanyHolidaysComponent } from './Onboaring/company-holidays/company-holidays.component';

import { FullcalenderComponent } from './Testing/fullcalender/fullcalender.component';
import { ColorSketchModule } from 'ngx-color/sketch';
import { TestComponent } from './Testing/test/test.component';
import { Test2Component } from './Testing/test2/test2.component';
import { TimesheetComponent } from './Onboaring/time-sheet/timesheet/timesheet.component';
import { UpdateTimesheetComponent } from './Onboaring/time-sheet/update-timesheet/update-timesheet.component';
import { DashboardComponent } from './Onboaring/dashboard/dashboard.component';
import { OnboardingDashboardComponent } from './Onboaring/onboarding-dashboard/onboarding-dashboard.component';
import { EditApplyLeaveOnboardingComponent } from './Onboaring/leave/edit-apply-leave-onboarding/edit-apply-leave-onboarding.component';
import { UserProfileComponent } from './Onboaring/user-profile/user-profile.component';
import { UserProfileOnboardingComponent } from './Onboaring/user-profile-onboarding/user-profile-onboarding.component';
import { CompanyHolidaysOnboardingComponent } from './Onboaring/company-holidays-onboarding/company-holidays-onboarding.component';
import { EmployeeTimesheetComponent } from './Onboaring/onboarding-time-sheet/employee-timesheet/employee-timesheet.component';
import { EmployeeUpdateTimesheetComponent } from './Onboaring/onboarding-time-sheet/employee-update-timesheet/employee-update-timesheet.component';
import { CompanyMailingCredentialsComponent } from './hr/company-mailing-credentials/company-mailing-credentials.component';
import { EmployeePendingReportComponent } from './Onboaring/employee-pending-report/employee-pending-report.component';
import { TimesheetApprovalRequestsComponent } from './hr/Timesheet Appoval-Requests/timesheet-approval-requests/timesheet-approval-requests.component';
import { AddExitViewComponent } from './hr/add-exitdetails/add-exit-view/add-exit-view.component';
import { EditExitDetailsComponent } from './hr/add-exitdetails/edit-exit-details/edit-exit-details.component';
import { EmployeeComponent } from './hr/employee/employee.component';
import { KnowledgeCenterComponent } from './hr/knowledge-center/knowledge-center.component';
import { AddEmployeeComponent } from './hr/add-employee/add-employee.component';
import { AddScheduleComponent } from './hr/add-schedule/add-schedule.component';
import { EditAddScheduleComponent } from './hr/schedule/edit-add-schedule/edit-add-schedule.component';
import { AddScheduleViewComponent } from './hr/schedule/add-schedule-view/add-schedule-view.component';
import { ViewEmployeeComponent } from './hr/view-employee/view-employee.component';
import { EditConfigurePayPeriodComponent } from './hr/configure-pay-period/edit-configure-pay-period/edit-configure-pay-period.component';
import { ConfigurePayPeriodViewComponent } from './hr/configure-pay-period/configure-pay-period-view/configure-pay-period-view.component';
import { EmpEditApplyLeaveComponent } from './hr/leave/emp-edit-apply-leave/emp-edit-apply-leave.component';
import { CompanyDetailComponent } from './admin/company-detail/company-detail.component';
import { CompanyInfoComponent } from './admin/company-info/company-info.component';
import { SettingComponent } from './Setting/setting/setting.component';
import { UserViewComponent } from './hr/user-view/user-view.component';
import { ResetPassComponent } from './Onboaring/reset-pass/reset-pass.component';
import { EditNewLeaveTypeComponent } from './hr/leave/edit-new-leave-type/edit-new-leave-type.component';
import { NewLeaveTypeComponent } from './hr/leave/new-leave-type/new-leave-type.component';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

import { PortalModule } from '@angular/cdk/portal';
import { EditUserViewComponent } from './hr/edit-user-view/edit-user-view.component';

@NgModule({
  declarations: [
    AddScheduleComponent,
    AddScheduleViewComponent,
    EditAddScheduleComponent,
    AppComponent,
    DepartmentDetailsComponent,
    DesignationDetailsComponent,
    InviteUserComponent,

    EditDesignationComponent,
    EditDepartmentComponent,
    LoginComponent,
    CandidateDetailsComponent,
    PreonboardingCompleteComponent,
    PreOnboardingComponent,

    ConstcityComponent,
    PreonboardingCompleteNextpartComponent,

    MyInfoComponent,
    EditCandidateDetailsComponent,
    ContactUsComponent,

    LoginOnboaringComponent,

    HeaderComponent,
    FooterComponent,
    LeftPanelComponent,

    RestrictcharComponent,
UserViewComponent,
    UserComponent,
    PendingReportComponent,
    NewHiresComponent,
    AddExitDetailsComponent,

    AddHolidayComponent,
    AddLeaveComponent,

    ConfigurePayPeriodComponent,
    ApplyLeaveComponent,
    EmployeeRegistrationOnboardingComponent,
    LeaveApplicationComponent,
    LeaveTrackerComponent,
    EditApplyLeaveComponent,
    DepartmentComponent,

    DesignationComponent,
    LoginOnboaringComponent,
    EditProjectsComponent,
    ProjectsComponent,
    DocumentManegmentComponent,
    AddDocumentComponent,
    EditDocumentComponent,
    HolidayComponent,
    EditHolidayComponent,
    HolidayComponent,
    EditHolidayComponent,
    TimesheetComponent,
    UpdateTimesheetComponent,
    OnboardingLeftPanelComponent,

    LeaveTrackerOnboardingComponent,
    ApplyLeaveOnboardingComponent,
    CompanyHolidaysComponent,
    FullcalenderComponent,
    TestComponent,
    Test2Component,
    DashboardComponent,
    OnboardingDashboardComponent,
    EditApplyLeaveOnboardingComponent,
    UserProfileComponent,
    UserProfileOnboardingComponent,
    CompanyHolidaysOnboardingComponent,

    EmployeeTimesheetComponent,
    EmployeeUpdateTimesheetComponent,
    CompanyMailingCredentialsComponent,
    EmployeePendingReportComponent,
    TimesheetApprovalRequestsComponent,
    AddExitViewComponent,
    EditExitDetailsComponent,
    EmployeeComponent,
    KnowledgeCenterComponent,
    AddEmployeeComponent,
    ViewEmployeeComponent,
    EditConfigurePayPeriodComponent,
    ConfigurePayPeriodViewComponent,
    EmpEditApplyLeaveComponent,
    CompanyDetailComponent,
    CompanyInfoComponent,
    SettingComponent,
    ResetPassComponent,
    EditNewLeaveTypeComponent,
    NewLeaveTypeComponent,
    EditUserViewComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    PortalModule,
    Ng2TelInputModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatAutocompleteModule,
    NgxUiLoaderModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatSelectFilterModule,

    NgMultiSelectDropDownModule.forRoot(),
    ColorSketchModule,
    NgxIntlTelInputModule
    // FullCalendarModule
  ],
  providers: [ContStateCityService, DatePipe],
  // providers: [AgendaService, DayService, WeekService, WorkWeekService, MonthService, DragAndDropService, ResizeService],

  bootstrap: [AppComponent],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}