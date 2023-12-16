import {Component, OnInit} from '@angular/core';
import {Task} from "../task"
import {TasksService} from "../tasks.service";
import {forkJoin, Observable} from "rxjs";

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
  public tasks : Task[] = [];
  private _taskService: TasksService

  constructor(taskService: TasksService) {
    this._taskService = taskService;
  }

  ngOnInit(): void {
    this._taskService.index(true).subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  delete(task: Task) {
    if (!confirm('Are you sure?')) {
      return;
    }

    this._taskService.delete(task).subscribe(() => {
      this.ngOnInit();
    });
  }

  unarchive(task: Task) {
    const observables: Observable<any>[] = [];
    for (const task of this.tasks) {
      if (!task.completed) {
        continue;
      }

      task.archived = false;
      observables.push(this._taskService.put(task));
    }

    forkJoin(observables).subscribe(() => {
      this.ngOnInit();
    });

  }
}
