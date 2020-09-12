import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {

  submitted = false;
  employeeForm: FormGroup;
  EmployeeProfile:any = ['Finance', 'BDM', 'HR', 'Sales', 'Admin']
  
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) { 
    this.mainForm();
  }
  
  ngOnInit() { }

  mainForm() {
    this.employeeForm = this.fb.group({
      RecipeId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      RecipeName: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      Description: ['', [Validators.required]],
      Calories: ['', [Validators.required]],
      Recipecreateddate: ['', [Validators.required]],
      IngredientNames: ['', [Validators.required]]
    })
  }

  // Choose designation with select dropdown
  updateProfile(e){
    this.employeeForm.get('designation').setValue(e, {
      onlySelf: true
    })
  }

  // Getter to access form control
  get myForm(){
    return this.employeeForm.controls;
  }
   
  onSubmit() {
    console.log('Suceesfully',this.employeeForm.value);
    
    this.submitted = true;
    if (this.employeeForm.value) {
      this.apiService.createEmployee(this.employeeForm.value).subscribe(
        (res) => {
          console.log('Recipe successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/recipe-list'))
        }, (error) => {
          console.log(error);
        });
    }else{
      return false;
    }
  }

}
