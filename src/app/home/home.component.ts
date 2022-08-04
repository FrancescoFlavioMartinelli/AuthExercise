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

  lastLike:false|Post = false


  lastLikeTimeout:any

  constructor(private postSrv:PostService, private auth:AuthService) { }

  ngOnInit(): void {
    this.subPost = this.postSrv.postObs.subscribe((res)=>{
      console.log("NEXT POST ARRAY", res);
      
      this.posts = res
    })

    this.sub = this.auth.authObs.subscribe((res)=>{
      console.log("INIT HOME")
      this.logged = res ? true : false
    })


    this.postSrv.lastLikeObs.subscribe((res)=>{
      this.lastLike = res
      clearTimeout(this.lastLikeTimeout)
      this.lastLikeTimeout = setTimeout(()=>{this.lastLike = false}, 5000)
    })

    // if(this.postSrv.posts.length == 0) {
    //   this.postSrv.getPosts()
    // } else {
    //   this.posts = this.postSrv.posts
    // }


  }

  ngOnDestroy(): void {
    this.subPost.unsubscribe()
    this.sub.unsubscribe()
  }

}
