import { Component, OnInit } from '@angular/core';
import {TodoService} from './todo.service';
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers:[TodoService]
})
export class TodoComponent implements OnInit {
  private path;
  private allTodos;
  
  private activeTasks;
  private newTodo;
  private allMarked=false;
  constructor(private todoService:TodoService,private activatedRoute :ActivatedRoute) { }
  
  getTodos(query=''){
    return this.todoService.getAllTask(query).then(todos=>{
   
      this.allTodos=todos;
      this.activeTasks=this.allTodos.filter(todo=> !todo.isDone).length;
    
      console.log(this.activeTasks);
    })
  }

  addTodo(){
    this.todoService.add({title:this.newTodo,isDone:false})
    .then(()=> {return this.getTodos()})
    .then(()=>{ this.newTodo='';});
  }
  updateTodo(todo,newValue){
    todo.title=newValue;
    return this.todoService.put(todo)
           .then(()=>{todo.editing=false;
             this.getTodos()})
  }
  remove(todo){
    return this.todoService.delete(todo)
    .then(()=>{
     return  this.getTodos()})
     
  }

  clearCompleted() {
    this.todoService.deleteCompleted().then(() => {
      return this.getTodos();
    });
  }
  markUnmark(todo){
    this.todoService.markUnmark(todo)
    .then(()=>{
      
      return this.getTodos();
    })
  }
  markAllAsComplete(){
    this.todoService.markAllComplete()
    .then(()=>{
      this.allMarked=!this.allMarked
      return this.getTodos();
    })
  }
  ngOnInit() {
      this.activatedRoute.params.subscribe(params=>{this.path=params['status'];
      console.log(this.path)
      this.getTodos(this.path);})
  }
       
  

}
