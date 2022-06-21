import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable ,  Subscription ,  of } from 'rxjs';

import { MessageService } from '../../../messages/message.service';

import { Product } from '../../../models/product.model';
import { Category } from '../../../models/category.model';
import { CategoryService } from '../../../account/category/shared/category.service';

// we send and receive categories as {key:true},
// but for the input field we need
// a product with categories of type string
export class DomainProduct extends Product {
  categories: string;
}

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditCategoryComponent implements OnInit, OnDestroy {
  private productSubscription: Subscription;
  private formSubscription: Subscription;
  @ViewChild('photos', { static: true }) photos;
  public categoryForm: FormGroup;
  public category: Category;
  public mode: 'edit' | 'add';
  public id;
  public percentage: Observable<number>;

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private categoryService: CategoryService,
    private log: MessageService
  ) {}

  ngOnInit(): void {
    this.setProduct();
  }

  private initForm() {
    this.categoryForm = new FormGroup({
      name: new FormControl(
        this.category && this.category.name,
        Validators.required
      ),
      id: new FormControl(
        {
          value: this.category && this.category.id,
          disabled: true
        },
        [Validators.required, Validators.min(0)]
      ),
      date: new FormControl(
        this.category && this.category.date,
        Validators.required
      ),
      description: new FormControl(
        this.category && this.category.description,
        Validators.required
      ),
    });
    this.onFormChanges();
  }

  private setProduct() {
    this.route.params.subscribe((params: Params) => {
      this.id = +this.route.snapshot.paramMap.get('id');
      // if we have an id, we're in edit mode
      if (this.id) {
        this.mode = 'edit';
        this.getCate(this.id);
        this.initForm();
      } else {
        // else we are in add mode
        this.mode = 'add';
        this.constructCate();
        this.initForm();
      }
    });
  }

  private constructCate() {
    const product = this.constructMockCate();
    this.syncProduct(product);
    this.initForm();
  }

  private getCate(id): void {
    this.productSubscription = this.categoryService
      .getCategory(id)
      .subscribe((cate) => {
        console.log('CategoryCategory', cate);
        if (cate) {
          this.syncProduct(cate);
          this.initForm();

        }
      });
  }

  private onFormChanges() {
    this.formSubscription = this.categoryForm.valueChanges.subscribe(
      (formFieldValues) => {
        const product = { ...this.category, ...formFieldValues };
        this.syncProduct(product);
      }
    );
  }

  private syncProduct(category): void {
    const id = this.createId(category);

    this.category = {
      ...category,
      id,
    };
  }

  public onSubmit() {
    this.syncProduct({ ...this.category, ...this.categoryForm.value });
    const cateToSubmit = this.category;
    if (this.mode === 'add') {
      this.addCate(cateToSubmit);
    } else if (this.mode === 'edit') {
      this.updateProduct(cateToSubmit);
    } else {
      this.log.addError('Please provide a file for your product');
      return;
    }
  }

  private addCate(category: Category) {
    this.categoryService.addCategory(category).subscribe(
      (savedProduct: Category) => {
        this.category = null;
        this.router.navigate(['/admin/category/list']);
      },
      (error) => {
        this.log.addError('Could not upload your product');
        return of(error);
      }
    );
  }

  private updateProduct(category: Category) {
    this.productSubscription.unsubscribe();
    this.categoryService.updateCategory(category).subscribe(
      (response: Product) => {
        this.router.navigate(['/admin/category/edit/' + response.id]);
      },
      (error) => this.log.addError('Could not update your product')
    );
  }

  public onDelete() {
    if (this.mode === 'edit') {
      this.productSubscription.unsubscribe();
      this.categoryService.deleteCategory(this.category).then((res) => {
        this.router.navigate(['admin/category/list']);
      });
    } else {
      this.log.addError(`Cannot delete new product`);
    }
  }

  // pure helper functions start here:
  private constructMockCate() {
    return new Category();
  }

  private constructProductToSubmit(product: DomainProduct): Product {
    return {
      ...product,
      categories: this.categoriesFromStringToObject(product.categories)
    };
  }

  private createId(product: Product): number {
    const randomId = Math.floor(Math.random() * new Date().getTime());
    let id = product.id || randomId;
    if (id === 1) {
      id = randomId;
    }
    return id;
  }

  private categoriesFromObjectToString(categories: {}): string | null {
    // categories: { key: true, key: true} || {}
    if (Object.keys(categories).length === 0) {
      return 'example, category';
    }
    return Object.keys(categories).reduce(
      (result, currentProduct, index, inputArray) => {
        if (index < inputArray.length - 1) {
          return result + currentProduct + ',';
        }
        return result + currentProduct;
      },
      ''
    );
  }

  private categoriesFromStringToObject(categories: string): {} {
    // categories: 'cat1, cat2, cat3' || ''
    if (categories.length === 0) {
      return {};
    }
    return categories
      .split(',')
      .reduce((combinedCategories, currentCategory) => {
        combinedCategories[currentCategory.trim()] = true;
        return combinedCategories;
      }, {});
  }

  private checkForSale(reduction: number): boolean {
    return reduction > 0;
  }

  private calculateReduction(priceNormal: number, price: number): number {
    const reduction = Math.round((priceNormal - price) / priceNormal * 100);
    return reduction > 0 ? reduction : 0;
  }

  private handleImageURLs(product: Product): string[] {
    if (product.imageURLs && product.imageURLs.length > 0) {
      return product.imageURLs;
    }
    return [];
  }

  ngOnDestroy() {
    this.formSubscription.unsubscribe();
  }
}
