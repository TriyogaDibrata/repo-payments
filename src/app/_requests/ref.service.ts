import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RefService {

  constructor(
    private http : HttpClient
  ) { }

  getAllPackages() {
    return this.http.get(`${environment.url}` + 'packages-ref')
    .pipe(map((res) => {
      return res['data'];
    }));
  }
}
