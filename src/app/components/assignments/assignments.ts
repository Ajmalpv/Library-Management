import { Component } from '@angular/core';
import { Book } from '../../models/book';
import { Member } from '../../models/member';
import { Assignment } from '../../models/assignment';
import { BookService } from '../../services/book';
import { AssignmentService } from '../../services/assignment';
import { MemberService } from '../../services/member';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  imports: [FormsModule , CommonModule ],
  standalone: true,
  selector: 'app-assignments',
  styleUrl: './assignments.css',
  templateUrl: './assignments.html',
})
export class Assignments {

  books:Book[]=[];
  members:Member[]=[];
  assignments:Assignment[]=[];

  bookId = 0;
  memberId = 0;
  bookSearch = '';
  memberSearch = '';

  showBookDropdown = false;
  showMemberDropdown = false;

  constructor(
    private bookServices:BookService,
    private memberService:MemberService,
    private assignmentService:AssignmentService
  ){
    this.loadData();
  }

  loadData() {
  this.books = this.bookServices.getBooks();
  this.members = this.memberService.getMembers();
  this.assignments = this.assignmentService.getAssignments();
}

assignBooks() {

  if (!this.bookId || !this.memberId) {
    alert("Please select book and member");
    return;
  }

  const result = this.assignmentService.assignBook(
    this.bookId,
    this.memberId
  );

  if (result) {
    alert("Book assigned successfully");
  } else {
    alert("Book is not available");
  }

  this.bookId = 0;
  this.memberId = 0;

  this.loadData();
}

getAvailableCopies(id: number) {
  return this.assignmentService.getAvailableCopies(id);
}

getBookTitle(id: number) {
  return this.books.find(b => b.id === id)?.title;
}

getMemberName(id: number) {
  return this.members.find(m => m.id === id)?.name;
}

returnBook(id: number) {
  this.assignmentService.returnBook(id);
  this.loadData();
}

get filteredBooks(): Book[] {
    return this.books.filter(book =>
      (book.title + ' ' + book.author).toLowerCase().includes(this.bookSearch.toLowerCase()) && this.getAvailableCopies(book.id) > 0
    );
  }

  get filteredMembers(): Member[] {
    return this.members.filter(member =>
      (member.name + ' ' + member.email + ' ' + member.mobile).toLowerCase().includes(this.memberSearch.toLowerCase())
    );
  }

  selectBook(book: Book) {
    this.bookId = book.id;
    this.bookSearch = book.title;
    this.showBookDropdown = false;
  }

  selectMember(member: Member) {
    this.memberId = member.id;
    this.memberSearch = member.name;
    this.showMemberDropdown = false;
  }

  onBookSearchChange() {
  this.bookId = 0;
  this.showBookDropdown = true;
}

onMemberSearchChange() {
  this.memberId = 0;
  this.showMemberDropdown = true;
}
}
