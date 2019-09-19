import {Component, Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'app-root',
  template:
    '<div *myVar="title as myVarTitle">' +
    '<h3>{{myVarTitle}}</h3>' +
    '<button (click)="myVarTitle=changedTitle">click me!</button>' +
    '</div>'
})
export class AppComponent {
  // noinspection JSUnusedGlobalSymbols
  title = 'my-var-directive-issue';
  // noinspection JSUnusedGlobalSymbols
  changedTitle = 'Title changed!';
}

/**
 * see https://stackoverflow.com/a/43172992/3212712
 */
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[myVar]',
})
export class VarDirective {
  @Input()
  set myVar(context: any) {
    this.context.$implicit = this.context.myVar = context;
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
