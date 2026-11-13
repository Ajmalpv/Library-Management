
import { Injectable, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Book } from '../models/book';
import { PLATFORM_ID } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class BookService {
    books: Book[] = [];

    constructor(@Inject(PLATFORM_ID)
    private platformId: object) {
        if (isPlatformBrowser(this.platformId)) {
            this.books = JSON.parse(
                localStorage.getItem('books') || '[]'
            );
        }
    }

    getBooks(): Book[] {
        return this.books;
    }

    addBooks(book: Book): void {
        this.books.push(book);
        this.saveBooks();
    }

    updateBooks(book: Book): void {
        const index = this.books.findIndex(b => b.id === book.id);

        if (index !== -1) {
            this.books[index] = book;
            this.saveBooks();
            console.log(this.books);
        }
    }

    private saveBooks(): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(
                'books',
                JSON.stringify(this.books)
            );
        }
    }

    deleteBooks(id: number): void {
        this.books = this.books.filter(item => item.id !== id);
        this.saveBooks();

    }

}
