import { Component } from '@angular/core';
import { ConfigurationService } from '../configuration.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})
export class AboutComponent {
  githubName: string;
  githubUrl: string;

  constructor(private configuration: ConfigurationService) {
    this.githubName = configuration.get('githubName');
    this.githubUrl = configuration.get('githubUrl');
  }
}
