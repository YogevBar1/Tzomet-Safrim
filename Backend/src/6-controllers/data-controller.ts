import express, { Request, Response, NextFunction } from "express";
import dataService from "../5-services/data-service";
import BookModel from "../3-models/book-model";
import StatusCode from "../3-models/status-code";

const router = express.Router();

router.get("/authors", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const authors = await dataService.getAllAuthors();
        response.json(authors);
    }
    catch(err: any) {
        next(err);
    }
});

router.get("/books/:searchName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const searchName = request.params.searchName;
        const searchedBook = await dataService.getBooksBySearchName(searchName);
        response.json(searchedBook);
    }
    catch(err: any) {
        next(err);
    }
});


router.post("/books", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const bookToAdd = new BookModel (request.body);
        const addedBook = await dataService.addBook(bookToAdd);
        response.status(StatusCode.Created).json(addedBook);

    }
    catch(err: any) {
        next(err);
    }
});


router.delete("/books/:bookId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const bookId = + request.params.bookId;
        await dataService.deleteBook(bookId);
        response.sendStatus(StatusCode.NoContent);
    }
    catch(err: any) {
        next(err);
    }
});



export default router;
