import {bootstrap} from 'angular2/platform/browser';

//import {TableDemo} from 'app/table.demo';
import {Component, EventEmitter, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgIf, NgFor} from 'angular2/common';
import { PAGINATION_DIRECTIVES } from 'ng2-bootstrap/components/pagination';
//import {Table} from 'ng2-table/components/table';


@Component({
  selector: 'my-app',
  templateUrl: 'partials/tableview.html',
  directives: [ PAGINATION_DIRECTIVES, NgClass, NgIf, NgFor, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class AppComponent implements OnInit{
  public rows:Array<any> = [];
  public columns:Array<any> = [
    {title: 'Name', name: 'name'},
    {title: 'Position', name: 'position', sort: false},
    {title: 'Office', name: 'office', sort: 'asc'},
    {title: 'Extn.', name: 'ext', sort: 'desc'},
    {title: 'Start date', name: 'startDate'},
    {title: 'Salary', name: 'salary'}
  ];
  public page:number = 1;
  public itemsPerPage:number = 2;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;

  public config:any = {
    paging: true,
    sorting: {columns: []},
    filtering: {filterString: '', columnName: 'position'}
  };

  public data:Array<any> = [{
    'name': 'Victoria Cantrell',
    'position': 'Integer Corporation',
    'office': 'Croatia',
    'ext': '0839',
    'startDate': '2015/08/19',
    'salary': '$208,178'
  }, {
    'name': 'Pearl Crosby',
    'position': 'In PC',
    'office': 'Cambodia',
    'ext': '8262',
    'startDate': '2014/10/08',
    'salary': '$114,367'
  }, {
    'name': 'Colette Foley',
    'position': 'Lorem Inc.',
    'office': 'Korea, North',
    'ext': '8968',
    'startDate': '2015/07/19',
    'salary': '$721,473'
  }, {
    'name': 'Anastasia Shaffer',
    'position': 'Dolor Nulla Semper LLC',
    'office': 'Suriname',
    'ext': '7980',
    'startDate': '2015/04/20',
    'salary': '$264,620'
  }, {
    'name': 'Gabriel Castro',
    'position': 'Sed Limited',
    'office': 'Bahrain',
    'ext': '0757',
    'startDate': '2015/03/04',
    'salary': '$651,350'
  }];

  constructor() {
    this.length = this.data.length;
  }

  ngOnInit() {
    this.onChangeTable(this.config, null);
  }

  changePage(page:any, data:Array<any> = this.data):Array<any> {
    console.log(page);
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  changeSort(data:any, config:any) {
    if (!config.sorting) {
      return data;
    }

    // simple sorting
    return data.sort((previous:any, current:any) => {
      let columns = this.config.sorting.columns || [];
      for (let i = 0; i < columns.length; i++) {
        let columnName = columns[i].name;

        if (previous[columnName] > current[columnName]) {
          return columns[i].sort === 'desc' ? -1 : 1;
        }
        if (previous[columnName] < current[columnName]) {
          return columns[i].sort === 'asc' ? -1 : 1;
        }
      }
      return 0;
    });
  }

  changeFilter(data:any, config:any):any {
    if (!config.filtering) {
      return data;
    }

    let filteredData:Array<any> = data.filter((item:any) =>
      item[config.filtering.columnName].match(this.config.filtering.filterString));

    return filteredData;
  }

  onChangeTable(config:any, page:any = config.paging) {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }
    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }
}

//@Component({
//    selector: 'my-app',
//    directive: [TableDemo],
//    templateUrl: 'partials/wwref.html'
//})
//export class AppComponent {
//}
bootstrap(AppComponent,[]);