import { Injectable } from 'angular2/core';

@Injectable()

export class ListService { 

    listObj:Array<any>;

    constructor() {
        this.listObj = [
            { place: 'Hyderabad', name: 'Ankit' },
            { place: 'Banglore', name: 'Anuj' },
            { place: 'Mumbai', name: 'Anil' },
            { place: 'Delhi', name: 'Anoop' },
            { place: 'Hyderabad', name: 'Ashish' }
        ];
    }

    getList() {
        return this.listObj;
    }
}