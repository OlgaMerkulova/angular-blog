import { PostService } from './../../shared/posts.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Post } from 'src/app/shared/interfaces';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  
  pSub: Subscription;
  dSub: Subscription;
  posts: Post[] = [];
  searchTitle = '';

  constructor(
    private postsService: PostService
  ) { }

  ngOnInit() {
    this.pSub = this.postsService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  removePost(id: string) {
    this.dSub = this.postsService.remove(id).subscribe( () => {
      this.posts = this.posts.filter(post => post.id !== id);
    });
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }

    if (this.dSub) {
      this.dSub.unsubscribe();
    }
  }
}
