import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards=[];
  cardsForHandset = [];
  cardsForWeb =[];
  isHandset:boolean=false;
  isHandsetObserver:Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return true;
      }
      return false;


    })
  );

  constructor(private breakpointObserver: BreakpointObserver,
    public appService:AppService) {}
  ngOnInit(){
    this.isHandsetObserver.subscribe(currentObservervalue=> {
      this.isHandset = currentObservervalue;
      this.loadCards();

    });
    this.appService.getDeals().subscribe(
      response =>{
        this.cardsForHandset = response.Handsetcards;
        this.cardsForWeb = response.Webcards;
        this.loadCards();

      },
      Error=>{
        alert('their is a problem in the server.please try again later')

      }
    )
  }
  loadCards(){
    this.cards =this.isHandset ? this.cardsForHandset:this.cardsForWeb;
  }
  getImage(imageName:string):string{
    return 'url('+'http://localhost:3000/images'+imageName+'jpg'+')';
  }
}
