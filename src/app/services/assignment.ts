import { Injectable,Inject } from '@angular/core'
import { Assignment } from '../models/assignment'
import { BookService } from './book';
import { MemberService } from './member';
import { PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common';


@Injectable({
    providedIn:'root'
})
export class AssignmentService {
    assignments :Assignment[] = [];

    constructor(private bookService:BookService ,
        private memberService:MemberService, @Inject(PLATFORM_ID) private platformId:object) {
            if(isPlatformBrowser(this.platformId)){
                try {
                    this.assignments = JSON.parse(
                        localStorage.getItem('assignments') || '[]'
                    );
                } catch (error) {
                    console.error('Error loading assignments:', error);
                    this.assignments = [];
                }
            }
    }

    getAssignments():Assignment[]{
        return this.assignments;
    }

    // froom thhis
    assignBook(bookId: number,memberId: number): boolean {
        const book =this.bookService.getBooks().find(b=> b.id === bookId);
        const member =this.memberService.getMembers().find(m=>m.id === memberId);
        if(!book || !member){
            return false;
        }
        if (this.getAvailableCopies(bookId)<=0){
            return false;
        }

        const assignment: Assignment ={
            id:Date.now(),
            bookId:bookId,
            memberId:memberId,
            assignmentDate: new Date().toISOString()};
            this.assignments.push(assignment);
            this.saveAssignments();
            return true;
        }

        getAvailableCopies(bookId: number): number {
            const book = this.bookService.getBooks().find(b=>b.id === bookId);
            if(!book){
                return 0;
            }

            const assigned = this.assignments.filter(a=>a.bookId === bookId).length;

            return book.totalCopies - assigned;
        }

        returnBook(id: number):void{
            this.assignments = this.assignments.filter(a=> a.id !== id);
            this.saveAssignments();
        }

        private saveAssignments():void{
            if(isPlatformBrowser(this.platformId)){
                localStorage.setItem('assignments',JSON.stringify(this.assignments));
            }
        }
}
