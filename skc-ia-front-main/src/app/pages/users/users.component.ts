import { Component, OnInit } from '@angular/core';
import { scaleIn400ms } from '../../../@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '../../../@vex/animations/fade-in-right.animation';
import { TableColumn } from '../../../@vex/interfaces/table-column.interface';
import { UntypedFormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { stagger40ms } from '../../../@vex/animations/stagger.animation';
import { MatDialog } from '@angular/material/dialog';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { User } from '../../models/User.model';
import { Role } from 'src/app/models/role.enum';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'vex-users',
  templateUrl: './users.component.html',
  animations: [
    stagger40ms,
    scaleIn400ms,
    fadeInRight400ms
  ],
  styleUrls: ['./users.component.scss'],
  styles: [
    `.mat-drawer-container {
      background: transparent !important;
    }
  `]
})
export class UsersComponent implements OnInit {
  searchCtrl = new UntypedFormControl();

  searchStr$ = this.searchCtrl.valueChanges.pipe(
    debounceTime(10)
  );

  menuOpen = false;

  activeCategory: Role | 'all' = 'all';
  tableColumns: TableColumn<User>[] = [
    {
      label: '',
      property: 'selected',
      type: 'checkbox',
      cssClasses: ['w-6']
    },
    {
      label: '',
      property: 'image',
      type: 'image',
      cssClasses: ['min-w-9']
    },
    {
      label: 'Pseudo',
      property: 'pseudo',
      type: 'text',
      cssClasses: ['font-medium']
    },
    {
      label: 'Riot ID',
      property: 'id_riot',
      type: 'text',
      cssClasses: ['text-secondary']
    },
    {
      label: 'Rôle',
      property: 'role',
      type: 'badge',
      cssClasses: []
    },
    {
      label: '',
      property: 'menu',
      type: 'button',
      cssClasses: ['text-secondary']
    },
  ];

  constructor(private dialog: MatDialog, public US: UsersService) { }

  ngOnInit() {
  }

  openContact(id?: User['pseudo']) {
    this.dialog.open(UsersEditComponent, {
      data: id || null,
      width: '600px'
    });
  }

  setData(data: User[]) {
    this.menuOpen = false;
  }

  openMenu() {
    this.menuOpen = true;
  }
}
