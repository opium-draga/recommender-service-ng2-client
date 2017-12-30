import {Component, EventEmitter, OnInit} from '@angular/core';
import {RequestService} from "../../services/request";
import {ProjectService} from "../../services/project.service";
import {APIResponse} from "../../models/response";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {NewTokenComponent} from "../new-token/new-token.component";

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit {

  tokens;
  bsModalRef: BsModalRef;
  modalRef: BsModalRef;
  tokenToRemove: string;
  loading = true;

  constructor(private request: RequestService,
              private project: ProjectService,
              private modalService: BsModalService) {
  }

  ngOnInit() {
    this.loadProjectTokens();
  }

  loadProjectTokens() {
    this.project.getTokens().subscribe((response: APIResponse) => {
      if (response.isSuccess()) {
        this.tokens = response.getData();
      } else {
        this.tokens = [];
      }

      this.loading = false;
    });
  }

  createToken() {
    this.bsModalRef = this.modalService.show(NewTokenComponent, {class: 'gray modal-lg'});

    this.bsModalRef.content.created = new EventEmitter();
    this.bsModalRef.content.created.subscribe((token) => {
      this.bsModalRef.hide();
      this.tokens.unshift({
        name: token.name,
        token: token.token,
        _id: token.id
      })
    })
  }

  removeToken(tokenId, template) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    this.tokenToRemove = tokenId;
  }

  confirmRemove() {
    this.project.removeToken(this.tokenToRemove).subscribe((response: APIResponse) => {
      this.modalRef.hide();
      if (response.isSuccess()) {
        this.tokens = this.tokens.filter(item => item._id != this.tokenToRemove)
      } else {
        alert(response.getError())
      }
    })
  }
}
