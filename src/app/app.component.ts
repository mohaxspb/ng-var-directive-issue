import {Component, Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'app-root',
  template:
    '<div *ngVar="title as ngVarTitle">' +
    '<h3>{{ngVarTitle}}</h3>' +
    '<button (click)="ngVarTitle=changedTitle">click me!</button>' +
    '</div>'
})
export class AppComponent {
  // noinspection JSUnusedGlobalSymbols
  title = 'ng-var-directive-issue';
  // noinspection JSUnusedGlobalSymbols
  changedTitle = 'Title changed!';
}

/**
 * see https://stackoverflow.com/a/43172992/3212712
 */
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ngVar]',
})
export class VarDirective {
  @Input()
  set ngVar(context: any) {
    this.context.$implicit = this.context.ngVar = context;
    this.updateView();
  }

  context: any = {};

  constructor(private vcRef: ViewContainerRef, private templateRef: TemplateRef<any>) {
  }

  updateView() {
    this.vcRef.clear();
    this.vcRef.createEmbeddedView(this.templateRef, this.context);
  }
}
