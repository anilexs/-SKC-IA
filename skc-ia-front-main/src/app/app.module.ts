import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VexModule } from '../@vex/vex.module';
import { HttpClientModule } from '@angular/common/http';

// App
import { LayoutModule } from '../@vex/layout/layout.module';
import { SidenavModule } from '../@vex/layout/sidenav/sidenav.module';
import { ToolbarModule } from '../@vex/layout/toolbar/toolbar.module';
import { FooterModule } from '../@vex/layout/footer/footer.module';
import { SidebarModule } from '../@vex/components/sidebar/sidebar.module';
import { QuickpanelModule } from '../@vex/layout/quickpanel/quickpanel.module';

// Auth
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

// Layouts
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

// Components
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { AuthGuard } from './pages/auth/auth.guard';
import { AuthService } from './pages/auth/auth.service';
import { MapsService } from './services/maps.service';
import { UsersService } from './services/users.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeLayoutComponent,
    AuthLayoutComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // Vex
    VexModule,
    LayoutModule,
    SidenavModule,
    ToolbarModule,
    FooterModule,
    SidebarModule,
    QuickpanelModule,

    // Auth
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,

    MatTooltipModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  providers: [MapsService, AuthService, AuthGuard, UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
