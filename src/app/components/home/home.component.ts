import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {AboutComponent} from '../about/about.component';
import {ContactComponent} from '../contact/contact.component';
import {ProgramsComponent} from '../programs/programs.component';

@RouteConfig([  
  {
    path: '/about',
    name: 'About',
    component: AboutComponent
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactComponent
  },
  {
    path: '/programs',
    name: 'Programs',
    component: ProgramsComponent
  }  
])

@Component({
    selector: 'hiit',
    templateUrl: 'templates/home.html',
    directives: [ROUTER_DIRECTIVES]
})

export class HomeComponent {
    public hitext = 'hello';
}
