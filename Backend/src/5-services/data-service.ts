import dal from "../2-utils/dal";
import { OkPacket } from "mysql";
import BookModel from "../3-models/book-model";
import AuthorModel from "../3-models/author-model";
import { ResourceNotFoundError } from "../3-models/client-errors";

async function getAllAuthors(): Promise<AuthorModel[]> {
    const sql = "SELECT * FROM authors";
    const authors = await dal.execute(sql);
    return authors;
}

async function getBooksBySearchName(searchedName: string): Promise<BookModel[]> {
    const sql = "SELECT * FROM books Join authors on books.authorId =authors.authorId  WHERE bookName LIKE '%' ? '%'";
    const searchedBooks = await dal.execute(sql, [searchedName]);
    return searchedBooks;
}

async function addBook(book: BookModel): Promise<BookModel> {
    book.validate();
    const sql = "INSERT INTO books VALUES(DEFAULT, ?, ?, ?,?)";
    const info = await dal.execute(sql,[book.authorId,book.bookName,book.bookPages,book.bookPrice]);
    book.bookId = info.insertId;
    return book;
}

async function deleteBook(bookId: number): Promise<void> {
    const sql = "DELETE FROM books WHERE bookId = ?";
    const info: OkPacket = await dal.execute(sql,[bookId]);
    if(info.affectedRows ===0) throw new ResourceNotFoundError(bookId);
    
}

export default {
    getAllAuthors,
    getBooksBySearchName,
    addBook,
    deleteBook
};

