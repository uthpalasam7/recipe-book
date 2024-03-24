import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    const index = this.ingredients.findIndex(ing => ing.name === ingredient.name);
    if (index >= 0) {
      // Ingredient already exists, update the count
      this.ingredients[index].amount += ingredient.amount;
    } else {
      // New ingredient, push to the array
      this.ingredients.push(ingredient);
    }
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    for (let ingredient of ingredients) {
      this.addIngredient(ingredient);
    }
  }
}
