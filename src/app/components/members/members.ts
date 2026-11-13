import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Member } from '../../models/member';
import { MemberService } from '../../services/member';

@Component({
    selector: 'app-members',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './members.html',
    styleUrl: './members.css'
})
export class Members {

    members: Member[] = [];

    member: Member = {
        id: 0,
        name: '',
        email: '',
        mobile: '',
        address: ''
    };

    isEdit = false;

    constructor(private memberService: MemberService) {
        this.loadMembers();
    }

    loadMembers(): void {
        this.members = this.memberService.getMembers();
    }

    saveMembers(): void {

      if (
          !this.member.name ||
          !this.member.email ||
          !this.member.mobile ||
          !this.member.address
      ) {
          alert('Please fill all the fields');
          return;
      }
  
      if (this.isEdit) {
          this.memberService.updateMember(this.member);
      }
      else {
          this.member.id = Date.now();
          this.memberService.addMembers(this.member);
      }
  
      this.resetForm();
      this.loadMembers();
  }
  
  resetForm(): void {
      this.member = {
          id: 0,
          name: '',
          email: '',
          mobile: '',
          address: ''
      };
  
      this.isEdit = false;
  }
  
  editMember(member: Member): void {
      this.member = { ...member };
      this.isEdit = true;
  }
  
  deleteMember(id: number): void {
      this.memberService.deleteMember(id);
      this.loadMembers();
  }
}