// frontend/src/lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null;

  constructor() {
    this.baseUrl = API_BASE_URL;
    this.token = null;
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  getToken(): string | null {
    if (!this.token && typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
    return this.token;
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const error = await response.json();
        return { error: error.detail || 'An error occurred' };
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      console.error('API request failed:', error);
      return { error: 'Network error occurred' };
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      return { error: error.detail || 'Login failed' };
    }

    const data = await response.json();
    this.setToken(data.access_token);
    return { data };
  }

  async register(email: string, password: string, name: string) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  }

  async logout() {
    this.clearToken();
  }

  async getCurrentUser() {
    return this.request('/auth/me', {
      method: 'GET',
    });
  }

  // Recipe endpoints
  async getRecipes(params?: { skip?: number; limit?: number; category?: string; search?: string }) {
    const queryParams = new URLSearchParams();
    if (params?.skip) queryParams.append('skip', params.skip.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.category) queryParams.append('category', params.category);
    if (params?.search) queryParams.append('search', params.search);

    return this.request(`/recipes?${queryParams.toString()}`, {
      method: 'GET',
    });
  }

  async getRecipe(id: number) {
    return this.request(`/recipes/${id}`, {
      method: 'GET',
    });
  }

  async createRecipe(recipeData: any) {
    return this.request('/recipes', {
      method: 'POST',
      body: JSON.stringify(recipeData),
    });
  }

  async updateRecipe(id: number, recipeData: any) {
    return this.request(`/recipes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(recipeData),
    });
  }

  async deleteRecipe(id: number) {
    return this.request(`/recipes/${id}`, {
      method: 'DELETE',
    });
  }

  // User recipes
  async getUserRecipes(userId: number) {
    return this.request(`/users/${userId}/recipes`, {
      method: 'GET',
    });
  }

  // Saved recipes
  async getSavedRecipes() {
    return this.request('/recipes/saved', {
      method: 'GET',
    });
  }

  async saveRecipe(recipeId: number) {
    return this.request(`/recipes/${recipeId}/save`, {
      method: 'POST',
    });
  }

  async unsaveRecipe(recipeId: number) {
    return this.request(`/recipes/${recipeId}/save`, {
      method: 'DELETE',
    });
  }

  // Likes
  async likeRecipe(recipeId: number) {
    return this.request(`/recipes/${recipeId}/like`, {
      method: 'POST',
    });
  }

  async unlikeRecipe(recipeId: number) {
    return this.request(`/recipes/${recipeId}/like`, {
      method: 'DELETE',
    });
  }

  // Comments
  async getComments(recipeId: number) {
    return this.request(`/recipes/${recipeId}/comments`, {
      method: 'GET',
    });
  }

  async addComment(recipeId: number, content: string) {
    return this.request(`/recipes/${recipeId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
  }

  async deleteComment(recipeId: number, commentId: number) {
    return this.request(`/recipes/${recipeId}/comments/${commentId}`, {
      method: 'DELETE',
    });
  }

  // Follow
  async followUser(userId: number) {
    return this.request(`/users/${userId}/follow`, {
      method: 'POST',
    });
  }

  async unfollowUser(userId: number) {
    return this.request(`/users/${userId}/follow`, {
      method: 'DELETE',
    });
  }

  // Categories
  async getCategories() {
    return this.request('/categories', {
      method: 'GET',
    });
  }

  // Upload image
  async uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const token = this.getToken();
    const headers: HeadersInit = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${this.baseUrl}/upload`, {
        method: 'POST',
        headers,
        body: formData,
      });

      if (!response.ok) {
        return { error: 'Upload failed' };
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return { error: 'Upload error' };
    }
  }
}

export const apiClient = new ApiClient();
export default apiClient;