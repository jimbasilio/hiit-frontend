import {Injectable} from 'angular2/core';

@Injectable()
export class ProgramService {
    public fetchProgram(id?: number) {
        return Promise.resolve([
                {programtext: "first"},
                {programtext: "second"}
               ]);
    }
}