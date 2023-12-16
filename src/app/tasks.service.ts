import { Injectable } from '@angular/core';
import {Task} from "./task"
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  readonly port: string = "39424";
  readonly baseUrl:string = `http://localhost:${(this.port)}`

  private _http: HttpClient
  constructor(http: HttpClient) {
    this._http = http;
  }

  public index(archived = false) : Observable<Task[]> {
    const url = this.baseUrl + '/todos';
    return this._http.get<Task[]>(url, {
      params: {
        archived: archived,
        _sort: 'id',
        _order: 'desc',
      }
    })
  }
  public post(task: Task) : Observable<Task> {
    const url = this.baseUrl + '/todos';
    return this._http.post(url, task);
  }
  public put(task: Task) : Observable<Task> {
    const url = this.baseUrl + '/todos/' + task.id;
    return this._http.put(url, task);
  }
  public delete(task: Task) : Observable<any> {
    const url = this.baseUrl + '/todos/' + task.id;
    return this._http.delete(url);
  }
}
