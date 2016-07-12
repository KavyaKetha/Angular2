import {Component} from 'angular2/core';

import { LoadData } from 'app/services/loadData.service';

@Component({
    selector:'view-details',
    templateUrl:'partials/viewDetail.html',
    providers:[LoadData]
})

export class ViewDetailComponent{
    private details : Array<any>=[];
    constructor(private _loadData:LoadData){
        this._loadData.getJsonData.subscribe(function(res){
            result = res;
        });
        console.log(result,'resultdata');
        this.details='';
    }
}