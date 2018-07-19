import { Injectable } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';



let todos=[
  { _id:1,title: 'Install Angular CLI', isDone: true },
  { _id:2,title: 'Style app', isDone: true },
  { _id:3,title: 'Finish service functionality', isDone: false },
  { _id:4,title: 'Setup API', isDone: false },
]


@Injectable()
export class TodoService {

  constructor() { }
  getAllTask(query){
    console.log("query");
    console.log(query);
   return new Promise((resolve,reject) => {
    var data;
    if(query==='completed'||query==="active") 
    {
      if(query==='completed'){
       
        data=todos.filter(todo=>{ return todo.isDone;})
        console.log(data);
      }else{
        if(query==='active'){
         
          data=todos.filter(todo=>{return !todo.isDone;})
          console.log(data);
        }
      }
       
      
    }else{
      data=todos;
    }
    resolve(data)});
  }
  
  add(newTodo){
    
    return new Promise((resolve,reject)=>{
      todos.push(newTodo);
      resolve(newTodo);
    })
  }

  put(data){
  return new Promise(resolve=>{
    let index=todos.findIndex(todo=>todo._id===data._id);
     todos[index].title=data.title;
     resolve(data);
  })
  }

  delete(data){
    return new Promise(resolve=>{
      let index=todos.findIndex(todo=>todo._id===data._id);
       todos.splice(index,1);
       resolve(data);
    })
  }
  deleteCompleted(){
    return new Promise(resolve=>{
      todos=todos.filter(todo=>{return !todo.isDone});
      resolve(todos);
    })
  }

  markUnmark(data){
    return new Promise(resolve=>{
      let index=todos.findIndex(todo=>todo._id===data._id);
       todos[index].isDone=!todos[index].isDone;
       resolve(data);
    })
  }

  markAllComplete(){
    return new Promise(resolve=>{
      todos.forEach((value,index,arr)=>{
        value.isDone=true;
      });
      resolve(todos);
    })
  }
}
