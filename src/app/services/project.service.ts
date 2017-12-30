import {Injectable} from '@angular/core';
import {RequestService} from "./request";
import {UserService} from "./user.service";
import {APIResponse} from "../models/response";
import {Emitter} from "./emitter.service";
import {Router} from "@angular/router";

@Injectable()
export class ProjectService {

  private projects: any[];
  private activeProject: any = {};

  constructor(private request: RequestService,
              private userService: UserService,
              private router: Router) {
    const activeProjectId = localStorage.getItem('activeProject');
    if (!activeProjectId) {
      this.router.navigate(['dashboard']);
    } else {
      this.activeProject._id = activeProjectId;
    }
  }

  getUserProjects() {
    return this.request.get('projects/byuser', this.userService.getUserId())
      .do((response: APIResponse) => {
        if (response.isSuccess() && response.getData().length) {
          let data = response.getData();
          const activeProjectId = localStorage.getItem('activeProject');

          if (activeProjectId) {
            this.activeProject = data.find(item => item._id === activeProjectId);
          }

          if (!this.activeProject) {
            this.activeProject = data[0];
            localStorage.setItem('activeProject', this.activeProject._id);
          }

          this.activeProject.active = true;
          response.setData(data);
          this.projects = data;
        }

        Emitter.get(Emitter.keys.PROJECTS_INITED).emit(!!response.getData().length);
      });
  }

  changeActiveProject(projectId: string) {
    localStorage.setItem('activeProject', projectId);
    window.location.reload();
  }

  createProject(projectName: string) {
    return this.request.post('projects', {
      name: projectName,
      user_ref: this.userService.getUserId()
    })
  }

  getTokens() {
    return this.request.get('projects/tokens', this.activeProject._id)
  }

  createToken(tokenName: string) {
    return this.request.post(`projects/tokens/${this.activeProject._id}`, {
      name: tokenName,
      project_ref: this.activeProject._id
    })
  }

  removeToken(tokenId: string) {
    return this.request.delete('projects/tokens', tokenId);
  }

  getProjects() {
    return this.projects;
  }

  getActiveProject() {
    return this.activeProject;
  }

}