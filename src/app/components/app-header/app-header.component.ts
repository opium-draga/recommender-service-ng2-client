import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {RequestService} from "../../services/request";
import {Router} from "@angular/router";
import {Emitter} from "../../services/emitter.service";
import {ProjectService} from "../../services/project.service";

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent implements OnInit{

  activeProject: any;
  userModel: any;

  constructor(public user: UserService,
              private projectService: ProjectService,
              private router: Router) {
  }

  ngOnInit() {
    this.userModel = this.user.getModel();
    Emitter.get(Emitter.keys.PROJECTS_INITED).subscribe(success => {
      if(success) {
        this.activeProject = this.projectService.getActiveProject();
      }
    });
  }

  logout() {
    this.user.logout();
    this.router.navigate(['/pages/login']);
  }
}
