import {Component, OnInit} from '@angular/core';
import {Task} from "../task";
import {TasksService} from "../tasks.service";
import {forkJoin, Observable} from "rxjs";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit{
  private _taskService: TasksService;

  public tasks: Task[] = [];
  public newTask: Task = {};

  constructor(taskService: TasksService) {
    this._taskService = taskService;
  }

  ngOnInit(): void {
    this._taskService.index().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }


  addTask(): void {
    if (this.newTask.title === undefined) {
      return;
    }
      const newTask: Task = {
        title: this.newTask.title,
        deadline: this.newTask.deadline ? new Date(this.newTask.deadline) : undefined,
        completed: false,
        archived: false
      };

      this._taskService.post(newTask).subscribe((task: Task) => {
        this.newTask = {}
        this.ngOnInit();
      });
  }

  completeTask(task: Task): void {
    task.completed = !task.completed
    this._taskService.put(task).subscribe({
      error: err => {
        alert(err);
        this.ngOnInit();
      }
    });
  }

  archiveTask(): void {
    const observables: Observable<any>[] = [];
    for (const task of this.tasks) {
      if (!task.completed) {
        continue;
      }

      task.archived = true;
      observables.push(this._taskService.put(task));
    }

    forkJoin(observables).subscribe(() => {
      this.ngOnInit();
    });
  }
}
