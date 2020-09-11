import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICandiate } from 'src/Model/ICandiate';


@Injectable({
  providedIn: 'root'
})
export class DataFetchingServiceService {
  url = './assets/candiateData.json';
  constructor(public http: HttpClient) { }

  getEmpolyees(): Observable<ICandiate[]> {

  return  this.http.get<ICandiate[]>(this.url);

  }
}
