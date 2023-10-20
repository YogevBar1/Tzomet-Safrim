import Joi from "joi";
import { ValidationError } from "./client-errors";

class BookModel{

    public bookId: number;
    public authorId: number;
    public bookName: string;
    public bookPages: number;
    public bookPrice: number;

    public constructor(book: BookModel){
        this.bookId = book.bookId;
        this.authorId = book.authorId;
        this.bookName = book.bookName;
        this.bookPages = book.bookPages;
        this.bookPrice = book.bookPrice;
    }
    
    //validation schema with Joi
    private static validationSchema = Joi.object({
        bookId: Joi.number().optional().integer().positive(),
        authorId: Joi.number().required().integer().positive(),
        bookName: Joi.string().required().max(100),
        bookPages: Joi.number().required().max(255),
        bookPrice: Joi.number().required().integer().positive()
    });

    public validate(): void {
        const result = BookModel.validationSchema.validate(this);
        if (result.error?.message) throw new ValidationError(result.error.message);
    }

}

export default BookModel;