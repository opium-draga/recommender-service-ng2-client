import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';

// Import containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';

const APP_CONTAINERS = [
  FullLayoutComponent,
  SimpleLayoutComponent
];

// Import components
import {
  AppAsideComponent,
  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV
} from './components';

const APP_COMPONENTS = [
  AppAsideComponent,
  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV
];

// Import directives
import {
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
} from './directives';

const APP_DIRECTIVES = [
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
];


// import services
const APP_SERVICES = [
  UserService,
  AuthGuardService,
  RequestService,
  ProjectService,
  UploadService
];

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import {UserService} from "./services/user.service";
import {AuthGuardService} from "./services/auth-guard.service";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RequestService} from "./services/request";
import {ProjectService} from "./services/project.service";
import {NewProjectComponent} from "./components/new-project/new-project.component";
import {ModalModule} from "ngx-bootstrap";
import { DataConfigurationComponent } from './components/data-configuration/data-configuration.component';
import {UploadService} from "./services/upload.service";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MatProgressBarModule} from "@angular/material";
import { ItemSetsComponent } from './components/data-configuration/components/item-sets/item-sets.component';
import { CollectedDataComponent } from './components/data-configuration/components/collected-data/collected-data.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    ChartsModule,
    FormsModule,
    NoopAnimationsModule,
    MatProgressBarModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    ...APP_COMPONENTS,
    ...APP_DIRECTIVES,
    NewProjectComponent,
    DataConfigurationComponent,
    ItemSetsComponent,
    CollectedDataComponent
  ],
  exports: [NewProjectComponent],
  entryComponents: [NewProjectComponent],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }, ...APP_SERVICES],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
