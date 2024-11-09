import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  isEditMode = false;
  productId: number;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      description: [''],
      stock: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.productId = params['id'];
        this.productService.getProductById(this.productId).subscribe((data) => {
          this.productForm.patchValue(data);
        });
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) return;

    if (this.isEditMode) {
      this.productService.updateProduct(this.productId, this.productForm.value).subscribe(() => {
        this.router.navigate(['/products']);
      });
    } else {
      this.productService.createProduct(this.productForm.value).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }
}
