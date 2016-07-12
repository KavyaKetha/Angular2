import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';

import { LoadData } from 'app/services/loadData.service';

@Component({
    selector:'view-details',
    templateUrl:'partials/viewDetail.html',
    providers:[LoadData]
})

export class ViewDetailComponent{
    private details : Array<any>=[];
    private result1 : Array<any>=[];

    constructor(private _loadData:LoadData,private params: RouteParams){
        let result2 = [];
        this._loadData.getJsonData().subscribe(function(res){
             result2 = res;
        });
        setTimeout(() => {
            this.result1.push(result2[params.get('id')]);
        }, 0);
       
    }
}