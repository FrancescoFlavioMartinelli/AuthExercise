import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logged = false;

  name = "Effettua il login"


  constructor(private auth:AuthService, private postSrv:PostService) { }

  ngOnInit(): void {
    this.auth.authObs.subscribe((res)=>{
      if(res){
        this.logged = true
        this.name = res.name
      }
      else{
        this.logged = false
        this.name = "Effettua il login"
      }
    })


  }

  logout(){
    if(confirm("Sei sicuro di voler uscire?")){
      this.auth.logout()
    }
  }

}
