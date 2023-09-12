import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntypedFormBuilder } from '@angular/forms';
import { User } from '../../../models/User.model';
import { Role } from 'src/app/models/role.enum';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'vex-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent implements OnInit {
  form = this.fb.group({
    image: 'assets/img/profil/pred.png',
    pseudo: null,
    id_riot: null,
    role: null,
    password: null,
  });

  R = Role;
  contact: User;

  get isEdit(): boolean {
    return !!this.contactId;
  }

  constructor(@Inject(MAT_DIALOG_DATA) private contactId: User['pseudo'],
    private dialogRef: MatDialogRef<UsersEditComponent>,
    private fb: UntypedFormBuilder,
    private US: UsersService) { }

  ngOnInit() {
    if (this.contactId) {
      this.contact = this.US.contactsData.find(c => c.pseudo === this.contactId);
      this.form.patchValue(this.contact);
    }
  }

  save() {
    const form = this.form.value;

    // EDIT
    if (this.isEdit) {
      this.contact.pseudo = form.pseudo;
      this.contact.id_riot = form.id_riot;
      this.contact.role = form.role;
      this.US.updateUser(this.contact);
    }

    // CREATE
    else {
      this.US.createUser(form as User);
    }

    this.dialogRef.close();
  }
}
