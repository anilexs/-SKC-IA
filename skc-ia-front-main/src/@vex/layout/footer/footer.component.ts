import { Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'vex-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  @Input() customTemplate: TemplateRef<any>;
  year: number;

  constructor() {
    this.year = new Date(Date.now()).getFullYear();
  }

  ngOnInit() {
  }

  ngOnDestroy(): void { }
}
