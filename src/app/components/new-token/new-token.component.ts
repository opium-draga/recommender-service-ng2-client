import {Component, EventEmitter, OnInit} from '@angular/core';
import {ProjectService} from "../../services/project.service";
import {BsModalRef} from "ngx-bootstrap";
import {APIResponse} from "../../models/response";

@Component({
  selector: 'app-new-token',
  templateUrl: './new-token.component.html',
  styleUrls: ['./new-token.component.scss']
})
export class NewTokenComponent implements OnInit {

  tokenName: string;
  error: string;
  created: EventEmitter;

  constructor(public bsModalRef: BsModalRef,
              public projectService: ProjectService) { }

  ngOnInit() {
  }

  createToken() {
    this.error = '';
    this.projectService.createToken(this.tokenName).subscribe((response: APIResponse) => {
      if(response.isSuccess()) {
        this.created.emit({
          name: this.tokenName,
          token: response.getFirst().token,
          _id: response.getFirst()._id
        });
      } else {
        this.error = response.getError();
      }
    })
  }

}
