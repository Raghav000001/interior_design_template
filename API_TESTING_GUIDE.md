# Interior Design Template - Backend API Testing Guide

A comprehensive Postman collection for testing all backend endpoints.

---

## Table of Contents

1. [Setup Instructions](#setup-instructions)
2. [Environment Variables](#environment-variables)
3. [Authentication Flow](#authentication-flow)
4. [Public Endpoints](#public-endpoints)
5. [Authenticated Endpoints](#authenticated-endpoints)
6. [Admin Only Endpoints](#admin-only-endpoints)
7. [Postman Collection Import](#postman-collection-import)

---

## Setup Instructions

### 1. Install Postman

Download and install [Postman](https://www.postman.com/downloads/).

### 2. Create Environment

1. Click **Environments** (top right corner)
2. Click **+** to create new environment
3. Name: `Interior Design API`
4. Add variables:

| Variable | Initial Value | Current Value |
|----------|--------------|---------------|
| `baseUrl` | `http://localhost:3000` | `http://localhost:3000` |
| `authToken` | `{{token}}` | `{{token}}` |
| `adminToken` | `{{adminToken}}` | `{{adminToken}}` |
| `userId` | `` | `` |
| `projectId` | `` | `` |
| `blogId` | `` | `` |
| `serviceId` | `` | `` |
| `testimonialId` | `` | `` |
| `teamMemberId` | `` | `` |
| `leadId` | `` | `` |
| `consultationId` | `` | `` |

### 3. Start Server

```bash
cd interior-design-template
npm run dev
```

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
# MongoDB
MONGODB_URI=mongodb+srv://your-connection-string

# NextAuth (generate with: openssl rand -base64 32)
AUTH_SECRET=your-auth-secret-here

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

---

## Authentication Flow

### Step 1: Register a User

**POST** `{{baseUrl}}/api/auth/register`

```json
{
  "name": "Admin User",
  "email": "admin@interior-design.com",
  "password": "Admin123!",
  "confirmPassword": "Admin123!"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Admin User",
    "email": "admin@interior-design.com",
    "role": "viewer"
  }
}
```

### Step 2: Manually Set Admin Role (Database)

Since there's no admin creation endpoint by default, manually update your user's role in MongoDB:

```javascript
// In MongoDB shell or Compass
db.users.updateOne(
  { email: "admin@interior-design.com" },
  { $set: { role: "admin" } }
)
```

### Step 3: Login to Get Token

**POST** `{{baseUrl}}/api/auth/[...nextauth]`

```json
{
  "email": "admin@interior-design.com",
  "password": "Admin123!"
}
```

**Response (200):**
```json
{
  "user": {
    "id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Admin User",
    "email": "admin@interior-design.com",
    "role": "admin"
  },
  "expires": "2024-12-31T23:59:59.999Z"
}
```

The token is automatically set in cookies for server-side sessions.

---

## Public Endpoints

### Projects

#### GET /api/projects - List All Projects

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 1 | Page number |
| `limit` | number | 10 | Items per page |
| `search` | string | - | Search in title/description |
| `category` | string | - | residential/commercial/office/hospitality |
| `status` | string | - | draft/published/archived |
| `featured` | boolean | - | true/false |
| `sort` | string | createdAt | Sort field |
| `order` | string | desc | asc/desc |

**Example:** `GET {{baseUrl}}/api/projects?page=1&limit=10&category=residential`

**Response (200):**
```json
{
  "success": true,
  "message": "Resources retrieved successfully",
  "data": [...],
  "meta": {
    "page": 1,
    "limit": 10,
    "totalDocs": 25,
    "totalPages": 3,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

#### GET /api/projects/:id - Get Single Project

**Example:** `GET {{baseUrl}}/api/projects/64f1a2b3c4d5e6f7a8b9c0d1`

### Services

#### GET /api/services - List All Services

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 1 | Page number |
| `limit` | number | 10 | Items per page |
| `search` | string | - | Search in title/description |
| `isActive` | boolean | - | true/false |
| `sort` | string | order | Sort field |
| `order` | string | asc | asc/desc |

**Example:** `GET {{baseUrl}}/api/services?isActive=true`

### Blogs

#### GET /api/blogs - List All Blogs

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 1 | Page number |
| `limit` | number | 10 | Items per page |
| `search` | string | - | Search in title/content |
| `category` | string | - | Blog category |
| `status` | string | - | draft/published/archived |
| `tag` | string | - | Filter by tag |
| `sort` | string | createdAt | Sort field |
| `order` | string | desc | asc/desc |

**Example:** `GET {{baseUrl}}/api/blogs?status=published&category=Design Tips`

### Testimonials

#### GET /api/testimonials - List All Testimonials

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 1 | Page number |
| `limit` | number | 10 | Items per page |
| `approved` | boolean | - | true/false |
| `sort` | string | createdAt | Sort field |
| `order` | string | desc | asc/desc |

**Example:** `GET {{baseUrl}}/api/testimonials?approved=true`

#### POST /api/testimonials - Submit Testimonial (Public)

```json
{
  "name": "John Smith",
  "role": "Homeowner",
  "company": "ABC Corp",
  "content": "Absolutely stunning interior design! The team transformed our living space beautifully.",
  "rating": 5
}
```

### Team

#### GET /api/team - List Team Members

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 1 | Page number |
| `limit` | number | 10 | Items per page |
| `isActive` | boolean | - | true/false |
| `sort` | string | order | Sort field |
| `order` | string | asc | asc/desc |

**Example:** `GET {{baseUrl}}/api/team?isActive=true`

### Lead Collection

#### POST /api/leads - Submit Lead (Public)

```json
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "phone": "+1 234 567 8900",
  "company": "Doe Industries",
  "message": "I'm interested in renovating my office space. Looking for a modern aesthetic.",
  "source": "website"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Lead submitted successfully",
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "status": "new",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### Consultation Booking

#### POST /api/consultations - Book Consultation (Public)

```json
{
  "name": "Robert Johnson",
  "email": "robert.j@company.com",
  "phone": "+1 555 123 4567",
  "serviceType": "Kitchen Renovation",
  "preferredDate": "2024-02-15",
  "preferredTime": "10:00 AM",
  "message": "Looking to completely remodel our kitchen with a modern, open-concept design.",
  "address": "123 Main Street, New York, NY 10001"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Consultation booked successfully",
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Robert Johnson",
    "status": "pending",
    "preferredDate": "2024-02-15T00:00:00.000Z"
  }
}
```

### SEO

#### GET /api/seo - List SEO Settings

**Example:** `GET {{baseUrl}}/api/seo`

---

## Authenticated Endpoints

For authenticated requests, include the JWT token in cookies (handled by NextAuth) or Authorization header:

```
Authorization: Bearer {{authToken}}
```

### Projects

#### POST /api/projects - Create Project

```json
{
  "title": "Modern Living Room Redesign",
  "description": "A complete redesign of a 2-bedroom apartment living room with modern minimalist aesthetics.",
  "category": "residential",
  "status": "published",
  "images": [
    "https://res.cloudinary.com/example/image1.jpg",
    "https://res.cloudinary.com/example/image2.jpg"
  ],
  "client": "Sarah Mitchell",
  "location": "Manhattan, New York",
  "year": 2024,
  "tags": ["modern", "minimalist", "living room"],
  "featured": true
}
```

#### PUT /api/projects/:id - Update Project

```json
{
  "title": "Modern Living Room Redesign - Updated",
  "status": "archived"
}
```

#### DELETE /api/projects/:id - Delete Project

**Note:** Requires admin role.

### Services

#### POST /api/services - Create Service

```json
{
  "title": "Complete Home Renovation",
  "description": "Full-scale renovation services for residential properties including design, construction, and finishing.",
  "icon": "home",
  "price": "Starting at $50,000",
  "features": [
    "Complete space planning",
    "3D design visualization",
    "Project management",
    "Quality materials sourcing",
    "Timeline guarantee"
  ],
  "isActive": true,
  "order": 1
}
```

### Blogs

#### POST /api/blogs - Create Blog

```json
{
  "title": "10 Interior Design Trends for 2024",
  "slug": "interior-design-trends-2024",
  "content": "Full blog content goes here...",
  "excerpt": "Discover the top interior design trends that will define 2024.",
  "featuredImage": "https://res.cloudinary.com/example/blog-image.jpg",
  "category": "Design Trends",
  "tags": ["trends", "2024", "design", "interior"],
  "author": "Design Team",
  "status": "published"
}
```

**Note:** Slug must be unique.

### Team

#### POST /api/team - Add Team Member

```json
{
  "name": "Emily Chen",
  "role": "Senior Interior Designer",
  "bio": "With over 10 years of experience, Emily specializes in luxury residential projects.",
  "image": "https://res.cloudinary.com/example/emily.jpg",
  "email": "emily.chen@interiordesign.com",
  "phone": "+1 555 987 6543",
  "linkedin": "https://linkedin.com/in/emilychen",
  "twitter": "https://twitter.com/emilychen",
  "order": 1,
  "isActive": true
}
```

### Leads

#### GET /api/leads - List All Leads

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 1 | Page number |
| `limit` | number | 10 | Items per page |
| `search` | string | - | Search in name/email/company |
| `status` | string | - | new/contacted/qualified/converted |
| `sort` | string | createdAt | Sort field |
| `order` | string | desc | asc/desc |

### Consultations

#### GET /api/consultations - List All Consultations

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 1 | Page number |
| `limit` | number | 10 | Items per page |
| `search` | string | - | Search in name/email/phone |
| `status` | string | - | pending/confirmed/completed/cancelled |
| `date` | string | - | Filter by specific date |
| `sort` | string | preferredDate | Sort field |
| `order` | string | asc | asc/desc |

---

## Admin Only Endpoints

All DELETE operations and some update operations require admin role.

### Projects

#### PUT /api/projects/:id - Update Project (Admin)

#### DELETE /api/projects/:id - Delete Project (Admin)

### Services

#### PUT /api/services/:id - Update Service (Admin)

#### DELETE /api/services/:id - Delete Service (Admin)

### Blogs

#### PUT /api/blogs/:id - Update Blog (Admin)

#### DELETE /api/blogs/:id - Delete Blog (Admin)

### Testimonials

#### PUT /api/testimonials/:id - Update Testimonial (Admin)

```json
{
  "approved": true,
  "rating": 5
}
```

#### DELETE /api/testimonials/:id - Delete Testimonial (Admin)

### Team

#### PUT /api/team/:id - Update Team Member (Admin)

#### DELETE /api/team/:id - Delete Team Member (Admin)

### Leads

#### PUT /api/leads/:id - Update Lead (Admin)

```json
{
  "status": "qualified",
  "notes": "High priority lead. Interested in full home renovation."
}
```

#### DELETE /api/leads/:id - Delete Lead (Admin)

### Consultations

#### PUT /api/consultations/:id - Update Consultation (Admin)

```json
{
  "status": "confirmed",
  "notes": "Confirmed for February 15th at 10:00 AM",
  "assignedTo": "Emily Chen"
}
```

#### DELETE /api/consultations/:id - Delete Consultation (Admin)

### SEO

#### POST /api/seo - Create SEO Settings (Admin)

```json
{
  "page": "home",
  "title": "Premium Interior Design Services | Modern Living Spaces",
  "description": "Transform your space with our expert interior design services. Residential, commercial, and office design solutions.",
  "keywords": ["interior design", "home renovation", "commercial design", "modern interiors"],
  "ogImage": "https://res.cloudinary.com/example/og-image.jpg",
  "canonicalUrl": "https://yourwebsite.com"
}
```

#### PUT /api/seo/:page - Update SEO Settings (Admin)

#### DELETE /api/seo/:page - Delete SEO Settings (Admin)

### File Upload

#### POST /api/uploads - Upload to Cloudinary (Admin)

**Body:** `multipart/form-data`

| Field | Type | Description |
|-------|------|-------------|
| `file` | File | Image or file to upload |
| `folder` | string | Cloudinary folder (optional, default: interior-design) |

**Response (201):**
```json
{
  "success": true,
  "message": "File uploaded successfully",
  "data": {
    "public_id": "interior-design/sample-image123",
    "secure_url": "https://res.cloudinary.com/demo/image/upload/v1234/sample-image123.jpg",
    "format": "jpg",
    "width": 1920,
    "height": 1080,
    "bytes": 245678,
    "resource_type": "image"
  }
}
```

### Dashboard Statistics

#### GET /api/dashboard/statistics - Get Dashboard Stats (Admin)

**Response (200):**
```json
{
  "success": true,
  "message": "Dashboard statistics retrieved successfully",
  "data": {
    "totalProjects": 45,
    "totalBlogs": 28,
    "totalLeads": 156,
    "totalConsultations": 67,
    "recentLeads": [...],
    "recentConsultations": [...],
    "projectsByCategory": {
      "residential": 25,
      "commercial": 12,
      "office": 5,
      "hospitality": 3
    },
    "leadsByStatus": {
      "new": 45,
      "contacted": 60,
      "qualified": 35,
      "converted": 16
    }
  }
}
```

---

## Postman Collection Import

Copy and save this JSON as `postman-collection.json`, then import in Postman:

```json
{
  "info": {
    "name": "Interior Design API",
    "description": "Complete API testing collection for Interior Design Template Backend",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:3000"
    }
  ],
  "item": [
    {
      "name": "Public Endpoints",
      "item": [
        {
          "name": "Projects",
          "item": [
            {
              "name": "List Projects",
              "request": {
                "method": "GET",
                "url": {
                  "raw": "{{baseUrl}}/api/projects?page=1&limit=10",
                  "host": ["{{baseUrl}}"],
                  "path": ["api", "projects"],
                  "query": [
                    { "key": "page", "value": "1" },
                    { "key": "limit", "value": "10" }
                  ]
                }
              }
            },
            {
              "name": "List Projects (Filtered)",
              "request": {
                "method": "GET",
                "url": {
                  "raw": "{{baseUrl}}/api/projects?category=residential&status=published",
                  "host": ["{{baseUrl}}"],
                  "path": ["api", "projects"],
                  "query": [
                    { "key": "category", "value": "residential" },
                    { "key": "status", "value": "published" }
                  ]
                }
              }
            }
          ]
        },
        {
          "name": "Services - List",
          "request": {
            "method": "GET",
            "url": {
              "raw": "{{baseUrl}}/api/services",
              "host": ["{{baseUrl}}"],
              "path": ["api", "services"]
            }
          }
        },
        {
          "name": "Blogs - List",
          "request": {
            "method": "GET",
            "url": {
              "raw": "{{baseUrl}}/api/blogs",
              "host": ["{{baseUrl}}"],
              "path": ["api", "blogs"]
            }
          }
        },
        {
          "name": "Testimonials - List",
          "request": {
            "method": "GET",
            "url": {
              "raw": "{{baseUrl}}/api/testimonials",
              "host": ["{{baseUrl}}"],
              "path": ["api", "testimonials"]
            }
          }
        },
        {
          "name": "Team - List",
          "request": {
            "method": "GET",
            "url": {
              "raw": "{{baseUrl}}/api/team",
              "host": ["{{baseUrl}}"],
              "path": ["api", "team"]
            }
          }
        }
      ]
    },
    {
      "name": "Lead Collection (Public)",
      "item": [
        {
          "name": "Submit Lead",
          "request": {
            "method": "POST",
            "url": {
              "raw": "{{baseUrl}}/api/leads",
              "host": ["{{baseUrl}}"],
              "path": ["api", "leads"]
            },
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"Jane Doe\",\n  \"email\": \"jane.doe@example.com\",\n  \"phone\": \"+1 234 567 8900\",\n  \"company\": \"Doe Industries\",\n  \"message\": \"I'm interested in renovating my office space.\",\n  \"source\": \"website\"\n}"
            }
          }
        }
      ]
    },
    {
      "name": "Consultation Booking (Public)",
      "item": [
        {
          "name": "Book Consultation",
          "request": {
            "method": "POST",
            "url": {
              "raw": "{{baseUrl}}/api/consultations",
              "host": ["{{baseUrl}}"],
              "path": ["api", "consultations"]
            },
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"Robert Johnson\",\n  \"email\": \"robert.j@company.com\",\n  \"phone\": \"+1 555 123 4567\",\n  \"serviceType\": \"Kitchen Renovation\",\n  \"preferredDate\": \"2024-02-15\",\n  \"preferredTime\": \"10:00 AM\",\n  \"message\": \"Looking to completely remodel our kitchen.\",\n  \"address\": \"123 Main Street, New York, NY 10001\"\n}"
            }
          }
        }
      ]
    },
    {
      "name": "Testimonial Submission (Public)",
      "item": [
        {
          "name": "Submit Testimonial",
          "request": {
            "method": "POST",
            "url": {
              "raw": "{{baseUrl}}/api/testimonials",
              "host": ["{{baseUrl}}"],
              "path": ["api", "testimonials"]
            },
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"John Smith\",\n  \"role\": \"Homeowner\",\n  \"company\": \"ABC Corp\",\n  \"content\": \"Absolutely stunning interior design!\",\n  \"rating\": 5\n}"
            }
          }
        }
      ]
    },
    {
      "name": "Authentication",
      "item": [
        {
          "name": "Register User",
          "request": {
            "method": "POST",
            "url": {
              "raw": "{{baseUrl}}/api/auth/register",
              "host": ["{{baseUrl}}"],
              "path": ["api", "auth", "register"]
            },
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"Admin User\",\n  \"email\": \"admin@interior-design.com\",\n  \"password\": \"Admin123!\",\n  \"confirmPassword\": \"Admin123!\"\n}"
            }
          }
        },
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "url": {
              "raw": "{{baseUrl}}/api/auth/signin",
              "host": ["{{baseUrl}}"],
              "path": ["api", "auth", "signin"]
            },
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"admin@interior-design.com\",\n  \"password\": \"Admin123!\"\n}"
            }
          }
        }
      ]
    },
    {
      "name": "Admin - Projects",
      "item": [
        {
          "name": "Create Project",
          "request": {
            "method": "POST",
            "url": {
              "raw": "{{baseUrl}}/api/projects",
              "host": ["{{baseUrl}}"],
              "path": ["api", "projects"]
            },
            "body": {
              "mode": "raw",
              "raw": "{\n  \"title\": \"Modern Living Room Redesign\",\n  \"description\": \"A complete redesign of a 2-bedroom apartment living room.\",\n  \"category\": \"residential\",\n  \"status\": \"published\",\n  \"images\": [\"https://example.com/image1.jpg\"],\n  \"client\": \"Sarah Mitchell\",\n  \"location\": \"Manhattan, New York\",\n  \"year\": 2024,\n  \"tags\": [\"modern\", \"minimalist\", \"living room\"],\n  \"featured\": true\n}"
            }
          }
        },
        {
          "name": "Update Project",
          "request": {
            "method": "PUT",
            "url": {
              "raw": "{{baseUrl}}/api/projects/{{projectId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "projects", "{{projectId}}"]
            },
            "body": {
              "mode": "raw",
              "raw": "{\n  \"title\": \"Updated Project Title\",\n  \"status\": \"archived\"\n}"
            }
          }
        },
        {
          "name": "Delete Project",
          "request": {
            "method": "DELETE",
            "url": {
              "raw": "{{baseUrl}}/api/projects/{{projectId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "projects", "{{projectId}}"]
            }
          }
        }
      ]
    },
    {
      "name": "Admin - Services",
      "item": [
        {
          "name": "Create Service",
          "request": {
            "method": "POST",
            "url": {
              "raw": "{{baseUrl}}/api/services",
              "host": ["{{baseUrl}}"],
              "path": ["api", "services"]
            },
            "body": {
              "mode": "raw",
              "raw": "{\n  \"title\": \"Complete Home Renovation\",\n  \"description\": \"Full-scale renovation services.\",\n  \"icon\": \"home\",\n  \"price\": \"Starting at $50,000\",\n  \"features\": [\"Space planning\", \"3D visualization\", \"Project management\"],\n  \"isActive\": true,\n  \"order\": 1\n}"
            }
          }
        }
      ]
    },
    {
      "name": "Admin - Blogs",
      "item": [
        {
          "name": "Create Blog",
          "request": {
            "method": "POST",
            "url": {
              "raw": "{{baseUrl}}/api/blogs",
              "host": ["{{baseUrl}}"],
              "path": ["api", "blogs"]
            },
            "body": {
              "mode": "raw",
              "raw": "{\n  \"title\": \"10 Interior Design Trends for 2024\",\n  \"slug\": \"interior-design-trends-2024\",\n  \"content\": \"Full blog content goes here...\",\n  \"excerpt\": \"Discover the top interior design trends.\",\n  \"category\": \"Design Trends\",\n  \"tags\": [\"trends\", \"2024\", \"design\"],\n  \"author\": \"Design Team\",\n  \"status\": \"published\"\n}"
            }
          }
        }
      ]
    },
    {
      "name": "Admin - Testimonials",
      "item": [
        {
          "name": "Approve Testimonial",
          "request": {
            "method": "PUT",
            "url": {
              "raw": "{{baseUrl}}/api/testimonials/{{testimonialId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "testimonials", "{{testimonialId}}"]
            },
            "body": {
              "mode": "raw",
              "raw": "{\n  \"approved\": true\n}"
            }
          }
        }
      ]
    },
    {
      "name": "Admin - Team",
      "item": [
        {
          "name": "Add Team Member",
          "request": {
            "method": "POST",
            "url": {
              "raw": "{{baseUrl}}/api/team",
              "host": ["{{baseUrl}}"],
              "path": ["api", "team"]
            },
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"Emily Chen\",\n  \"role\": \"Senior Interior Designer\",\n  \"bio\": \"With over 10 years of experience.\",\n  \"email\": \"emily.chen@interiordesign.com\",\n  \"order\": 1,\n  \"isActive\": true\n}"
            }
          }
        }
      ]
    },
    {
      "name": "Admin - Leads Management",
      "item": [
        {
          "name": "List All Leads",
          "request": {
            "method": "GET",
            "url": {
              "raw": "{{baseUrl}}/api/leads?status=new",
              "host": ["{{baseUrl}}"],
              "path": ["api", "leads"],
              "query": [
                { "key": "status", "value": "new" }
              ]
            }
          }
        },
        {
          "name": "Update Lead Status",
          "request": {
            "method": "PUT",
            "url": {
              "raw": "{{baseUrl}}/api/leads/{{leadId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "leads", "{{leadId}}"]
            },
            "body": {
              "mode": "raw",
              "raw": "{\n  \"status\": \"qualified\",\n  \"notes\": \"High priority lead\"\n}"
            }
          }
        }
      ]
    },
    {
      "name": "Admin - Consultations Management",
      "item": [
        {
          "name": "List All Consultations",
          "request": {
            "method": "GET",
            "url": {
              "raw": "{{baseUrl}}/api/consultations?status=pending",
              "host": ["{{baseUrl}}"],
              "path": ["api", "consultations"],
              "query": [
                { "key": "status", "value": "pending" }
              ]
            }
          }
        },
        {
          "name": "Confirm Consultation",
          "request": {
            "method": "PUT",
            "url": {
              "raw": "{{baseUrl}}/api/consultations/{{consultationId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "consultations", "{{consultationId}}"]
            },
            "body": {
              "mode": "raw",
              "raw": "{\n  \"status\": \"confirmed\",\n  \"notes\": \"Confirmed for February 15th\",\n  \"assignedTo\": \"Emily Chen\"\n}"
            }
          }
        }
      ]
    },
    {
      "name": "Admin - SEO Management",
      "item": [
        {
          "name": "Create SEO Settings",
          "request": {
            "method": "POST",
            "url": {
              "raw": "{{baseUrl}}/api/seo",
              "host": ["{{baseUrl}}"],
              "path": ["api", "seo"]
            },
            "body": {
              "mode": "raw",
              "raw": "{\n  \"page\": \"home\",\n  \"title\": \"Premium Interior Design Services\",\n  \"description\": \"Transform your space with our expert services.\",\n  \"keywords\": [\"interior design\", \"home renovation\"],\n  \"ogImage\": \"https://example.com/og-image.jpg\"\n}"
            }
          }
        }
      ]
    },
    {
      "name": "Admin - Dashboard",
      "item": [
        {
          "name": "Get Statistics",
          "request": {
            "method": "GET",
            "url": {
              "raw": "{{baseUrl}}/api/dashboard/statistics",
              "host": ["{{baseUrl}}"],
              "path": ["api", "dashboard", "statistics"]
            }
          }
        }
      ]
    }
  ]
}
```

---

## Testing Checklist

Use this checklist to verify all endpoints:

### Authentication
- [ ] Register new user
- [ ] Login with valid credentials
- [ ] Login with invalid credentials (should fail)
- [ ] Access protected endpoint without token (should fail 401)
- [ ] Access admin endpoint with non-admin user (should fail 403)

### CRUD Operations
- [ ] Create resource with valid data
- [ ] Create resource with invalid data (should fail 400)
- [ ] List resources with pagination
- [ ] List resources with filters
- [ ] Get single resource
- [ ] Update resource
- [ ] Delete resource (admin only)

### Validation
- [ ] Submit form with missing required fields
- [ ] Submit form with invalid email format
- [ ] Submit form with password less than 8 characters
- [ ] Submit duplicate slug (should fail 409)
- [ ] Submit with invalid ObjectId format (should fail 400)

### Pagination & Filtering
- [ ] Test pagination with `page` and `limit`
- [ ] Test search functionality
- [ ] Test category filter
- [ ] Test status filter
- [ ] Test sort with `asc` and `desc`
- [ ] Verify pagination meta in response

### Error Handling
- [ ] Test with invalid JWT token (should return 401)
- [ ] Test with expired token (should return 401)
- [ ] Test non-existent resource (should return 404)
- [ ] Test duplicate creation (should return 409)

---

## Common Issues

### 1. "Access denied. No token provided"

Make sure you're authenticated. Login first and the session cookie will be set automatically.

### 2. "Access denied. Admin privileges required"

The user role is not set to "admin" in the database. Manually update via MongoDB:

```javascript
db.users.updateOne(
  { email: "admin@interior-design.com" },
  { $set: { role: "admin" } }
)
```

### 3. "Validation failed"

Check the request body against the Zod schema. All required fields must be present with correct types.

### 4. "MongoDB connection error"

Ensure `MONGODB_URI` is set in your `.env.local` file and the database cluster is accessible.

---

## API Response Formats

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... }
}
```

### Paginated Response
```json
{
  "success": true,
  "message": "Resources retrieved successfully",
  "data": [ ... ],
  "meta": {
    "page": 1,
    "limit": 10,
    "totalDocs": 100,
    "totalPages": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": {
    "fieldName": "Error message"
  }
}
```

---

## Rate Limiting

The API implements rate limiting at 100 requests per 15 minutes per IP address.

**Response headers:**
- `X-RateLimit-Limit`: 100
- `X-RateLimit-Remaining`: 95
- `X-RateLimit-Reset`: 1705329600

**When limit exceeded (429):**
```json
{
  "success": false,
  "message": "Too many requests, please try again later."
}
```

---

## Next Steps

1. Create a Postman account
2. Import the collection JSON
3. Set up the environment
4. Register your first admin user
5. Update the role in MongoDB
6. Login and start testing

Happy testing!