import {Injectable} from '@angular/core';
import {RequestService} from "./request";
import {UserService} from "./user.service";
import {APIResponse} from "../models/response";
import {Emitter} from "./emitter.service";

@Injectable()
export class ProjectService {

  private projects: any[];
  private activeProject: any;

  constructor(private request: RequestService,
              private userService: UserService) {
  }

  getUserProjects() {
    return this.request.get('users', this.userService.getUserId(), 'projects')
      .do((response: APIResponse) => {
        if(response.isSuccess() && response.getData().length) {
          let data = response.getData();
          const activeProjectId = localStorage.getItem('activeProject');

          if(activeProjectId) {
            this.activeProject = data.find(item => item._id === activeProjectId);
          }

          if(!this.activeProject) {
            this.activeProject = data[0];
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

  getProjects() {
    return this.projects;
  }

  getActiveProject() {
    return this.activeProject;
  }

}