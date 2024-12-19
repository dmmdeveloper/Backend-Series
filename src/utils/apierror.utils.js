export class  APIError extends Error {
    constructor ( message = "Something Went Wrong !!" , statuscode  = 403) {
super(message);
this.name  = this.constructor.name ;
this.statuscode = statuscode
    }
}