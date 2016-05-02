import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
@Injectable()
export class LoadData {
    constructor(private http: Http) { }
    private jsonUrl = 'app/data/jsonData.json';
//    private extractData(res: Response) {
//        if (res.status < 200 || res.status >= 300) {
//            throw new Error('Bad response status: ' + res.status);
//        }
//        let body = res.json();
//        console.log(body, 'hereeindifn');
//        return body;
//    }
    private result: Array<any> = [];
    getJsonData() {
        //     return this.http.get(this.jsonUrl).map(this.extractData).catch(this.handleError);
        return this.http.get(this.jsonUrl).map(function(res: Response) {
            this.result = res.json();
            return this.result;
        });
    }
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server Error');
    }
}