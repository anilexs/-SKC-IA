import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../../models/User.model';
import { fadeInRight400ms } from '../../../../@vex/animations/fade-in-right.animation';
import { stagger40ms } from '../../../../@vex/animations/stagger.animation';
import { Role } from 'src/app/models/role.enum';
import { UsersService } from 'src/app/services/users.service';

export interface UsersMenu {
  type: 'link' | 'subheading';
  id?: 'all' | 'admin' | 'fondateur' | 'coach' | 'membre' | 'invite';
  icon?: string;
  label: string;
  classes?: {
    icon?: string;
  };
}

@Component({
  selector: 'vex-users-menu',
  templateUrl: './users-menu.component.html',
  styleUrls: ['./users-menu.component.scss'],
  animations: [fadeInRight400ms, stagger40ms]
})
export class UsersMenuComponent implements OnInit {
  @Input() items: UsersMenu[] = [
    {
      type: 'link',
      id: 'all',
      icon: 'mat:view_headline',
      label: 'Tous les rôles'
    },
    {
      type: 'subheading',
      label: 'Rôles'
    },
    {
      type: 'link',
      id: 'fondateur',
      icon: 'mat:label',
      label: 'Fondateurs',
      classes: {
        icon: 'text-red'
      }
    },
    {
      type: 'link',
      id: 'admin',
      icon: 'mat:label',
      label: 'Administrateurs',
      classes: {
        icon: 'text-purple'
      }
    },
    {
      type: 'link',
      id: 'coach',
      icon: 'mat:label',
      label: 'Coachs',
      classes: {
        icon: 'text-amber'
      }
    },
    {
      type: 'link',
      id: 'membre',
      icon: 'mat:label',
      label: 'Membres',
      classes: {
        icon: 'text-green'
      }
    },
    {
      type: 'link',
      id: 'invite',
      icon: 'mat:label',
      label: 'Invités',
      classes: {
        icon: 'text-gray'
      }
    },
  ];

  @Output() filterChange = new EventEmitter<User[]>();
  @Output() openAddNew = new EventEmitter<void>();

  activeCategory: UsersMenu['id'] = 'all';

  constructor(private US: UsersService) { }

  ngOnInit() {
  }

  setFilter(category: UsersMenu['id']) {
    this.activeCategory = category;

    if (category === 'all') {
      return this.filterChange.emit(this.US.contactsData);
    }

    if (category === 'admin'
      || category === 'fondateur'
      || category === 'coach'
      || category === 'membre'
      || category === 'invite') {
      return this.filterChange.emit(this.US.contactsData.filter(u => u.role === Role[category]));
    }
  }

  isActive(category: UsersMenu['id']) {
    return this.activeCategory === category;
  }
}
