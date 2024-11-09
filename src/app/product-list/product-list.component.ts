export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'price', 'category', 'description', 'stock'];
  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data.products;  // Assuming response structure
    });
  }
}
