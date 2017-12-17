import {Component} from '@angular/core';
import {APIResponse} from "../../models/response";
import {ProjectService} from "../../services/project.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {NewProjectComponent} from "../new-project/new-project.component";


@Component({
  selector: 'app-aside',
  templateUrl: './app-aside.component.html'
})
export class AppAsideComponent {

  bsModalRef: BsModalRef;
  projects: any[];

  constructor(private projectsService: ProjectService,
              private modalService: BsModalService) {
    this.getProjects();
  }

  changeActiveProject(index) {
    this.projectsService.changeActiveProject(index)
  }

  openProjectModal() {
    this.bsModalRef = this.modalService.show(NewProjectComponent, { class: 'gray modal-lg'});
  }

  private getProjects() {
    this.projectsService.getUserProjects().subscribe((response: APIResponse) => {
      this.projects = response.getData();
    });
  }

}
