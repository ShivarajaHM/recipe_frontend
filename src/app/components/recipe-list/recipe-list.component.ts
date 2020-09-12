import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  Recipe = [];

  constructor(private apiService: ApiService) { 
    this.readRecipe();
  }

  ngOnInit() {
    // this.readRecipe();
    console.log('Recipessssssssssssssss',this.Recipe);
    // this.apiService.getRecipes().subscribe((data) => {
    //   console.log('Result........................',data);      
    //  this.Recipe.push(data);
     
     
    // })    
    
  }

  readRecipe(){
    console.log('Read data............');
    
    this.apiService.getRecipes().subscribe((data) => {
      console.log('Result........................',data);      
     this.Recipe.push(data);
     
     
    })    
  }

  removeEmployee(employee, index) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteEmployee(employee._id).subscribe((data) => {
          this.Recipe.splice(index, 1);
        }
      )    
    }
  }

}
