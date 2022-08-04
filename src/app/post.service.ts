import {
  HttpClient
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import {
  BehaviorSubject,
  Subject
} from 'rxjs';
import {
  Post
} from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {


  lastLikeSub = new Subject < Post > ()
  lastLikeObs = this.lastLikeSub.asObservable()

  url = "http://localhost:3000/posts"

  posts: Post[] = []

  postSub = new BehaviorSubject < Post[] > (this.posts)
  postObs = this.postSub.asObservable()

  constructor(private http: HttpClient) {
    this.getPosts()
  }

  getPosts() {
    this.http.get < Post[] > (this.url).subscribe((res) => {
      this.posts = res
      this.postSub.next(res)
    })
  }

  like(id: number, likes: number) {
    this.http.patch < Post > (this.url + "/" + id, {
      likes: likes
    }).subscribe((res) => {
      this.posts = this.posts.map((e) => {
        if (e.id == id) {
          e.likes = likes
        }
        return e
      })
      this.postSub.next(this.posts)

      if (this.posts.find(e => e.id == id))
        this.lastLikeSub.next(this.posts.find(e => e.id == id) !)

    })
  }

  delete(id: number) {
    this.http.delete(this.url + "/" + id).subscribe((res) => {
      this.posts = this.posts.filter(p => p.id === id)
      this.postSub.next(this.posts)
    })
  }

}
