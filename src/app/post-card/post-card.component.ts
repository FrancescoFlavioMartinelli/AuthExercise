import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Subscription } from 'rxjs';
import {
  AuthService
} from '../auth.service';
import {
  Post
} from '../post';
import {
  PostService
} from '../post.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {

  @Input() logged = true
  @Input() post!: Post;

  sub!:Subscription;
  subPost!:Subscription;
  
  constructor(private auth: AuthService, private postSrv: PostService) {}

  ngOnInit(): void {
    // this.sub = this.auth.authObs.subscribe((res) => {
    //   console.log("card", res);
    //   this.logged = res ? true : false
    // })
    
    // this.subPost = this.postSrv.postObs.subscribe((res)=>{
    //   this.post = res.find((e)=>e.id==this.post.id)!
    // })
  }

  ngOnDestroy() {
    // this.sub.unsubscribe()
    // this.subPost.unsubscribe()
  }

  like() {
    this.postSrv.like(this.post.id, this.post.likes + 1)
  }

  delete() {
    this.postSrv.delete(this.post.id)
  }

}
