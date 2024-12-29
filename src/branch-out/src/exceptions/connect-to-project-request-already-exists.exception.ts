import { HttpException, HttpStatus } from '@nestjs/common';

export class ConnectToProjectRequestAlreadyExistsException extends HttpException {
    constructor() {
        super(`A connect to project request with the same parameters already exists`, HttpStatus.BAD_REQUEST);
    }
}
