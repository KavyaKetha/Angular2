import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';

@Injectable()

export class GlobalService {
   private stateName:string='';
   public setStateName(name:string){
       this.stateName = name;
   }
   public getStateName(name:string){
       return this.stateName ;
   }
}