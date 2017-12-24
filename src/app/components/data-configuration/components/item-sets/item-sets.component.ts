import { Component, OnInit } from '@angular/core';
import {RequestService} from "../../../../services/request";

@Component({
  selector: 'item-sets',
  templateUrl: './item-sets.component.html',
  styleUrls: ['./item-sets.component.scss'],
  exportAs: 'itemSets'
})
export class ItemSetsComponent implements OnInit {

  constructor(private request: RequestService) { }

  ngOnInit() {
  }

  loadItemSets(reload = false) {

    if(!reload) return;

    // this.request.get('dataprocess')

  }

}
