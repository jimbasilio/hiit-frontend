import {bootstrap}    from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HomeComponent} from './components/home/home.component';

// make router available to entire app globally
bootstrap(HomeComponent, [ROUTER_PROVIDERS]);
