import {
  HttpClient
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import {
  Subject
} from 'rxjs';
import {
  Post
} from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postSub = new Subject < Post[] > ()
  postObs = this.postSub.asObservable()

  url = "http://localhost:3000/posts"

  posts: Post[] = []

  constructor(private http: HttpClient) {}

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
        if(e.id == id){
          e.likes = likes
        }
        return e
      })
      this.postSub.next(this.posts)
    })
  }

  delete(id:number) {
    this.http.delete(this.url+"/"+id).subscribe((res)=>{
      this.posts = this.posts.filter(p => p.id === id)
      this.postSub.next(this.posts)
    })
  }


}
