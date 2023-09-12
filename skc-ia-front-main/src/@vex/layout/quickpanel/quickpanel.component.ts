import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vex-quickpanel',
  templateUrl: './quickpanel.component.html',
  styleUrls: ['./quickpanel.component.scss']
})
export class QuickpanelComponent implements OnInit {

  private date: Date = new Date(Date.now());
  jour: string;
  nbJour: string;
  mois: string;
  nbAnnee: string;

  constructor() { }

  ngOnInit() {
    this.jour = this.date.toLocaleDateString(undefined, { weekday: 'long' });
    this.nbJour = this.date.toLocaleDateString(undefined, { day: 'numeric' });
    this.mois = this.date.toLocaleDateString(undefined, { month: 'long' });
    this.nbAnnee = this.date.toLocaleDateString(undefined, { year: 'numeric' });
  }
}
