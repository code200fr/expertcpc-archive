import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AboutComponent } from '../about/about.component';
import { ConfigurationService } from '../configuration.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  age: string;
  version: string;
  github: {
    name: string,
    url: string
  };

  constructor(private configuration: ConfigurationService, public dialog: MatDialog) {
    this.age = configuration.get('dataAge');
    this.version = configuration.get('version');
    this.github = {
      name: configuration.get('githubName'),
      url: configuration.get('githubUrl')
    };
  }

  openAbout(): void {
    this.dialog.open(AboutComponent);
  }
}
