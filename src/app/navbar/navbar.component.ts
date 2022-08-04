import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logged = false;

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.auth.authObs.subscribe((res)=>{
      if(res){
        this.logged = true}
      else{this.logged = false}
    })
  }

  logout(){
    if(confirm("Sei sicuro di voler uscire?")){
      this.auth.logout()
    }
  }

}
