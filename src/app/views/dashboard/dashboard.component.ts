import { Component, OnInit } from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {NewProjectComponent} from "../../components/new-project/new-project.component";
import {Emitter} from "../../services/emitter.service";
import {Router} from "@angular/router";
import {ProjectService} from "../../services/project.service";

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  bsModalRef: BsModalRef;
  projectExist: any;

  constructor(private modalService: BsModalService,
              private router: Router,
              private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.projectExist = !!this.projectService.getActiveProject();
    Emitter.get(Emitter.keys.PROJECTS_INITED).subscribe(success => {
      this.projectExist = success;
    });
  }

  openProjectModal() {
    this.bsModalRef = this.modalService.show(NewProjectComponent, { class: 'gray modal-lg'});
  }

  redirectToDataConf() {
    this.router.navigate(['data-configuration']);
  }
}
