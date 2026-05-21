import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import connectDB from '../src/lib/db/mongodb';
import {
  User,
  Project,
  Service,
  TeamMember,
  Testimonial,
  Blog,
  Lead,
  Consultation,
  SeoSetting,
} from '../src/schemas';

async function seed() {
  try {
    await connectDB();

    await User.create({
      name: 'Admin User',
      email: 'admin@interiordesign.com',
      password: 'Admin@123',
      role: 'admin',
      phone: '+1-555-0100',
      isActive: true,
    });
    console.log('Seeded: 1 admin user');

    await Project.create(
      { title: 'Modern Minimalist Apartment', description: 'Complete redesign of a downtown apartment with minimalist aesthetic, neutral tones, and smart home integration.', category: 'residential' as const, status: 'published' as const, images: ['/images/projects/modern-apartment-1.jpg', '/images/projects/modern-apartment-2.jpg'], client: 'Sarah Johnson', location: 'New York, NY', year: 2024, tags: ['modern', 'minimalist', 'apartment'], featured: true },
      { title: 'Luxury Hotel Lobby', description: 'Full lobby renovation for a five-star boutique hotel featuring art deco influences and custom furniture.', category: 'hospitality' as const, status: 'published' as const, images: ['/images/projects/hotel-lobby-1.jpg', '/images/projects/hotel-lobby-2.jpg'], client: 'The Grand Hotel', location: 'Miami, FL', year: 2024, tags: ['luxury', 'hotel', 'hospitality'], featured: true },
      { title: 'Corporate Office Renovation', description: 'Open-plan office redesign with biophilic elements, collaboration zones, and executive suites.', category: 'office' as const, status: 'published' as const, images: ['/images/projects/corporate-office-1.jpg'], client: 'TechVista Inc.', location: 'San Francisco, CA', year: 2024, tags: ['corporate', 'office', 'biophilic'], featured: false },
      { title: 'Riverside Villa', description: 'Custom interior design for a riverside villa blending contemporary and rustic elements.', category: 'residential' as const, status: 'published' as const, images: ['/images/projects/riverside-villa-1.jpg', '/images/projects/riverside-villa-2.jpg', '/images/projects/riverside-villa-3.jpg'], client: 'Michael Chen', location: 'Portland, OR', year: 2023, tags: ['villa', 'contemporary', 'rustic'], featured: true },
      { title: 'Boutique Retail Store', description: 'Brand-aligned retail interior for a high-end fashion boutique with innovative display systems.', category: 'commercial' as const, status: 'published' as const, images: ['/images/projects/retail-store-1.jpg'], client: 'Maison Luxe', location: 'Los Angeles, CA', year: 2024, tags: ['retail', 'commercial', 'fashion'], featured: false },
      { title: 'Co-Working Space', description: 'Flexible co-working environment with dedicated desks, private offices, and communal lounges.', category: 'office' as const, status: 'published' as const, images: ['/images/projects/coworking-1.jpg', '/images/projects/coworking-2.jpg'], client: 'WorkHub Collective', location: 'Austin, TX', year: 2024, tags: ['coworking', 'office', 'flexible'], featured: false },
      { title: 'Farmhouse Kitchen', description: 'Warm and inviting farmhouse-style kitchen remodel with custom cabinetry and vintage fixtures.', category: 'residential' as const, status: 'published' as const, images: ['/images/projects/farmhouse-kitchen-1.jpg'], client: 'Emily & James Turner', location: 'Nashville, TN', year: 2023, tags: ['farmhouse', 'kitchen', 'residential'], featured: false },
      { title: 'Restaurant Interior Concept', description: 'Immersive dining experience design with ambient lighting, textured walls, and curated art.', category: 'hospitality' as const, status: 'draft' as const, images: ['/images/projects/restaurant-1.jpg'], client: 'Chef Marco Reyes', location: 'Chicago, IL', year: 2025, tags: ['restaurant', 'hospitality', 'dining'], featured: false },
    );
    console.log('Seeded: 8 projects');

    const services = [
      { title: 'Residential Design', description: 'Complete interior design solutions for homes and apartments, from concept to completion.', icon: '/icons/residential.svg', price: 'Starting at $5,000', features: ['Space planning', 'Color consultation', 'Furniture selection', 'Project management'], isActive: true, order: 1 },
      { title: 'Commercial Design', description: 'Strategic interior design for offices, retail spaces, and commercial properties.', icon: '/icons/commercial.svg', price: 'Starting at $10,000', features: ['Workplace strategy', 'Brand integration', 'Ergonomic solutions', 'Compliance & safety'], isActive: true, order: 2 },
      { title: 'Hospitality Design', description: 'Captivating environments for hotels, restaurants, and entertainment venues.', icon: '/icons/hospitality.svg', price: 'Custom quote', features: ['Theme development', 'Lighting design', 'FF&E procurement', 'Brand storytelling'], isActive: true, order: 3 },
      { title: 'Space Planning', description: 'Optimized floor plans and spatial arrangements for maximum functionality.', icon: '/icons/space-planning.svg', price: 'Starting at $2,500', features: ['Floor plan analysis', 'Traffic flow optimization', 'Furniture layout', 'Zoning solutions'], isActive: true, order: 4 },
      { title: 'Color Consultation', description: 'Expert color palette selection to set the perfect mood for any space.', icon: '/icons/color.svg', price: 'Starting at $800', features: ['Color psychology', 'Sample boards', 'Paint specification', 'Material coordination'], isActive: true, order: 5 },
      { title: 'Custom Furniture Design', description: 'Bespoke furniture pieces tailored to your space and style preferences.', icon: '/icons/furniture.svg', price: 'Custom quote', features: ['Custom dimensions', 'Material selection', 'Prototype development', 'Installation'], isActive: true, order: 6 },
    ];

    for (const s of services) {
      await Service.create(s);
    }
    console.log('Seeded: 6 services');

    const teamMembers = [
      { name: 'Priya Sharma', role: 'Lead Designer', bio: 'Over 15 years of experience in residential and hospitality design. Known for blending traditional elegance with modern sensibilities.', image: '/images/team/priya-sharma.jpg', email: 'priya@interiordesign.com', phone: '+1-555-0101', linkedin: 'https://linkedin.com/in/priyasharma', order: 1, isActive: true },
      { name: 'Marcus Webb', role: 'Senior Architect', bio: 'Licensed architect specializing in spatial planning and structural integration within interior environments.', image: '/images/team/marcus-webb.jpg', email: 'marcus@interiordesign.com', phone: '+1-555-0102', linkedin: 'https://linkedin.com/in/marcuswebb', twitter: 'https://twitter.com/marcuswebb', order: 2, isActive: true },
      { name: 'Aiko Tanaka', role: 'Interior Stylist', bio: 'Expert in color theory, textile selection, and accessory styling. Creates cohesive and photogenic spaces.', image: '/images/team/aiko-tanaka.jpg', email: 'aiko@interiordesign.com', phone: '+1-555-0103', linkedin: 'https://linkedin.com/in/aikotanaka', order: 3, isActive: true },
      { name: 'David Okafor', role: 'Project Manager', bio: 'Ensures every project stays on schedule, on budget, and exceeds client expectations.', image: '/images/team/david-okafor.jpg', email: 'david@interiordesign.com', phone: '+1-555-0104', order: 4, isActive: true },
      { name: 'Sofia Martinez', role: 'Junior Designer', bio: 'Rising talent with a fresh perspective on sustainable and eco-friendly interior design solutions.', image: '/images/team/sofia-martinez.jpg', email: 'sofia@interiordesign.com', phone: '+1-555-0105', order: 5, isActive: true },
    ];

    for (const m of teamMembers) {
      await TeamMember.create(m);
    }
    console.log('Seeded: 5 team members');

    const testimonials = [
      { name: 'Sarah Johnson', role: 'Homeowner', company: 'Johnson Residence', content: 'The team transformed our cramped apartment into a spacious, elegant home. Every detail was thoughtfully considered and beautifully executed.', rating: 5, approved: true },
      { name: 'Robert Chen', role: 'CEO', company: 'TechVista Inc.', content: 'Our office redesign boosted employee morale and productivity significantly. Professional, creative, and highly recommended.', rating: 5, approved: true },
      { name: 'Emily Turner', role: 'Homeowner', company: 'Turner Family', content: 'Our farmhouse kitchen is everything we dreamed of and more. The custom cabinetry and vintage touches make it truly unique.', rating: 5, approved: true },
      { name: 'Marco Reyes', role: 'Executive Chef', company: 'La Cucina', content: 'The restaurant interior perfectly captures our culinary philosophy. Our guests constantly compliment the ambiance.', rating: 4, approved: true },
    ];

    for (const t of testimonials) {
      await Testimonial.create(t);
    }
    console.log('Seeded: 4 testimonials');

    const blogs = [
      { title: 'Top 10 Interior Design Trends for 2025', slug: 'top-10-interior-design-trends-2025', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. The most anticipated interior design trends include biophilic design, warm minimalism, and bold color blocking. Sustainability continues to drive material choices, while smart home integration becomes seamless.', excerpt: 'Discover the most anticipated interior design trends shaping homes and commercial spaces this year.', featuredImage: '/images/blog/trends-2025.jpg', category: 'Trends', tags: ['trends', '2025', 'design'], author: 'Priya Sharma', status: 'published' as const, views: 1240 },
      { title: 'How to Choose the Perfect Color Palette', slug: 'how-to-choose-perfect-color-palette', content: 'Selecting the right color palette can transform any space. Start with a mood board, consider natural lighting, and test samples before committing. Neutrals provide versatility while accent colors add personality.', excerpt: 'A comprehensive guide to selecting colors that reflect your style and enhance your space.', featuredImage: '/images/blog/color-palette.jpg', category: 'Tips', tags: ['color', 'palette', 'tips'], author: 'Aiko Tanaka', status: 'published' as const, views: 980 },
      { title: 'Biophilic Design: Bringing Nature Indoors', slug: 'biophilic-design-bringing-nature-indoors', content: 'Biophilic design connects occupants with nature through natural light, plants, organic materials, and nature-inspired patterns. Studies show it reduces stress and improves cognitive function.', excerpt: 'Learn how integrating natural elements into your interiors can improve wellbeing and aesthetics.', featuredImage: '/images/blog/biophilic.jpg', category: 'Design Philosophy', tags: ['biophilic', 'nature', 'wellness'], author: 'Priya Sharma', status: 'published' as const, views: 756 },
      { title: 'Maximizing Small Spaces: Smart Design Strategies', slug: 'maximizing-small-spaces', content: 'Small spaces require creative solutions. Multi-functional furniture, vertical storage, mirrors, and light color schemes can make compact areas feel spacious and functional.', excerpt: 'Practical tips and tricks to make the most of every square foot in your home.', featuredImage: '/images/blog/small-spaces.jpg', category: 'Tips', tags: ['small spaces', 'storage', 'functional'], author: 'Marcus Webb', status: 'published' as const, views: 2103 },
      { title: 'The Art of Lighting in Interior Design', slug: 'art-of-lighting-interior-design', content: 'Lighting is the unsung hero of interior design. Layering ambient, task, and accent lighting creates depth and mood. Smart lighting systems offer unprecedented control.', excerpt: 'Explore how strategic lighting can dramatically alter the ambiance and functionality of any room.', featuredImage: '/images/blog/lighting.jpg', category: 'Design Principles', tags: ['lighting', 'ambiance', 'design'], author: 'David Okafor', status: 'published' as const, views: 634 },
      { title: 'Sustainable Materials for Modern Interiors', slug: 'sustainable-materials-modern-interiors', content: 'Eco-friendly materials like bamboo, reclaimed wood, recycled metal, and low-VOC paints are becoming mainstream. Sustainable design doesnt mean compromising on style.', excerpt: 'A look at eco-friendly materials that combine environmental responsibility with stunning aesthetics.', featuredImage: '/images/blog/sustainable.jpg', category: 'Sustainability', tags: ['sustainable', 'eco-friendly', 'materials'], author: 'Sofia Martinez', status: 'draft' as const, views: 0 },
    ];

    for (const b of blogs) {
      await Blog.create(b);
    }
    console.log('Seeded: 6 blogs');

    const leads = [
      { name: 'Alice Williams', email: 'alice@example.com', phone: '+1-555-0201', company: 'Williams Properties', message: 'Interested in a full residential design consultation for our new development project.', source: 'Website', status: 'new' as const },
      { name: 'Bob Thompson', email: 'bob@example.com', phone: '+1-555-0202', message: 'Looking for office redesign for our startup. We have 10 employees and need a creative workspace.', source: 'Referral', status: 'new' as const },
      { name: 'Carol Davis', email: 'carol@example.com', message: 'Need color consultation for our living room and dining area.', source: 'Instagram', status: 'contacted' as const },
      { name: 'Daniel Lee', email: 'daniel@example.com', phone: '+1-555-0204', company: 'Lee Enterprises', message: 'Interested in hospitality design for our new restaurant opening next quarter.', source: 'Website', status: 'qualified' as const },
      { name: 'Emma Garcia', email: 'emma@example.com', message: 'Please send me your portfolio and pricing for residential projects.', source: 'Google', status: 'new' as const },
      { name: 'Frank Miller', email: 'frank@example.com', phone: '+1-555-0206', company: 'Miller Constructions', message: 'We are building 5 luxury homes and need interior design partners.', source: 'LinkedIn', status: 'converted' as const },
      { name: 'Grace Kim', email: 'grace@example.com', phone: '+1-555-0207', message: 'Looking for custom furniture for our new apartment.', source: 'Website', status: 'contacted' as const },
      { name: 'Henry Brown', email: 'henry@example.com', company: 'Brown & Co.', message: 'Office space planning consultation for 50-person team relocation.', source: 'Referral', status: 'qualified' as const },
      { name: 'Ivy Martinez', email: 'ivy@example.com', message: 'Interested in biophilic design consultation for our corporate headquarters.', source: 'Google', status: 'new' as const },
      { name: 'Jack Wilson', email: 'jack@example.com', phone: '+1-555-0210', message: 'Need a complete home interior makeover. Approximately 3000 sq ft.', source: 'Instagram', status: 'new' as const },
    ];

    for (const l of leads) {
      await Lead.create(l);
    }
    console.log('Seeded: 10 leads');

    const consultations = [
      { name: 'Alice Williams', email: 'alice@example.com', phone: '+1-555-0201', serviceType: 'Residential Design', preferredDate: new Date('2025-06-15'), preferredTime: '10:00', message: 'Interested in full residential design for new development.', status: 'pending' as const },
      { name: 'Bob Thompson', email: 'bob@example.com', phone: '+1-555-0202', serviceType: 'Commercial Design', preferredDate: new Date('2025-06-20'), preferredTime: '14:00', message: 'Creative office space for startup.', status: 'confirmed' as const },
      { name: 'Carol Davis', email: 'carol@example.com', phone: '+1-555-0203', serviceType: 'Color Consultation', preferredDate: new Date('2025-06-18'), preferredTime: '11:00', status: 'pending' as const },
      { name: 'Daniel Lee', email: 'daniel@example.com', phone: '+1-555-0204', serviceType: 'Hospitality Design', preferredDate: new Date('2025-07-01'), preferredTime: '09:00', message: 'New restaurant interior design.', status: 'confirmed' as const },
      { name: 'Grace Kim', email: 'grace@example.com', phone: '+1-555-0207', serviceType: 'Custom Furniture Design', preferredDate: new Date('2025-06-22'), preferredTime: '15:00', status: 'completed' as const },
      { name: 'Ivy Martinez', email: 'ivy@example.com', phone: '+1-555-0209', serviceType: 'Space Planning', preferredDate: new Date('2025-07-05'), preferredTime: '10:30', message: 'Corporate headquarters space planning.', status: 'cancelled' as const },
    ];

    for (const c of consultations) {
      await Consultation.create(c);
    }
    console.log('Seeded: 6 consultations');

    const seoSettings = [
      { page: 'home', title: 'Elegant Interior Design | Transforming Spaces Since 2010', description: 'Premier interior design studio specializing in residential, commercial, and hospitality spaces. Expert designers bringing your vision to life.', keywords: ['interior design', 'home design', 'commercial interior design', 'interior decorator'], canonicalUrl: 'https://interiordesign.com' },
      { page: 'projects', title: 'Our Portfolio | Interior Design Projects', description: 'Browse our portfolio of residential, commercial, and hospitality interior design projects. See how we transform spaces.', keywords: ['design portfolio', 'interior projects', 'design gallery', 'room transformations'], canonicalUrl: 'https://interiordesign.com/projects' },
      { page: 'services', title: 'Interior Design Services | Full-Service Design Studio', description: 'Comprehensive interior design services including residential design, commercial design, space planning, color consultation, and custom furniture.', keywords: ['design services', 'interior design consultation', 'space planning', 'custom furniture'], canonicalUrl: 'https://interiordesign.com/services' },
      { page: 'about', title: 'About Us | Award-Winning Interior Design Team', description: 'Meet our team of experienced interior designers, architects, and stylists. Learn about our design philosophy and approach.', keywords: ['about interior design', 'design team', 'our story', 'design philosophy'], canonicalUrl: 'https://interiordesign.com/about' },
      { page: 'blog', title: 'Interior Design Blog | Tips, Trends & Inspiration', description: 'Stay inspired with our interior design blog featuring trends, tips, and insights from our expert design team.', keywords: ['design blog', 'interior tips', 'design trends', 'home inspiration'], canonicalUrl: 'https://interiordesign.com/blog' },
      { page: 'contact', title: 'Contact Us | Start Your Design Journey', description: 'Ready to transform your space? Contact our interior design team for a consultation. We serve clients nationwide.', keywords: ['contact interior designer', 'design consultation', 'get quote', 'book designer'], canonicalUrl: 'https://interiordesign.com/contact' },
    ];

    for (const seo of seoSettings) {
      await SeoSetting.create(seo);
    }
    console.log('Seeded: 6 SEO settings');

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
