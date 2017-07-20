import { Component, OnInit, OnChanges } from '@angular/core';
import { CommonServiceService } from '../services/common-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  firenlyLinkData: any;
  linkNode: any;

  constructor(private service: CommonServiceService) {
  }

  ngOnInit() {
    // 友情链接
    this.service.getData('Blogroll')
        .then(response => {
          this.firenlyLinkData = response.Data.ListData;
          // console.log(this.firenlyLinkData);
        });
  }

  linkChange(changes) {
    console.log(changes);
    window.open(this.linkNode.Url);
  }

}
