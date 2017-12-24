import {Component, OnInit, ViewChild} from '@angular/core';
import {UploadService} from "../../services/upload.service";
import {HttpResponse} from "@angular/common/http";
import {APIResponse} from "../../models/response";
import {ProjectService} from "../../services/project.service";
import * as _ from "lodash";
import {TabsetComponent} from "ngx-bootstrap";

@Component({
  selector: 'app-data-configuration',
  templateUrl: './data-configuration.component.html',
  styleUrls: ['./data-configuration.component.scss']
})
export class DataConfigurationComponent implements OnInit {

  @ViewChild('staticTabs') staticTabs: TabsetComponent;

  file: any;
  dataColumns: any;
  formData: any = {};
  loading = false;
  reloadItemSets = false;


  constructor(private uploadService: UploadService,
              private projectService: ProjectService) {
  }

  ngOnInit() {
  }

  selectTab(tab_id: number) {
    this.staticTabs.tabs[tab_id].active = true;
  }

  selectFile(event) {
    this.file = event.target.files;
    this.uploadFile(event.target.files, '/dataprocess/columns').subscribe(response => {
      if (response instanceof HttpResponse) {
        let apiResponse = new APIResponse(response.body);
        this.dataColumns = apiResponse.getFirst().columns;

        this.formData.fields = {};
        this.dataColumns.forEach(columnName => {
          this.formData.fields[columnName] = "redundant";
        });

        this.formData.project_ref = this.projectService.getActiveProject()._id;
      }
    })
  }

  uploadFile(files: FileList, url: string, fields = {}) {
    if (files.length == 0) {
      console.log("No file selected!");
      return

    }
    let file: File = files[0];

    return this.uploadService.uploadFile(url, file, fields);
  }

  importData() {
    let formData = <any>_.cloneDeep(this.formData);
    formData.fields = JSON.stringify(formData.fields);
    this.loading = true;

    this.uploadFile(this.file, '/dataprocess/import', formData).subscribe(response => {
      if (response instanceof HttpResponse) {
        this.loading = false;
        this.reloadItemSets = true;
        this.selectTab(1);

        setTimeout(() => {
          this.reloadItemSets = true;
        });
      }
    })
  }
}
