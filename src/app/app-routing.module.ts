import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplyLeaveComponent } from './Onboaring/apply-leave/apply-leave.component';
import { CandidateDetailsComponent } from './Pre-Onboarding/candidate-details/candidate-details.component';
import { ContactUsComponent } from './Onboaring/contact-us/contact-us.component';
import { DashboardComponent } from './Onboaring/dashboard/dashboard.component';
import { InviteUserComponent } from './Pre-Onboarding/invite-user/invite-user.component';
import { LoginComponent } from './Pre-Onboarding/login/login.component';
import { PreOnboardingComponent } from './Pre-Onboarding/pre-onboarding/pre-onboarding.component';
import { PreonboardingCompleteNextpartComponent } from './Pre-Onboarding/preonboarding-complete-nextpart/preonboarding-complete-nextpart.component';
import { PreonboardingCompleteComponent } from './Pre-Onboarding/preonboarding-complete/preonboarding-complete.component';
import { ConstcityComponent } from './Testing/constcity/constcity.component';
import { LoginOnboaringComponent } from './Onboaring/login-onboaring/login-onboaring.component';

// import { RestrictcharComponent } from './Testing/restrictchar/restrictchar.component';
import { UserComponent } from './Testing/user/user.component';
import { NewHiresComponent } from './hr/new-hires/new-hires.component';
import { PendingReportComponent } from './hr/pending-report/pending-report.component';
import { AddExitDetailsComponent } from './hr/add-exitdetails/add-exit-details/add-exit-details.component';
// import { DepartmentDetailsComponent } from './hr/department-details/department-details.component';

import { AddLeaveComponent } from './hr/add-leave/add-leave.component';
import { ConfigurePayPeriodComponent } from './hr/configure-pay-period/configure-pay-period.component';
// import { DesignationDetailsComponent } from './hr/designation-details/designation-details.component';
import { EmployeeRegistrationOnboardingComponent } from './Onboaring/employee-registration-onboarding/employee-registration-onboarding.component';
import { EditApplyLeaveComponent } from './hr/leave/edit-apply-leave/edit-apply-leave.component';
import { EditDesignationComponent } from './hr/edit-designation/edit-designation.component';
import { EditDepartmentComponent } from './hr/edit-department/edit-department.component';
import { DesignationComponent } from './hr/designation/designation.component';
// import { DesignationDetailsComponent } from './hr/designation-details/designation-details.component';
import { LeaveTrackerComponent } from './hr/leave/leave-tracker/leave-tracker.component';
// import { DepartmentDetailsComponent } from './hr/department-details/department-details.component';
import { DepartmentComponent } from './hr/department/department.component';
import { LeaveApplicationComponent } from './hr/leave/leave-application/leave-application.component';
import { EditCandidateDetailsComponent } from './Pre-Onboarding/edit-candidate-details/edit-candidate-details.component';
import { DesignationDetailsComponent } from './hr/designation-details/designation-details.component';
import { DepartmentDetailsComponent } from './hr/department-details/department-details.component';
import { ProjectsComponent } from './hr/project/projects/projects.component';
import { EditProjectsComponent } from './hr/project/edit-projects/edit-projects.component';
import { AddDocumentComponent } from './hr/master/add-document/add-document.component';
import { EditDocumentComponent } from './hr/master/edit-document/edit-document.component';
import { DocumentManegmentComponent } from './hr/master/document-manegment/document-manegment.component';

import { HolidayComponent } from './hr/holiday/holiday/holiday.component';
import { EditHolidayComponent } from './hr/edit-holiday/edit-holiday/edit-holiday.component';
import { AddHolidayComponent } from './hr/add-holiday/add-holiday/add-holiday.component';
import { MyInfoComponent } from './Onboaring/my-info/my-info.component';
import { OnboardingDashboardComponent } from './Onboaring/onboarding-dashboard/onboarding-dashboard.component';

import { LeaveTrackerOnboardingComponent } from './Onboaring/leave/leave-tracker-onboarding/leave-tracker-onboarding.component';
import { CompanyHolidaysComponent } from './Onboaring/company-holidays/company-holidays.component';
import { TestComponent } from './Testing/test/test.component';
import { Test2Component } from './Testing/test2/test2.component';
import { UpdateTimesheetComponent } from './Onboaring/time-sheet/update-timesheet/update-timesheet.component';
import { TimesheetComponent } from './Onboaring/time-sheet/timesheet/timesheet.component';
import { ApplyLeaveOnboardingComponent } from './Onboaring/apply-leave-onboarding/apply-leave-onboarding.component';
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
import { ViewEmployeeComponent } from './hr/view-employee/view-employee.component';
import { AddEmployeeComponent } from './hr/add-employee/add-employee.component';
import { ConfigurePayPeriodViewComponent } from './hr/configure-pay-period/configure-pay-period-view/configure-pay-period-view.component';
import { EditConfigurePayPeriodComponent } from './hr/configure-pay-period/edit-configure-pay-period/edit-configure-pay-period.component';
import { AddScheduleComponent } from './hr/add-schedule/add-schedule.component';
import { EditAddScheduleComponent } from './hr/schedule/edit-add-schedule/edit-add-schedule.component';
import { AddScheduleViewComponent } from './hr/schedule/add-schedule-view/add-schedule-view.component';
import { EmpEditApplyLeaveComponent } from './hr/leave/emp-edit-apply-leave/emp-edit-apply-leave.component';
import { CompanyDetailComponent } from './admin/company-detail/company-detail.component';
import { CompanyInfoComponent } from './admin/company-info/company-info.component';
import { ResetPassComponent } from './Onboaring/reset-pass/reset-pass.component';
import { NewLeaveTypeComponent } from './hr/leave/new-leave-type/new-leave-type.component';
import { EditNewLeaveTypeComponent } from './hr/leave/edit-new-leave-type/edit-new-leave-type.component';
import { UserViewComponent } from './hr/user-view/user-view.component';

import { EditUserViewComponent } from './hr/edit-user-view/edit-user-view.component';
import { ViewSettingComponent } from './setting/view-setting/view-setting.component';
import { AddRolesComponent } from './setting/roles/component/add-roles/add-roles.component';
import { ViewRolesComponent } from './setting/roles/component/view-roles/view-roles.component';

const routes: Routes = [


  { path: '', redirectTo: 'login-Onboarding', pathMatch: 'full' },


  {
    path: 'roles',
    component: ViewRolesComponent,
  },
  {
    path: 'add-roles',
    component: AddRolesComponent,
  },
  {
    path: 'user-view',
    component: UserViewComponent,
  },
  {
    path: 'edit-user-view/:id',
    component: EditUserViewComponent,
  },
  {
    path: 'setting',
    component: ViewSettingComponent,
  },
  {

    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'emp-edit-apply-leave/:ApplyLeaveId',
    component: EmpEditApplyLeaveComponent,
  },

  {
    path: 'leave-application/edit-apply-leave',
    component: EmpEditApplyLeaveComponent,
  },

  {
    path: 'add-schedule',
    component: AddScheduleComponent,
  },

  {
    path: 'add-schedule-view',
    component: AddScheduleViewComponent,
  },
  {
    path: 'edit-add-schedule/:AddScheduleId',
    component: EditAddScheduleComponent,
  },

  {
    path: 'department-details',
    component: DepartmentDetailsComponent,
  },
  {
    path: 'edit-apply-leave/:ApplyLeaveId',
    component: EditApplyLeaveComponent,
  },
  {
    path: 'leave-application',
    component: LeaveApplicationComponent,
  },

  {
    path: 'leave-application/edit-apply-leave',
    component: EditApplyLeaveComponent,
  },
  {
    path: 'leave-tracker',
    component: LeaveTrackerComponent,
  },

  {
    path: 'invite-user',
    component: InviteUserComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'PreOnboarding',
    component: PreOnboardingComponent,
  },
  {
    path: 'candidate',

    component: CandidateDetailsComponent,
  },

  {
    path: 'edit-candidate-details',
    component: EditCandidateDetailsComponent,
  },

  {
    path: 'preonboarding_complete',
    component: PreonboardingCompleteComponent,
  },
  {
    path: 'test',
    component: UserComponent,
  },
  {
    path: 'preonboarding_complete1',
    component: PreonboardingCompleteNextpartComponent,
  },
  {
    path: 'apply-leave',
    component: ApplyLeaveComponent,
  },

  {
    path: 'contact-us',
    component: ContactUsComponent,
  },
  {
    path: 'new-hire',
    component: NewHiresComponent,
  },

  {
    path: 'pending-report',
    component: PendingReportComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },

  {
    path: 'login-Onboarding',
    component: LoginOnboaringComponent,
  },

  {
    path: 'projects',
    component: ProjectsComponent,
  },

  {
    path: 'edit-projects/:project_name',
    component: EditProjectsComponent,
  },

  {
    path: 'exit-details',
    component: AddExitDetailsComponent,
  },

  {
    path: 'add-holiday',
    component: AddHolidayComponent,
  },
  {
    path: 'holiday',
    component: HolidayComponent,
  },
  {
    path: 'edit-holiday/:id',
    component: EditHolidayComponent,
  },

  {
    path: 'add-leave',
    component: AddLeaveComponent,
  },
  {
    path: 'configure-pay-period',
    component: ConfigurePayPeriodComponent,
  },
  {
    path: 'designation-details',
    component: DesignationDetailsComponent,
  },
  {
    path: 'designation',
    component: DesignationComponent,
  },
  {
    path: 'add-schedule',
    component: AddScheduleComponent,
  },
  {
    path: 'employee-registration',
    component: EmployeeRegistrationOnboardingComponent,
  },

  {
    path: 'designation/designation-details',
    component: DesignationDetailsComponent,
  },
  {
    path: 'designation-details/designation',
    component: DesignationComponent,
  },
  {
    path: 'edit-designation/:id',
    component: EditDesignationComponent,
  },

  {
    path: 'department',
    component: DepartmentComponent,
  },

  {
    path: 'edit-department/:departmentId',
    component: EditDepartmentComponent,
  },

  {
    path: 'document-management',
    component: DocumentManegmentComponent,
  },
  {
    path: 'add-document',
    component: AddDocumentComponent,
  },
  {
    path: 'edit-document/:documentid',
    component: EditDocumentComponent,
  },
  { path: 'timesheet', component: TimesheetComponent },
  { path: 'timesheet/edit/:id', component: UpdateTimesheetComponent },

  { path: 'employee-timesheet', component: EmployeeTimesheetComponent },
  {
    path: 'employee-timesheet/edit/:id',
    component: EmployeeUpdateTimesheetComponent,
  },

  {
    path: 'employee',
    component: MyInfoComponent,
  },
  {
    path: 'employee-dashboard',
    component: OnboardingDashboardComponent,
  },
  {
    path: 'my-info',
    component: MyInfoComponent,
  },

  {
    path: 'leave-tracker-onboarding',
    component: LeaveTrackerOnboardingComponent,
  },

  {
    path: 'company-holidays',
    component: CompanyHolidaysComponent,
  },
  {
    path: 'test1',
    component: TestComponent,
  },
  {
    path: 'test2',
    component: Test2Component,
  },
  {
    path: 'employee-apply-leave',
    component: ApplyLeaveOnboardingComponent,
  },
  {
    path: 'employee-edit-apply-leave/:ApplyLeaveId',
    component: EditApplyLeaveOnboardingComponent,
  },
  {
    path: 'user-profile',
    component: UserProfileComponent,
  },
  {
    path: 'employee-profile',
    component: UserProfileOnboardingComponent,
  },
  {
    path: 'employee-company-holidays',
    component: CompanyHolidaysOnboardingComponent,
  },

  {
    path: 'company-mailing-info',
    component: CompanyMailingCredentialsComponent,
  },
  {
    path: 'employee-pending-request',
    component: EmployeePendingReportComponent,
  },
  {
    path: 'timesheet-approval-request',
    component: TimesheetApprovalRequestsComponent,
  },
  {
    path: 'add-exit-view',
    component: AddExitViewComponent,
  },

  { path: 'edit-exit-details/:id', component: EditExitDetailsComponent },
  {
    path: 'employees-info',
    component: EmployeeComponent,
  },
  {
    path: 'knowledge-center',
    component: KnowledgeCenterComponent,
  },
  {
    path: 'view-employees',
    component: ViewEmployeeComponent,
  },
  {
    path: 'add-employees',
    component: AddEmployeeComponent,
  },

  {
    path: 'edit-configure-pay-period-view',

    component: EditConfigurePayPeriodComponent,
  },

  {
    path: 'configure-pay-period-view',

    component: ConfigurePayPeriodViewComponent,
  },
  {
    path: 'edit-configure-pay-period-view/:ConfigurePayPeriodID',

    component: EditConfigurePayPeriodComponent,
  },

  {
    path: 'configure-pay-period-view',

    component: ConfigurePayPeriodViewComponent,
  },
  {
    path: 'company-detail',

    component: CompanyDetailComponent,
  },
  {
    path: 'add-company',

    component: CompanyInfoComponent,
  },
  {
    path: 'testing-here',
    component: TestComponent,
  },
  {
    path: 'reset-password',
    component: ResetPassComponent,
  },
  {
    path: 'new-leave-type',

    component: NewLeaveTypeComponent,
  },
  

  {
    path: 'edit-new-leave-type/:id',

    component: EditNewLeaveTypeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
