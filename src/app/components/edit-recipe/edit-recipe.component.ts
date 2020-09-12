import { ApiService } from './../../service/api.service';
import { Recipe } from './../../model/recipe';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent implements OnInit {

 
  submitted = false;
  editForm: FormGroup;
  employeeData: Recipe[];

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateRecipe();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getEmployee(id);
    this.editForm = this.fb.group({
      RecipeId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      RecipeName: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      Description: ['', [Validators.required]],
      Calories: ['', [Validators.required]],
      Recipecreateddate: ['', [Validators.required]],
      IngredientNames: ['', [Validators.required]]
    })
  }

  // Choose options with select-dropdown
  updateProfile(e) {
    this.editForm.get('designation').setValue(e, {
      onlySelf: true
    })
  }

  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }

  getEmployee(id) {
    this.apiService.getEmployee(id).subscribe(data => {
      this.editForm.setValue({
        RecipeId: data['RecipeId'],
        RecipeName: data['RecipeName'],
        Description: data['Description'],
        Calories: data['Calories'],
        Recipecreateddate: data['Recipecreateddate'],
        IngredientNames: data['IngredientNames']
      });
    });
  }

  updateRecipe() {
    this.editForm = this.fb.group({
      RecipeId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      RecipeName: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      Description: ['', [Validators.required]],
      Calories: ['', [Validators.required]],
      Recipecreateddate: ['', [Validators.required]],
      IngredientNames: ['', [Validators.required]]
    })
  }

  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.updateRecipe(id, this.editForm.value)
          .subscribe(res => {
            this.router.navigateByUrl('/recipe-list');
            console.log('Content updated successfully!')
          }, (error) => {
            console.log(error)
          })
      }
    }
  }

}
