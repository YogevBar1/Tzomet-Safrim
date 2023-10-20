import { ChangeEvent, useState } from "react";
import "./List.css";
import BookModel from "../../../Models/BookModel";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";

function List(): JSX.Element {

    const [searchedWord, setSearchedWord] = useState<string>("");
    const [searchedBook, setSearchedBook] = useState<BookModel[]>([])

    async function sendSearchedBook() {
        if(searchedWord=== ""){
            notifyService.error("You must insert char");
            return;
        }
        const searchedBook = await dataService.getSearchedBooks(searchedWord);
      
        setSearchedBook(searchedBook);
    }

    function saveInputString(args: ChangeEvent<HTMLInputElement>) {
        
        setSearchedWord(args.target.value);
    }

    async function deleteBook(bookId: number){
        try{
            const confrim = window.confirm("are you sure?");
            if(!confrim) return;
            await dataService.deleteBook(bookId);
            notifyService.success("Book has been deleted");
            setSearchedBook(searchedBook.filter(sb =>sb.bookId !==bookId));
        }
        catch(err:any){
            notifyService.error(err);
        }
    }

    return (
        <div className="List">
            <h2>Searched Books</h2>
            <label className="m-1">Book Name:</label>
            <input type="text" onChange={(saveInputString)} />
            <button className="btn btn-primary btn-sm" onClick={sendSearchedBook} >Search</button>

            <table className="table table-hover table-striped">
                <thead>
                    <tr>
                        <th>name:</th>
                        <th>author:</th>
                        <th>pages:</th>
                        <th>price:</th>
                        <th>action:</th>
                    </tr>
                </thead>
                <tbody>
                    {searchedBook.map(sb =>
                        <tr key={sb.bookId}>
                            <td>{sb.bookName}</td>
                            <td>{sb.authorFirstName} {sb.authorLastName}</td>
                            <td>{sb.bookPages}</td>
                            <td>{sb.bookPrice}</td>
                            <td><button className="btn btn-danger" onClick={()=> deleteBook(sb.bookId)}>Delete Book❌</button></td>
                        </tr>)}
                </tbody>
            </table>

        </div>


    );
}

export default List;
