import { Component, OnInit } from '@angular/core';
import {RequestService} from "../../../../services/request";
import {ProjectService} from "../../../../services/project.service";
import {APIResponse} from "../../../../models/response";

@Component({
  selector: 'collected-data',
  templateUrl: './collected-data.component.html',
  styleUrls: ['./collected-data.component.scss'],
  exportAs: 'collected'
})
export class CollectedDataComponent implements OnInit {

  data;
  dataHeader;
  loading = false;

  private request;

  constructor(private requestService: RequestService,
              private project: ProjectService) { }

  ngOnInit() {
  }

  loadCollectedData() {

    this.loading = true;
    this.data = [];

    if(this.request) {
      this.request.unsubscribe();
    }

    const projectId = this.project.getActiveProject()._id;

    this.request = this.requestService.get(`dataprocess/${projectId}/collected_data`)
      .subscribe((response: APIResponse) => {
        if(response.isSuccess()) {
          this.data = response.getData();
          if(this.data.length) {
            this.dataHeader = Object.keys(this.data[0]);
          }
        } else {
          // this.message = response.getError();
        }
        this.loading = false;
        this.request = undefined;
      })
  }
}
