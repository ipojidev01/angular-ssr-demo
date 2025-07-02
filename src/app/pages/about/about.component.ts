import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="about-container">
      <header class="about-header">
        <h1>About Angular SSR Demo</h1>
        <p class="lead">Learn how Server-Side Rendering enhances your Angular applications</p>
      </header>

      <section class="content-section">
        <h2>What is Server-Side Rendering?</h2>
        <p>
          Server-Side Rendering (SSR) is a technique that renders your Angular application on the server 
          before sending it to the client. This approach provides several benefits:
        </p>
        
        <div class="benefits-list">
          <div class="benefit-item">
            <h3>🚀 Faster Initial Load</h3>
            <p>Users see content immediately without waiting for JavaScript to load and execute.</p>
          </div>
          
          <div class="benefit-item">
            <h3>🔍 Better SEO</h3>
            <p>Search engines can crawl and index your content more effectively.</p>
          </div>
          
          <div class="benefit-item">
            <h3>📱 Improved Performance</h3>
            <p>Better Core Web Vitals scores and user experience metrics.</p>
          </div>
          
          <div class="benefit-item">
            <h3>🌐 Universal Compatibility</h3>
            <p>Works on devices with limited JavaScript support.</p>
          </div>
        </div>
      </section>

      <section class="content-section">
        <h2>How It Works</h2>
        <div class="process-steps">
          <div class="step">
            <div class="step-number">1</div>
            <h3>Server Request</h3>
            <p>User requests a page from your server</p>
          </div>
          
          <div class="step">
            <div class="step-number">2</div>
            <h3>Server Rendering</h3>
            <p>Angular renders the page on the server</p>
          </div>
          
          <div class="step">
            <div class="step-number">3</div>
            <h3>HTML Response</h3>
            <p>Server sends pre-rendered HTML to the client</p>
          </div>
          
          <div class="step">
            <div class="step-number">4</div>
            <h3>Hydration</h3>
            <p>Client-side JavaScript takes over for interactivity</p>
          </div>
        </div>
      </section>

      <section class="content-section">
        <h2>Technical Details</h2>
        <div class="tech-details">
          <div class="tech-card">
            <h3>Angular Universal</h3>
            <p>The official Angular SSR solution that enables server-side rendering.</p>
          </div>
          
          <div class="tech-card">
            <h3>Express.js Server</h3>
            <p>Node.js server that handles SSR requests and serves static files.</p>
          </div>
          
          <div class="tech-card">
            <h3>Hydration</h3>
            <p>Process where client-side JavaScript takes over the server-rendered content.</p>
          </div>
        </div>
      </section>

      <section class="cta-section">
        <h2>Ready to Explore?</h2>
        <p>Check out our products page to see SSR in action with dynamic content.</p>
        <a routerLink="/products" class="btn btn-primary">View Products</a>
      </section>
    </div>
  `,
  styles: [`
    .about-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 20px;
    }

    .about-header {
      text-align: center;
      padding: 60px 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 12px;
      margin-bottom: 40px;
    }

    .about-header h1 {
      font-size: 3rem;
      margin-bottom: 20px;
      font-weight: 700;
    }

    .lead {
      font-size: 1.3rem;
      opacity: 0.9;
    }

    .content-section {
      margin-bottom: 50px;
    }

    .content-section h2 {
      font-size: 2.5rem;
      margin-bottom: 30px;
      color: #333;
      text-align: center;
    }

    .content-section p {
      font-size: 1.1rem;
      line-height: 1.7;
      color: #666;
      margin-bottom: 30px;
    }

    .benefits-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
      margin-top: 30px;
    }

    .benefit-item {
      background: white;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      text-align: center;
    }

    .benefit-item h3 {
      font-size: 1.3rem;
      margin-bottom: 15px;
      color: #333;
    }

    .benefit-item p {
      color: #666;
      line-height: 1.6;
    }

    .process-steps {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 30px;
      margin-top: 30px;
    }

    .step {
      text-align: center;
      position: relative;
    }

    .step-number {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: bold;
      margin: 0 auto 20px;
    }

    .step h3 {
      font-size: 1.2rem;
      margin-bottom: 10px;
      color: #333;
    }

    .step p {
      color: #666;
      font-size: 0.95rem;
    }

    .tech-details {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
      margin-top: 30px;
    }

    .tech-card {
      background: #f8f9fa;
      padding: 30px;
      border-radius: 12px;
      border-left: 4px solid #667eea;
    }

    .tech-card h3 {
      font-size: 1.3rem;
      margin-bottom: 15px;
      color: #333;
    }

    .tech-card p {
      color: #666;
      line-height: 1.6;
    }

    .cta-section {
      text-align: center;
      padding: 60px 20px;
      background: #f8f9fa;
      border-radius: 12px;
      margin-top: 50px;
    }

    .cta-section h2 {
      font-size: 2.5rem;
      margin-bottom: 20px;
      color: #333;
    }

    .cta-section p {
      font-size: 1.2rem;
      color: #666;
      margin-bottom: 30px;
    }

    .btn {
      display: inline-block;
      padding: 15px 30px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 1.1rem;
      transition: all 0.3s ease;
    }

    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(102, 126, 234, 0.3);
    }

    @media (max-width: 768px) {
      .about-header h1 {
        font-size: 2rem;
      }
      
      .content-section h2 {
        font-size: 2rem;
      }
      
      .process-steps {
        grid-template-columns: 1fr;
      }
      
      .tech-details {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AboutComponent implements OnInit {
  constructor(private title: Title, private meta: Meta) {}

  ngOnInit() {
    // Set page title and meta tags for SEO
    this.title.setTitle('About - Angular SSR Demo');
    this.meta.updateTag({ name: 'description', content: 'Learn about Server-Side Rendering with Angular and how it improves performance and SEO.' });
    this.meta.updateTag({ name: 'keywords', content: 'Angular SSR, Server-Side Rendering, SEO, Performance, Angular Universal' });
  }
} 