import Auth from '../components/auth/auth.js';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, fireEvent } from '@testing-library/react';

const fakeResponse = rest.post('http://localhost:3001/signin', (req, res, ctx) => {
  return res(ctx.json({
    "capabilities": (4)['read', 'create', 'update', 'delete'],
    "createdAt": "2022-02-27T20:25:56.847Z",
    "id": 1,
    "password": "$2b$10$zKwoELndgnAPz1miGLI3he5mVazlUhx3M9dcfyAmpctQ0hUMMiIwK",
    "role": "admin",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2NDU5OTgzMjh9.V-taVFqdTHotwWTvmkJWPv20pv-HRZSoSZvh1bQdroU",
    "updatedAt": "2022-02-27T20:25:56.847Z",
    "username": "test",
  }));
});

const server = new setupServer(fakeResponse);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Tests Auth component handles conditional rendering', () => {
  it('Will only show what the user is authorized to see', () => {

    render(
      <Auth capability="read">
        <div>words</div>
      </Auth>
    );

  })
})