import { Component, OnInit } from '@angular/core';
import {RequestService} from "../../../../services/request";
import {ProjectService} from "../../../../services/project.service";
import {APIResponse} from "../../../../models/response";

@Component({
  selector: 'item-sets',
  templateUrl: './item-sets.component.html',
  styleUrls: ['./item-sets.component.scss'],
  exportAs: 'itemSets'
})
export class ItemSetsComponent implements OnInit {

  loading = false;
  rules: any;
  private loadRequest;

  constructor(private request: RequestService,
              private project: ProjectService) { }

  ngOnInit() {
  }

  loadItemSets(reload = false) {
    if(!reload && this.rules) return;

    if(this.loadRequest) {
      this.loadRequest.unsubscribe();
    }
    this.loading = true;

    if(!this.project.getActiveProject()) {
      alert('Default project not defined');
      return;
    }

    const projectId = this.project.getActiveProject()._id;

    this.loadRequest = this.request.get('dataprocess', projectId, 'itemsets')
      .subscribe((response: APIResponse) => {
        if(response.isSuccess()) {
          this.rules = response.getData();
        }

        this.loading = false;
      })
  }
}
