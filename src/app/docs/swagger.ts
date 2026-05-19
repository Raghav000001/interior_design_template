import SwaggerJsDoc from 'swagger-jsdoc';

const options: SwaggerJsDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Interior Design Template API',
      version: '1.0.0',
      description: 'API documentation for the premium interior design website backend',
      contact: {
        name: 'API Support',
      },
    },
    servers: [
      {
        url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string' },
            errors: { type: 'object' },
          },
        },
        PaginationMeta: {
          type: 'object',
          properties: {
            page: { type: 'integer' },
            limit: { type: 'integer' },
            totalDocs: { type: 'integer' },
            totalPages: { type: 'integer' },
            hasNextPage: { type: 'boolean' },
            hasPrevPage: { type: 'boolean' },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
    tags: [
      { name: 'Auth', description: 'Authentication endpoints' },
      { name: 'Projects', description: 'Project management' },
      { name: 'Services', description: 'Services management' },
      { name: 'Blogs', description: 'Blog management' },
      { name: 'Testimonials', description: 'Testimonial management' },
      { name: 'Team', description: 'Team member management' },
      { name: 'Leads', description: 'Lead collection' },
      { name: 'Consultations', description: 'Consultation booking' },
      { name: 'SEO', description: 'SEO settings management' },
      { name: 'Uploads', description: 'File upload management' },
      { name: 'Dashboard', description: 'Dashboard statistics' },
    ],
  },
  apis: [],
};

export const swaggerSpec = SwaggerJsDoc(options);