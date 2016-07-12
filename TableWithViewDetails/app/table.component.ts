import {Component, EventEmitter, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgIf, NgFor} from 'angular2/common';
import { PAGINATION_DIRECTIVES } from 'ng2-bootstrap/components/pagination';
import {ROUTER,RouterOutlet,RouterLink} from 'angular2/router';

import { LoadData } from 'app/services/loadData.service';

@Component({
    selector: 'show-table',
    templateUrl: 'partials/tableview.html',
    directives: [PAGINATION_DIRECTIVES, NgClass, NgIf, NgFor, CORE_DIRECTIVES, FORM_DIRECTIVES,RouterLink],
    providers: [LoadData]
})
export class TableComponent implements OnInit {
    public rows: Array<any> = [];
    public columns: Array<any> = [
        { title: 'Name', name: 'name' },
        { title: 'Position', name: 'position', sort: false },
        { title: 'Office', name: 'office', sort: 'asc' },
        { title: 'Extn.', name: 'ext', sort: 'desc' },
        { title: 'Start date', name: 'startDate' },
        { title: 'Salary', name: 'salary' }
    ];
    public page: number = 1;
    public itemsPerPage: number = 6;
    public maxSize: number = 5;
    public numPages: number = 1;
    public length: number = 0;
    public tableData: Array<any> = [];
    public config: any = {
        paging: true,
        sorting: { columns: [] },
        filtering: { filterString: '', columnName: 'position' }
    };

    public data: Array<any> = [];
    public sortType: boolean = true;


    onChangeTable(config: any, pageNum: any = config.paging) {
        if (pageNum == null) {
            pageNum = 1;
        }
        else {
            pageNum = pageNum.page;
        }
        var begin = ((pageNum - 1) * this.itemsPerPage),
            end = begin + this.itemsPerPage;
        var pageData = this.data.slice(begin, end);
        this.tableData = pageData;
    }

    constructor(private _loadData: LoadData) {
    }

    ngOnInit() {
        this._loadData.getJsonData().subscribe(function(res) {
            data = res;
        });
        setTimeout(() => {
            this.data=data;
            this.length = this.data.length;
            this.onChangeTable(this.config, null);
        }, 0);
    }

    changeSort(sortCol: any) {
        this.sortField = sortCol;
        this.sortType = !this.sortType;
        if (this.sortType) {
            if (this.sortField == 'salary') {
                this.tableData.sort(function(a, b) {
                    return ((parseInt(b[sortCol].replace(/\$*\,/gi, "")) < parseInt(a[sortCol].replace(/\$*\,/gi, ""))) ? -1 : ((parseInt(b[sortCol].replace(/\$*\,/gi, "")) > parseInt(a[sortCol].replace(/\$*\,/gi, ""))) ? 1 : 0));
                });
            } else {
                this.tableData.sort(function(a, b) {
                    return ((b[sortCol] < a[sortCol]) ? -1 : ((b[sortCol] > a[sortCol]) ? 1 : 0));
                });
            }
        }
        else {
            if (this.sortField == 'salary') {
                this.tableData.sort(function(a, b) {
                    return ((parseInt(a[sortCol].replace(/\$*\,/gi, "")) < parseInt(b[sortCol].replace(/\$*\,/gi, ""))) ? -1 : ((parseInt(a[sortCol].replace(/\$*\,/gi, "")) > parseInt(b[sortCol].replace(/\$*\,/gi, ""))) ? 1 : 0));
                });
            } else {
                this.tableData.sort(function(a, b) {
                    return ((a[sortCol] < b[sortCol]) ? -1 : ((a[sortCol] > b[sortCol]) ? 1 : 0));
                });
            }
        }

    }
}
