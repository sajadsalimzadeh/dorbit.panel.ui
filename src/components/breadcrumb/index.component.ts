import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BaseComponent} from "@framework";

@Component({
  selector: 'panel-breadcrumb',
  templateUrl: 'index.component.html',
  styleUrls: ['./index.component.scss']
})

export class BreadcrumbComponent extends BaseComponent {
  @Input() backLink?: string;

  @Output() onBack = new EventEmitter();

  urls: string[] = [];

  override ngOnInit() {
    super.ngOnInit();

    this.urls = ['project.name'];
    this.urls.push(...this.router.url.split('/').filter(x => !!x).map(x => 'route.' + x));
  }

  back() {
    if(this.backLink) {
      this.router.navigateByUrl(this.backLink);
    } else if (this.onBack.observed) {
      this.onBack.emit();
    } else {
      this.location.back();
    }
  }
}
