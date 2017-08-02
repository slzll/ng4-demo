import { Component, OnInit } from '@angular/core';
import {CommonService} from "../services/common-service.service";

@Component({
  selector: 'app-personal-center',
  templateUrl: './personal-center.component.html',
  styleUrls: ['./personal-center.component.css']
})
export class PersonalCenterComponent implements OnInit {

  constructor(private service:CommonService) { }

  ngOnInit() {
    this.service.keepOnline();
  }

}
