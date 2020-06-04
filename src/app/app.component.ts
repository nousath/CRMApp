import { AfterViewInit, Component, ViewContainerRef, OnInit } from '@angular/core';
import { GlobalState } from './global.state';
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from './theme/services';
import { BaThemeConfig } from './theme/theme.config';
// import { VersionCheckService } from './shared/version-check.service';

@Component({
  selector: 'app',
  styleUrls: ['./app.component.scss'],
  template: `
    <main [class.menu-collapsed]="isMenuCollapsed" baThemeRun>
      <div class="additional-bg"></div>
      <router-outlet></router-outlet>
    </main>
    <simple-notifications [options]= "options"></simple-notifications>
  `
})
export class AppComponent implements OnInit,AfterViewInit {

  isMenuCollapsed: boolean = false;
  options: any = {
    position: ['bottom', 'right'],
    timeOut: 5000,
    lastOnBottom: true,

  };

  constructor(private _state: GlobalState,
    private _imageLoader: BaImageLoaderService,
    private _spinner: BaThemeSpinner,
    private themeConfig: BaThemeConfig) {
      this.themeConfig.config();
      this._loadImages();

    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }
  // public versionUrl = 'version.json';
  ngOnInit() {
    // if (this.versionUrl) {
    //   this.versionCheckService.initVersionCheck(this.versionUrl);
    // }
  }

  ngAfterViewInit(): void {
    // hide spinner once all loaders are completed
    BaThemePreloader.load().then((values) => {
      this._spinner.hide();
    });
  }

  private _loadImages(): void {
    BaThemePreloader.registerLoader(this._imageLoader.load('assets/img/sky-bg.jpg'));
  }

}
