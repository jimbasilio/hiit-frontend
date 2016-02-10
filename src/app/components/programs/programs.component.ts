import {Component, OnInit} from 'angular2/core';
import {RouteConfig} from 'angular2/router';
import {ProgramService} from '../../services/program.service';
import {Program} from '../../models/program.model'

@Component({
    templateUrl: 'templates/programs.html',
    providers: [
        ProgramService
    ]
})

export class ProgramsComponent implements OnInit {
    public programs: Program[];
    
    constructor(private programService: ProgramService) { 
    }
    
    ngOnInit() {
        this.programService.fetchProgram().then(programs => this.programs = programs);
    }
}
