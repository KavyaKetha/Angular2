import { Component } from 'angular2/core';
import { ListService } from 'app/list.service';

@Component({
    selector: 'my-list',
    providers : [ListService],
    styles: [`
         div { 
     background-color:#EFEFEF;
     margin-bottom:15px;
     padding:15px;
     border:1px solid #DDD;
     box-shadow:2px 2px 2px 0 rgba(0, 0, 0, 0.3);
    border-radius:3px;
  }
  h2 { 
    text-align: center;
  }
    `]
    templateUrl:'partials/list.html'
})
export class ListComponent {

    constructor(_listService: ListService) {
        this.listObj = _listService.getList();
    }
}