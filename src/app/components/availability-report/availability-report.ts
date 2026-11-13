
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Book } from '../../models/book';
import { Member } from '../../models/member';
import { Assignment } from '../../models/assignment';

import { BookService } from '../../services/book';
import { MemberService } from '../../services/member';
import { AssignmentService } from '../../services/assignment';

@Component({
  selector: 'app-availability-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './availability-report.html',
  styleUrl: './availability-report.css'
})
export class AvailabilityReport {

  books: Book[] = [];
  members: Member[] = [];
  assignments: Assignment[] = [];

  selectedBookId = 0;
  showMembers = false;
  memberSearch = '';

  constructor(
    private bookService: BookService,
    private memberService: MemberService,
    private assignmentService: AssignmentService
  ) {
    this.loadReport();
  }

  loadReport() {
    this.books = this.bookService.getBooks();
    this.members = this.memberService.getMembers();
    this.assignments = this.assignmentService.getAssignments();
  }

  getAssignedCopies(bookId: number): number {
    return this.assignments.filter(
      a => a.bookId === bookId
    ).length;
  }

  getAvailableCopies(bookId: number): number {
    const book = this.books.find(
      b => b.id === bookId
    );

    if (!book) {
      return 0;
    }

    return book.totalCopies - this.getAssignedCopies(bookId);
  }

  getAssignedMembers(bookId: number): Assignment[] {
    return this.assignments.filter(
      a => a.bookId === bookId
    );
  }

  getMember(memberId: number): Member | undefined {
    return this.members.find(
      m => m.id === memberId
    );
  }

  viewMembers(bookId: number) {
    this.selectedBookId = bookId;
    this.memberSearch = '';
    this.showMembers = true;
  }

  closeMembers() {
    this.showMembers = false;
    this.selectedBookId = 0;
    this.memberSearch = '';
  }

  get filteredAssignedMembers(): Assignment[] {
    return this.getAssignedMembers(this.selectedBookId).filter(
      assignment => {
        const member = this.getMember(assignment.memberId);

        if (!member) {
          return false;
        }

        const search = this.memberSearch.toLowerCase();

        return (
          member.name.toLowerCase().includes(search) ||
          member.email.toLowerCase().includes(search) ||
          member.mobile.toLowerCase().includes(search)
        );
      }
    );
  }

  get selectedBook(): Book | undefined {
    return this.books.find(
      book => book.id === this.selectedBookId
    );
  }

}
