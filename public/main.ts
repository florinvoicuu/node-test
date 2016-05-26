import { bootstrap }    from 'angular2/platform/browser';
import { PLATFORM_DIRECTIVES, provide } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { AppComponent } from './app/component';

bootstrap(AppComponent, [provide(PLATFORM_DIRECTIVES, {useValue: [ROUTER_DIRECTIVES], multi: true})]);