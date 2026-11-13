import { Component } from '@angular/core';
import { Book } from '../../models/book';
import { BookService } from '../../services/book';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule,FormsModule ],
  selector: 'app-books',
  styleUrl: './books.css',
  templateUrl: './books.html',
})
export class Books {

  books:Book[]=[];

  book :Book = {
    id: 0,
    title: '',
    author:'',
    publicationYear: 1,
    totalCopies: 0,
    type:''
  };

  isEdit=false;

  constructor(private bookService:BookService){
    this.loadBooks();

  }

  loadBooks(){
    this.books = this.bookService.getBooks();
  }

  saveBooks(){
    if(!this.book.title || !this.book.author || !this.book.type){
      alert('please fill all the fields');
      return;
    }
    if (this.isEdit){
      this.bookService.updateBooks(this.book);
    }
    else{
      this.book.id = Date.now();
      this.bookService.addBooks(this.book);

      // console.log(this.bookService);  - need to verify
    }
    this.resetForm();
    this.loadBooks();
  }
  resetForm(): void {
    this.book = {
        id: 0,
        title: '',
        author: '',
        publicationYear: 0,
        totalCopies: 1,
        type: ''
    };

    this.isEdit = false;
}

  editBook(book:Book){
    this.book = {...book};
    this.isEdit = true;
  }

  deleteBook(id:number):void{
    this.bookService.deleteBooks(id);
    this.loadBooks();
  }
}
