import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { ConfigService } from 'src/@vex/config/config.service';
import { LayoutService } from 'src/@vex/services/layout.service';
import { checkRouterChildsData } from 'src/@vex/utils/check-router-childs-data';

@Component({
  selector: 'vex-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent {
  sidenavCollapsed$ = this.layoutService.sidenavCollapsed$;
  isFooterVisible$ = this.configService.config$.pipe(map(config => config.footer.visible));
  isDesktop$ = this.layoutService.isDesktop$;

  toolbarShadowEnabled$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    startWith(null),
    map(() => checkRouterChildsData(this.router.routerState.root.snapshot, data => data.toolbarShadowEnabled))
  );

  constructor(
    private layoutService: LayoutService,
    private configService: ConfigService,
    private router: Router
  ) { }

}
