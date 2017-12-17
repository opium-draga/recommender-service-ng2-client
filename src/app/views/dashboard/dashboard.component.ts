import { Component, OnInit } from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {NewProjectComponent} from "../../components/new-project/new-project.component";
import {Emitter} from "../../services/emitter.service";

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  bsModalRef: BsModalRef;
  projectExist: any;

  constructor(private modalService: BsModalService) {
  }

  ngOnInit(): void {
    Emitter.get(Emitter.keys.PROJECTS_INITED).subscribe(success => {
      this.projectExist = success;
    });
  }

  openProjectModal() {
    this.bsModalRef = this.modalService.show(NewProjectComponent, { class: 'gray modal-lg'});
  }
}
