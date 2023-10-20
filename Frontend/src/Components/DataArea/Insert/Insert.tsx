import { useNavigate } from "react-router-dom";
import "./Insert.css";
import BookModel from "../../../Models/BookModel";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import AuthorModel from "../../../Models/AuthorModel";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";

function Insert(): JSX.Element {

    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<BookModel>();

    const [authors, setAuthors] = useState<AuthorModel[]>([]);

    useEffect(() => {
        dataService.getAllAuthors()
            .then(backendAuthors => setAuthors(backendAuthors))
            .catch(err => notifyService.error(err));
    }, []);

    async function send(book: BookModel) {
        try {
            await dataService.addBook(book);
            notifyService.success("Book has been added successfully");
            navigate("/home")
        }
        catch (err: any) {
            notifyService.error(err);
        }

    }



    return (
        <div className="Insert">
            <h2>Add Book:</h2>

            <form onSubmit={handleSubmit(send)}>

                <label>Book Name:</label>
                <input type="text" required {...register("bookName")}></input>

                <label>Author:</label>
                <select required defaultValue="" {...register("authorId")}>

                    <option disabled value="">Pick</option>
                    {authors.map(author => <option key={author.authorId} value={author.authorId}>{author.authorFirstName + " " + author.authorLastName}</option>)}
                </select>

                <label>Page Number:</label>
                <input type="number" required {...register("bookPages")}></input>


                <label>Page Price:</label>
                <input type="number" required {...register("bookPrice")}></input>

                <br /><br />
                <button>Add</button>

            </form>

        </div>
    );
}

export default Insert;
