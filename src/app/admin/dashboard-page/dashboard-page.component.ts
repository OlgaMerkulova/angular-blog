import { PostService } from './../../shared/posts.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Post } from 'src/app/shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  
  pSub: Subscription;
  posts: Post[] = [];

  constructor(
    private postsService: PostService
  ) { }

  ngOnInit() {
    this.pSub = this.postsService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
  }

  removePost() {

  }

}
