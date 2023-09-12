import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';
import { VexRoutes } from '../../../@vex/interfaces/vex-route.interface';
import { UsersComponent } from './users.component';


const routes: VexRoutes = [
    {
        path: '',
        component: UsersComponent,
        data: {
            scrollDisabled: true,
            toolbarShadowEnabled: true
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule, QuicklinkModule]
})
export class UsersRoutingModule {
}
