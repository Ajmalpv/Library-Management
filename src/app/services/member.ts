import { Injectable, Inject } from '@angular/core'
import { Member } from '../models/member'
import { PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common';


@Injectable({
    providedIn: 'root'
})
export class MemberService {
    members: Member[] = [];

    constructor(@Inject(PLATFORM_ID)
    private platformId: object) {
        if (isPlatformBrowser(this.platformId)) {
            this.members = JSON.parse(
                localStorage.getItem('members') || '[]'
            );
        }
    }

    getMembers(): Member[] {
        return this.members;
    }

    addMembers(member: Member): void {
        this.members.push(member)
        this.saveMembers();
    }

    updateMember(member: Member): void {
        const index = this.members.findIndex(m => m.id === member.id);

        if (index !== -1) {
            this.members[index] = member;
            this.saveMembers();


        }
    }
    private saveMembers(): void {
        if (isPlatformBrowser(this.platformId)) { localStorage.setItem('members', JSON.stringify(this.members)); }
    }
    deleteMember(id: number) {
        this.members = this.members.filter(item => item.id !== id);
        this.saveMembers();
    }

}
