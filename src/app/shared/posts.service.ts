import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post, FbCreateResponse } from './interfaces';
import { map, delay } from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class PostService {
    constructor(
        private http: HttpClient
    ) {}

    create(post: Post): Observable<Post> {
        return this.http.post(`${environment.fbDbUrl}/posts.json`, post)
        .pipe(
            map((response: FbCreateResponse) => {
                return {
                    ...post,
                    id: response.name,
                    date: new Date(post.date)
                };
            })
        );
    }

    getPosts(): Observable<Post[]> {
        return this.http.get(`${environment.fbDbUrl}/posts.json`)
        .pipe(
            delay(1000),
            map((response: {[key: string]: any}) => {
                return Object
                .keys(response)
                .map(key => ({
                    ...response[key],
                    id: key,
                    date: new Date(response[key].date)
                }));
            })
        );
    }
}
