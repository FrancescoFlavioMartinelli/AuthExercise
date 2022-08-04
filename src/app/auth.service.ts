import {
  HttpClient
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  BehaviorSubject,
  Subject
} from 'rxjs';
import {
  AuthResponse,
  AuthUser,
  UserLogin,
  UserSignup
} from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = "http://localhost:3000/"

  logged = false;

  helper = new JwtHelperService()

  //OBSERVABLE AUTH
  authSub = new BehaviorSubject< false | AuthUser >(false);
  // authSub = new Subject<false|AuthUser>();
  authObs = this.authSub.asObservable();

  constructor(private http: HttpClient) {
    this.authObs.subscribe((res) => {
      this.logged = res ? true : false
    })
  }

  //METODI AUTH
  login(u: UserLogin) {
    this.http.post < AuthResponse > (this.url + "login", u).subscribe((res) => {
      alert("Login effettuato")
      localStorage.setItem("token", res.accessToken)
      this.authSub.next(res.user)
    })
  }
  singup(u: UserSignup) {
    this.http.post < AuthResponse > (this.url + "signup", u).subscribe((res) => {
      alert("Registrazione effettuata")
      localStorage.setItem("token", res.accessToken)
      this.authSub.next(res.user)
    })
  }
  logout() {
    // this.http.post
    localStorage.removeItem("token")
    this.authSub.next(false)
  }

  //METODI FEATURES
  isAuth(): boolean {
    let t = localStorage.getItem("token")
    if (t) {
      // this.logout()
      if(this.helper.isTokenExpired(t)){
        this.logout()
      } else {
        return true
      }
    }
    return false
  }
}
