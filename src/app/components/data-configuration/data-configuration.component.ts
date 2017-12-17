import {Component, OnInit} from '@angular/core';
import {UploadService} from "../../services/upload.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {APIResponse} from "../../models/response";
import {ProjectService} from "../../services/project.service";

@Component({
  selector: 'app-data-configuration',
  templateUrl: './data-configuration.component.html',
  styleUrls: ['./data-configuration.component.scss']
})
export class DataConfigurationComponent implements OnInit {

  file: any;
  dataColumns: any;
  formData: any = {};

  constructor(private uploadService: UploadService,
              private projectService: ProjectService) {
  }

  ngOnInit() {
  }

  selectFile(event) {
    this.file = event.target.files;
    this.uploadFile(event.target.files, '/dataprocess/columns').subscribe(response => {
      if (response instanceof HttpResponse) {
        response = new APIResponse(response.body);
        this.dataColumns = response.getFirst().columns;

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
    this.formData.fields = JSON.stringify(this.formData.fields);
    this.uploadFile(this.file, '/dataprocess/import', this.formData).subscribe(response => {
      debugger;
    })
  }
}
