import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

const API_DATA_KEY = makeStateKey<any>('apiData');

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="home-container">
      <header class="hero-section">
        <h1>Welcome to Angular SSR Demo</h1>
        <p class="subtitle">Experience Server-Side Rendering in Action</p>
        <div class="hero-buttons">
          <a routerLink="/products" class="btn btn-primary">View Products</a>
          <a routerLink="/about" class="btn btn-secondary">Learn More</a>
        </div>
      </header>

      <!-- API Data Section -->
      <section class="api-data-section" *ngIf="apiData">
        <h2>🚀 API Data from Server</h2>
        <div class="api-card">
          <h3>Server Response:</h3>
          <pre>{{ apiData | json }}</pre>
          <!-- <pre>{{ apiData[0].message }}</pre> -->
           <a href="'/home/'+{{apiData.id}}">{{apiData.title}}</a>
          <p class="data-source">
            <strong>Source:</strong> 
            <span *ngIf="isServerRendered; else clientRendered">Server-Side Rendering</span>
            <ng-template #clientRendered>Client-Side Fallback</ng-template>
          </p>
        </div>
      </section>

      <section class="features">
        <h2>Key Features</h2>
        <div class="feature-grid">
          <div class="feature-card">
            <h3>🚀 Server-Side Rendering</h3>
            <p>Faster initial page loads and better SEO with pre-rendered content.</p>
          </div>
          <div class="feature-card">
            <h3>⚡ Performance</h3>
            <p>Optimized loading times and improved Core Web Vitals scores.</p>
          </div>
          <div class="feature-card">
            <h3>🔍 SEO Friendly</h3>
            <p>Search engines can easily crawl and index your content.</p>
          </div>
          <div class="feature-card">
            <h3>📱 Universal</h3>
            <p>Works seamlessly across all devices and platforms.</p>
          </div>
        </div>
      </section>

      <section class="demo-content">
        <h2>Dynamic Content Demo</h2>
        <p>Current server time: {{ currentTime }}</p>
        <p>This content is rendered on the server and hydrated on the client.</p>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    .hero-section {
      text-align: center;
      padding: 60px 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 12px;
      margin-bottom: 40px;
    }

    .hero-section h1 {
      font-size: 3rem;
      margin-bottom: 20px;
      font-weight: 700;
    }

    .subtitle {
      font-size: 1.2rem;
      margin-bottom: 30px;
      opacity: 0.9;
    }

    .hero-buttons {
      display: flex;
      gap: 20px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .btn {
      padding: 12px 24px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .btn-primary {
      background: #fff;
      color: #667eea;
    }

    .btn-primary:hover {
      background: #f8f9fa;
      transform: translateY(-2px);
    }

    .btn-secondary {
      background: transparent;
      color: white;
      border: 2px solid white;
    }

    .btn-secondary:hover {
      background: white;
      color: #667eea;
      transform: translateY(-2px);
    }

    .api-data-section {
      margin-bottom: 40px;
    }

    .api-data-section h2 {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 30px;
      color: #333;
    }

    .api-card {
      background: white;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      border-left: 4px solid #28a745;
    }

    .api-card h3 {
      font-size: 1.3rem;
      margin-bottom: 15px;
      color: #333;
    }

    .api-card pre {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 6px;
      overflow-x: auto;
      font-size: 0.9rem;
      margin-bottom: 15px;
    }

    .data-source {
      font-size: 0.9rem;
      color: #666;
      margin: 0;
    }

    .features {
      margin-bottom: 40px;
    }

    .features h2 {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 40px;
      color: #333;
    }

    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
    }

    .feature-card {
      background: white;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      text-align: center;
      transition: transform 0.3s ease;
    }

    .feature-card:hover {
      transform: translateY(-5px);
    }

    .feature-card h3 {
      font-size: 1.5rem;
      margin-bottom: 15px;
      color: #333;
    }

    .feature-card p {
      color: #666;
      line-height: 1.6;
    }

    .demo-content {
      background: #f8f9fa;
      padding: 40px;
      border-radius: 12px;
      text-align: center;
    }

    .demo-content h2 {
      font-size: 2rem;
      margin-bottom: 20px;
      color: #333;
    }

    .demo-content p {
      font-size: 1.1rem;
      color: #666;
      margin-bottom: 10px;
    }

    @media (max-width: 768px) {
      .hero-section h1 {
        font-size: 2rem;
      }
      
      .hero-buttons {
        flex-direction: column;
        align-items: center;
      }
      
      .feature-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  currentTime: string = '';
  apiData: any = null;
  isServerRendered: boolean = false;

  constructor(
    private title: Title, 
    private meta: Meta,
    private state: TransferState,
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) {}

  ngOnInit() {
    // Set page title and meta tags for SEO
    this.title.setTitle('Angular SSR Demo - Home');
    this.meta.updateTag({ name: 'description', content: 'Experience Server-Side Rendering with Angular. Fast, SEO-friendly web applications.' });
    this.meta.updateTag({ name: 'keywords', content: 'Angular, SSR, Server-Side Rendering, SEO, Performance' });

    // Set current time (this will be different on server vs client)
    this.currentTime = new Date().toLocaleString();

    // Try to get API data from TransferState (SSR)
    if (this.state.hasKey(API_DATA_KEY)) {
      this.apiData = this.state.get(API_DATA_KEY, null);
      this.isServerRendered = true;
      console.log('✅ Data loaded from TransferState (SSR)');
    } else if (isPlatformBrowser(this.platformId)) {
      // Fallback to HTTP client if on browser and no TransferState data
      this.loadApiDataFromClient();
    }
  }

  private loadApiDataFromClient() {
    // Optional: Fallback to fetch from client if no SSR data
    this.http.get('https://jsonplaceholder.typicode.com/posts/1')
      .subscribe({
        next: (data) => {
          this.apiData = data;
          this.isServerRendered = false;
          console.log('✅ Data loaded from HTTP client (fallback)');
        },
        error: (error) => {
          console.error('❌ Failed to load API data:', error);
        }
      });
  }
} 