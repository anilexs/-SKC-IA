import { Component, Inject, LOCALE_ID, Renderer2 } from '@angular/core';
import { ConfigService } from '../@vex/config/config.service';
import { Settings } from 'luxon';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { NavigationService } from '../@vex/services/navigation.service';
import { LayoutService } from '../@vex/services/layout.service';
import { ActivatedRoute } from '@angular/router';
import { SplashScreenService } from '../@vex/services/splash-screen.service';
import { VexConfigName } from '../@vex/config/config-name.model';
import { ColorSchemeName } from '../@vex/config/colorSchemeName';
import { MatIconRegistry, SafeResourceUrlWithIconOptions } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { colorVariables } from 'src/@vex/components/config-panel/color-variables';
import { MapsService } from './services/maps.service';
import { Observable } from 'rxjs';
import { MapValo } from './models/maps/map.interface';

@Component({
  selector: 'vex-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private configService: ConfigService,
    private renderer: Renderer2,
    private platform: Platform,
    @Inject(DOCUMENT) private document: Document,
    @Inject(LOCALE_ID) private localeId: string,
    private layoutService: LayoutService,
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    private splashScreenService: SplashScreenService,
    private readonly matIconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer,
    private readonly mapsService: MapsService
  ) {
    const configMaps: any[] = [];

    // On créé un élément de menu pour chaque map
    for (const map of this.mapsService.maps) {
      configMaps.push({
        type: 'link',
        label: map.displayName.toUpperCase(),
        route: `/map/${map.displayName.toLowerCase()}`,
        routerLinkActiveOptions: { exact: true },
      })
    }

    Settings.defaultLocale = this.localeId;

    // Configuration
    this.configService.updateConfig({
      id: VexConfigName.zeus,
      name: 'Zeus SKC IA',
      layout: 'horizontal',
      direction: 'ltr',
      style: {
        button: {
          borderRadius: {
            value: 0.5,
            unit: 'rem'
          },
        },
        colorScheme: ColorSchemeName.dark,
        colors: {
          primary: colorVariables.red,
        },
        borderRadius: {
          value: 0.25,
          unit: 'rem'
        },
      },
      sidenav: {
        title: 'SKC IA',
        imageUrl: './assets/img/logo_skc.webp',
        showCollapsePin: true,
        state: "collapsed",
        search: {
          visible: false,
        },
        user: {
          visible: true
        },
      },
      toolbar: {
        fixed: true,
        user: {
          visible: false
        }
      },
      navbar: {
        position: 'in-toolbar',
      },
      footer: {
        visible: true,
        fixed: false
      }
    });

    if (this.platform.BLINK) {
      this.renderer.addClass(this.document.body, 'is-blink');
    }

    this.matIconRegistry.addSvgIconResolver(
      (
        name: string,
        namespace: string
      ): SafeResourceUrl | SafeResourceUrlWithIconOptions | null => {
        switch (namespace) {
          case 'mat':
            return this.domSanitizer.bypassSecurityTrustResourceUrl(
              `assets/img/icons/material-design-icons/two-tone/${name}.svg`
            );

          case 'logo':
            return this.domSanitizer.bypassSecurityTrustResourceUrl(
              `assets/img/icons/logos/${name}.svg`
            );

          case 'flag':
            return this.domSanitizer.bypassSecurityTrustResourceUrl(
              `assets/img/icons/flags/${name}.svg`
            );
        }
      }
    );

    /**
     * Customize the template to your needs with the ConfigService
     * Example:
     *  this.configService.updateConfig({
     *    sidenav: {
     *      title: 'Custom App',
     *      imageUrl: '//placehold.it/100x100',
     *      showCollapsePin: false
     *    },
     *    footer: {
     *      visible: false
     *    }
     *  });
     */

    // MENU
    this.navigationService.items = [
      {
        type: 'link',
        label: 'Agenda',
        icon: 'mat:event',
        route: '/',
        routerLinkActiveOptions: { exact: true },
      },
      {
        type: 'link',
        label: 'Équipe',
        icon: 'mat:group',
        route: '/equipe',
        routerLinkActiveOptions: { exact: true },
      },
      {
        type: 'dropdown',
        label: 'Maps',
        icon: 'mat:map',
        children: configMaps
      },
      {
        type: 'subheading',
        label: 'Admin',
        children: [
          {
            type: 'link',
            label: 'Utilisateurs',
            route: '/utilisateurs',
            icon: 'mat:lock',
            routerLinkActiveOptions: { exact: true },
          }
        ]
      }
    ];
  }
}
