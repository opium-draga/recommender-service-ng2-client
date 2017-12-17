import { Component, OnInit } from '@angular/core';
import {BsModalRef} from "ngx-bootstrap";
import {ProjectService} from "../../services/project.service";
import {APIResponse} from "../../models/response";

@Component({
  selector: 'new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent {

  projectName: string;
  error: string;

  constructor(public bsModalRef: BsModalRef,
              public projectService: ProjectService) { }

  createProject() {
    this.error = '';
    this.projectService.createProject(this.projectName).subscribe((response: APIResponse) => {
      if(response.isSuccess()) {
        this.projectService.changeActiveProject(response.getFirst()._id);
      } else {
        this.error = response.getError();
      }
    })
  }
}
