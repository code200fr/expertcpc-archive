import { Component } from '@angular/core';
import { Configuration, ConfigurationService } from '../configuration.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  githubName: string;
  githubUrl: string;

  constructor(private configuration: ConfigurationService) {
    this.githubName = configuration.get('githubName');
    this.githubUrl = configuration.get('githubUrl');
  }
}
