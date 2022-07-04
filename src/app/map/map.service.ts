import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Image } from "aws-sdk/clients/iotanalytics";
import { BehaviorSubject, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MapService {

    map = new BehaviorSubject<any>(null);
    colorScale = new Subject();
    histogram = new Subject();


    constructor(private http: HttpClient) { }

    updateMap(map: any) {
        this.map.next(map);
    }
    getRuster(): Observable<any>{
        var url = '/tiff64';
        var data = {username: 'example'};
        
        // fetch(url, {
        //   method: 'GET', // or 'PUT'
        // //   body: "", // data can be `string` or {object}!
        //   headers:{
        //     'Content-Type': 'application/json'
        //   }
        // }).then(res => res.json())
        // .catch(error => console.error('Error:', error))
        // .then(response => {
        //     console.log('Success:', response);
        //     this.converBase64toBlob(response.fileTiff,'image/tiff')
        // });
        return this.http
            .get<any>(
            `${environment.apiUrl}${url}`)
            .pipe(
                tap((res: any) => {
                    if (res) {
                        console.log(res.fileTiff);
                        return res;
                    }
                })
            );
    }

}