import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: "app-search-box",
  templateUrl: "./search-box.component.html",
  styleUrls: ["./search-box.component.css"]
})
export class SearchBoxComponent implements OnInit {
  constructor(private http: HttpClient) {}
  listOfEvent = [];
  prevSearchHistory: any[] = [];
  searchKeyword: string = "";
  ngOnInit(){}

  onSearch() {
    if(this.searchKeyword){
      let searchedData = this.prevSearchHistory.filter(item => item.keyword === this.searchKeyword);
      if(searchedData?.length > 0){
        this.listOfEvent = searchedData[0].result;
      }
      else {
        this.http
          .get(
            `https://app.ticketmaster.com/discovery/v2/events?apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0&keyword=${this.searchKeyword}&locale=*`
          )
          .subscribe((res: any) => {
            this.listOfEvent = res?._embedded?.events;
            this.prevSearchHistory.push({keyword: this.searchKeyword, result: res?._embedded?.events});
            if(this.prevSearchHistory.length > 5){
              this.prevSearchHistory.shift();
            }
          });
      }
    }
    else {
      this.listOfEvent = [];
    }
  }
}
