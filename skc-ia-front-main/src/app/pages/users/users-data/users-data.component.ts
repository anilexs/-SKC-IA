import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { stagger20ms } from '../../../../@vex/animations/stagger.animation';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { User } from '../../../models/User.model';
import { scaleFadeIn400ms } from '../../../../@vex/animations/scale-fade-in.animation';
import { Role } from 'src/app/models/role.enum';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'vex-users-data',
  templateUrl: './users-data.component.html',
  styleUrls: ['./users-data.component.scss'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'standard'
      } as MatFormFieldDefaultOptions
    }
  ],
  animations: [
    stagger20ms,
    fadeInUp400ms,
    scaleFadeIn400ms
  ]
})
export class UsersDataComponent<T> implements OnInit, OnChanges, AfterViewInit {

  @Input() data: T[];
  @Input() columns: TableColumn<T>[];
  @Input() pageSize = 20;
  @Input() pageSizeOptions = [10, 20, 50];
  @Input() searchStr: string;

  @Output() openContact = new EventEmitter<User['pseudo']>();

  _contact: User;

  visibleColumns: Array<keyof T | string>;
  dataSource = new MatTableDataSource<T>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private US: UsersService) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.columns) {
      this.visibleColumns = this.columns.map(column => column.property);
    }

    if (changes.data) {
      this.dataSource.data = this.data;
    }

    if (changes.searchStr) {
      this.dataSource.filter = (this.searchStr || '').trim().toLowerCase();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  colorOfRole(role: string): string {
    switch (role) {
      case Role.admin:
        return 'purple';
      case Role.coach:
        return 'amber';
      case Role.membre:
        return 'green';
      case Role.fondateur:
        return 'red';
      case Role.invite:
        return 'gray';
      default:
        return 'secondary';
    }
  }

  majUser(user: User) {
    this._contact = user;
  }

  deleteUser(user: User) {
    this.US.deleteUser(user);
  }
}
