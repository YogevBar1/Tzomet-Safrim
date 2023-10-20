import axios from "axios";
import appConfig from "../Utils/AppConfig";
import AuthorModel from "../Models/AuthorModel";
import BookModel from "../Models/BookModel";

class DataService {
    public async getSearchedBooks(searchedWord: String) {
        const response = await axios.get(appConfig.booksUrl + searchedWord);
        const searchedBooks = response.data;
        return searchedBooks;
        
    }

    public async getAllAuthors(): Promise<AuthorModel[]> {
        const response = await axios.get(appConfig.authorUrl);
        const authors = response.data;
        return authors;
        
    }

    public async deleteBook(bookId: number){
        await axios.delete(appConfig.booksUrl + bookId);
    }

    public async addBook(book: BookModel): Promise<void>{
        await axios.post(appConfig.booksUrl, book);
    }

}

const dataService = new DataService();

export default dataService;
