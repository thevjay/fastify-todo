const { createApp } = require('../src/app');

describe('Fastify App Tests', () => {
  let app;

  beforeAll(async () => {
    process.env.NODE_ENV = 'test';

    app = await createApp();
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test('GET /health should return 200', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/health'
    });

    expect(response.statusCode).toBe(200);

    const body = JSON.parse(response.payload);

    expect(body.status).toBe('OK');
  });


//   // Test register endpoint
//   test('POST /api/v1/auth/register should create user', async () => {
//     const userData = {
//       name: 'Test User',
//       email: `test${Date.now()}@example.com`,
//       password: '123456'
//     };

//     const response = await fastify.inject({
//       method: 'POST',
//       url: '/api/v1/auth/register',
//       payload: userData,
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });

//     expect(response.statusCode).toBe(201);
//     const body = JSON.parse(response.payload);
//     expect(body.success).toBe(true);
//     expect(body.data).toHaveProperty('token');
//   });

//   // Test login endpoint
//   test('POST /api/v1/auth/login should return token', async () => {
//     // First create a user
//     const email = `test${Date.now()}@example.com`;
    
//     // await fastify.inject({
//     //   method: 'POST',
//     //   url: '/api/v1/auth/register',
//     //   payload: {
//     //     name: 'Login Test',
//     //     email: email,
//     //     password: '123456'
//     //   }
//     // });

//     // Then login
//     const response = await fastify.inject({
//       method: 'POST',
//       url: '/api/v1/auth/login',
//       payload: {
//         email: email,
//         password: '123456'
//       }
//     });

//     expect(response.statusCode).toBe(200);
//     const body = JSON.parse(response.payload);
//     expect(body.data).toHaveProperty('token');
//   });

  // Test create todo (with auth)
//   test('POST /api/todos should create todo with valid token', async () => {
//     // First create user and get token
//     const email = `todo${Date.now()}@example.com`;
    
//     const registerRes = await fastify.inject({
//       method: 'POST',
//       url: '/api/auth/register',
//       payload: {
//         name: 'Todo Test',
//         email: email,
//         password: '123456'
//       }
//     });
    
//     const registerBody = JSON.parse(registerRes.payload);
//     const token = registerBody.data.token;

//     // Create todo
//     const response = await fastify.inject({
//       method: 'POST',
//       url: '/api/todos',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       },
//       payload: {
//         title: 'Test Todo'
//       }
//     });

//     expect(response.statusCode).toBe(201);
//     const body = JSON.parse(response.payload);
//     expect(body.success).toBe(true);
//     expect(body.data).toHaveProperty('title', 'Test Todo');
//   });

  // Test get todos
//   test('GET /api/todos should return user todos', async () => {
//     // Create user and todo first
//     const email = `gettodo${Date.now()}@example.com`;
    
//     const registerRes = await fastify.inject({
//       method: 'POST',
//       url: '/api/auth/register',
//       payload: {
//         name: 'Get Todo Test',
//         email: email,
//         password: '123456'
//       }
//     });
    
//     const registerBody = JSON.parse(registerRes.payload);
//     const token = registerBody.data.token;

//     // Create a todo
//     await fastify.inject({
//       method: 'POST',
//       url: '/api/todos',
//       headers: { 'Authorization': `Bearer ${token}` },
//       payload: { title: 'My Todo' }
//     });

//     // Get todos
//     const response = await fastify.inject({
//       method: 'GET',
//       url: '/api/todos',
//       headers: { 'Authorization': `Bearer ${token}` }
//     });

//     expect(response.statusCode).toBe(200);
//     const body = JSON.parse(response.payload);
//     expect(body.success).toBe(true);
//     expect(Array.isArray(body.data)).toBe(true);
//   });

  // Test delete todo
//   test('DELETE /api/todos/:id should delete todo', async () => {
//     // Create user and todo
//     const email = `delete${Date.now()}@example.com`;
    
//     const registerRes = await fastify.inject({
//       method: 'POST',
//       url: '/api/auth/register',
//       payload: {
//         name: 'Delete Test',
//         email: email,
//         password: '123456'
//       }
//     });
    
//     const registerBody = JSON.parse(registerRes.payload);
//     const token = registerBody.data.token;

//     // Create todo
//     const createRes = await fastify.inject({
//       method: 'POST',
//       url: '/api/todos',
//       headers: { 'Authorization': `Bearer ${token}` },
//       payload: { title: 'To be deleted' }
//     });
    
//     const createBody = JSON.parse(createRes.payload);
//     const todoId = createBody.data._id;

//     // Delete todo
//     const response = await fastify.inject({
//       method: 'DELETE',
//       url: `/api/todos/${todoId}`,
//       headers: { 'Authorization': `Bearer ${token}` }
//     });

//     expect(response.statusCode).toBe(200);
//     const body = JSON.parse(response.payload);
//     expect(body.success).toBe(true);
//   });

  // Test unauthorized access
//   test('POST /api/todos should return 401 without token', async () => {
//     const response = await fastify.inject({
//       method: 'POST',
//       url: '/api/todos',
//       payload: { title: 'No Auth Todo' }
//     });

//     expect(response.statusCode).toBe(401);
//   });
});