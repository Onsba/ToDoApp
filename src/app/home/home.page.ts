import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from '../services/todo.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private uid = null;

  todos: Todo[];

  constructor(private db: AngularFirestore, private todoService: TodoService, private afAuth: AngularFireAuth, private auth: AuthService) {
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user != null) {
        this.uid = user.uid;
        this.todoService.setTodos(this.db.collection('users').doc(user.uid).collection<Todo>('todos'));

        this.todoService.getTodos().subscribe(res => {
          this.todos = res;
        });
      }
    });
  }

  remove(item) {
    this.todoService.removeTodo(item.id);
  }

  logout() {
    this.todos = [];
    this.auth.doLogout();
  }
}
