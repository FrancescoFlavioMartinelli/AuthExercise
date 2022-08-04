import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts:Post[] = []

  sub!:Subscription

  subPost!:Subscription

  logged = false

  constructor(private postSrv:PostService, private auth:AuthService) { }

  ngOnInit(): void {
    this.subPost = this.postSrv.postObs.subscribe((res)=>{
      this.posts = res
    })

    this.sub = this.auth.authObs.subscribe((res)=>{
      this.logged = res ? true : false
    })

    this.postSrv.getPosts()
  }

  ngOnDestroy(): void {
    this.subPost.unsubscribe()
    this.sub.unsubscribe()
  }

}
