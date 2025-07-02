import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  inStock: boolean;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="products-container">
      <header class="products-header">
        <h1>Our Products</h1>
        <p class="subtitle">Discover amazing products with Server-Side Rendering</p>
        <div class="filters">
          <select [(ngModel)]="selectedCategory" (change)="filterProducts()" class="filter-select">
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
            <option value="home">Home & Garden</option>
          </select>
          <div class="search-box">
            <input 
              type="text" 
              [(ngModel)]="searchTerm" 
              (input)="filterProducts()"
              placeholder="Search products..."
              class="search-input"
            >
          </div>
        </div>
      </header>

      <div class="products-stats">
        <p>Showing {{ filteredProducts.length }} of {{ products.length }} products</p>
        <p>Server rendered at: {{ serverTime }}</p>
      </div>

      <div class="products-grid">
        <div 
          *ngFor="let product of filteredProducts" 
          class="product-card"
          [class.out-of-stock]="!product.inStock"
        >
          <div class="product-image">
            <img [src]="product.image" [alt]="product.name">
            <div class="product-badge" *ngIf="!product.inStock">Out of Stock</div>
          </div>
          
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            <p class="product-description">{{ product.description }}</p>
            
            <div class="product-meta">
              <span class="category">{{ product.category }}</span>
              <div class="rating">
                <span class="stars">
                  <span *ngFor="let star of getStars(product.rating)" class="star">★</span>
                </span>
                <span class="rating-text">({{ product.rating }})</span>
              </div>
            </div>
            
            <div class="product-price">
              <span class="price">\${{ product.price.toFixed(2) }}</span>
              <button 
                class="add-to-cart" 
                [disabled]="!product.inStock"
                (click)="addToCart(product)"
              >
                {{ product.inStock ? 'Add to Cart' : 'Out of Stock' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="no-products" *ngIf="filteredProducts.length === 0">
        <h3>No products found</h3>
        <p>Try adjusting your search or filter criteria.</p>
        <button (click)="clearFilters()" class="btn btn-primary">Clear Filters</button>
      </div>

      <div class="cart-summary" *ngIf="cartItems.length > 0">
        <h3>Shopping Cart ({{ cartItems.length }} items)</h3>
        <div class="cart-items">
          <div *ngFor="let item of cartItems" class="cart-item">
            <span>{{ item.name }}</span>
            <span>\${{ item.price.toFixed(2) }}</span>
          </div>
        </div>
        <div class="cart-total">
          <strong>Total: \${{ getCartTotal().toFixed(2) }}</strong>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .products-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    .products-header {
      text-align: center;
      padding: 40px 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 12px;
      margin-bottom: 30px;
    }

    .products-header h1 {
      font-size: 3rem;
      margin-bottom: 15px;
      font-weight: 700;
    }

    .subtitle {
      font-size: 1.2rem;
      margin-bottom: 30px;
      opacity: 0.9;
    }

    .filters {
      display: flex;
      gap: 20px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .filter-select, .search-input {
      padding: 12px 16px;
      border: none;
      border-radius: 6px;
      font-size: 1rem;
      min-width: 200px;
    }

    .filter-select:focus, .search-input:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
    }

    .products-stats {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 8px;
      font-size: 0.9rem;
      color: #666;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 30px;
      margin-bottom: 40px;
    }

    .product-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
    }

    .product-card.out-of-stock {
      opacity: 0.7;
    }

    .product-image {
      position: relative;
      height: 200px;
      overflow: hidden;
    }

    .product-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .product-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      background: #dc3545;
      color: white;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .product-info {
      padding: 20px;
    }

    .product-info h3 {
      font-size: 1.3rem;
      margin-bottom: 10px;
      color: #333;
    }

    .product-description {
      color: #666;
      line-height: 1.5;
      margin-bottom: 15px;
      font-size: 0.9rem;
    }

    .product-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }

    .category {
      background: #e9ecef;
      color: #495057;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.8rem;
      text-transform: capitalize;
    }

    .rating {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .stars {
      color: #ffc107;
    }

    .star {
      font-size: 0.9rem;
    }

    .rating-text {
      font-size: 0.8rem;
      color: #666;
    }

    .product-price {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .price {
      font-size: 1.4rem;
      font-weight: 700;
      color: #28a745;
    }

    .add-to-cart {
      background: #007bff;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      transition: background 0.3s ease;
    }

    .add-to-cart:hover:not(:disabled) {
      background: #0056b3;
    }

    .add-to-cart:disabled {
      background: #6c757d;
      cursor: not-allowed;
    }

    .no-products {
      text-align: center;
      padding: 60px 20px;
      background: #f8f9fa;
      border-radius: 12px;
    }

    .no-products h3 {
      font-size: 2rem;
      margin-bottom: 15px;
      color: #333;
    }

    .no-products p {
      color: #666;
      margin-bottom: 20px;
    }

    .btn {
      display: inline-block;
      padding: 12px 24px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-decoration: none;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn:hover {
      transform: translateY(-2px);
    }

    .cart-summary {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 12px;
      margin-top: 30px;
    }

    .cart-summary h3 {
      margin-bottom: 15px;
      color: #333;
    }

    .cart-items {
      margin-bottom: 15px;
    }

    .cart-item {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #dee2e6;
    }

    .cart-total {
      text-align: right;
      font-size: 1.2rem;
      color: #333;
    }

    @media (max-width: 768px) {
      .products-header h1 {
        font-size: 2rem;
      }
      
      .filters {
        flex-direction: column;
        align-items: center;
      }
      
      .filter-select, .search-input {
        min-width: 250px;
      }
      
      .products-stats {
        flex-direction: column;
        gap: 10px;
        text-align: center;
      }
      
      .products-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedCategory: string = '';
  searchTerm: string = '';
  serverTime: string = '';
  cartItems: Product[] = [];

  constructor(private title: Title, private meta: Meta) {}

  ngOnInit() {
    // Set page title and meta tags for SEO
    this.title.setTitle('Products - Angular SSR Demo');
    this.meta.updateTag({ name: 'description', content: 'Browse our products with Server-Side Rendering. Fast loading and SEO optimized product catalog.' });
    this.meta.updateTag({ name: 'keywords', content: 'Products, Angular SSR, E-commerce, Server-Side Rendering' });

    // Set server time (this will be different on server vs client)
    this.serverTime = new Date().toLocaleString();

    // Initialize products data
    this.initializeProducts();
    this.filteredProducts = [...this.products];
  }

  initializeProducts() {
    this.products = [
      {
        id: 1,
        name: 'Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation.',
        price: 199.99,
        category: 'electronics',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        rating: 4.5,
        inStock: true
      },
      {
        id: 2,
        name: 'Smart Watch',
        description: 'Feature-rich smartwatch with health monitoring.',
        price: 299.99,
        category: 'electronics',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        rating: 4.3,
        inStock: true
      },
      {
        id: 3,
        name: 'Cotton T-Shirt',
        description: 'Comfortable cotton t-shirt in various colors.',
        price: 29.99,
        category: 'clothing',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
        rating: 4.0,
        inStock: true
      },
      {
        id: 4,
        name: 'Programming Book',
        description: 'Comprehensive guide to modern web development.',
        price: 49.99,
        category: 'books',
        image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
        rating: 4.7,
        inStock: false
      },
      {
        id: 5,
        name: 'Garden Plant',
        description: 'Beautiful indoor plant for home decoration.',
        price: 39.99,
        category: 'home',
        image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400',
        rating: 4.2,
        inStock: true
      },
      {
        id: 6,
        name: 'Laptop Stand',
        description: 'Ergonomic laptop stand for better posture.',
        price: 79.99,
        category: 'electronics',
        image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400',
        rating: 4.1,
        inStock: true
      }
    ];
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(product => {
      const matchesCategory = !this.selectedCategory || product.category === this.selectedCategory;
      const matchesSearch = !this.searchTerm || 
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }

  clearFilters() {
    this.selectedCategory = '';
    this.searchTerm = '';
    this.filteredProducts = [...this.products];
  }

  getStars(rating: number): number[] {
    return Array.from({ length: Math.floor(rating) }, (_, i) => i);
  }

  addToCart(product: Product) {
    if (product.inStock) {
      this.cartItems.push(product);
      // In a real app, you'd update a service or state management
    }
  }

  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }
} 