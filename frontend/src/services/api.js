import { API_BASE_URL } from '../constants/modules';

/**
 * Lightweight API service for communicating with the NeuroFlow backend.
 */
class ApiService {
  constructor() {
    this.baseUrl = API_BASE_URL;
    this.token = null;
  }

  setToken(token) {
    this.token = token;
  }

  async request(path, options = {}) {
    const url = `${this.baseUrl}${path}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
      ...options.headers,
    };

    const res = await fetch(url, { ...options, headers });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || `Request failed with status ${res.status}`);
    }
    return data;
  }

  // Auth
  async register(email, password, displayName) {
    const data = await this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, displayName }),
    });
    this.setToken(data.token);
    return data;
  }

  async login(email, password) {
    const data = await this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    this.setToken(data.token);
    return data;
  }

  async getMe() {
    return this.request('/api/auth/me');
  }

  // Preferences
  async getModulePreferences() {
    return this.request('/api/preferences/modules');
  }

  async updateModulePreferences(modules) {
    return this.request('/api/preferences/modules', {
      method: 'PUT',
      body: JSON.stringify({ modules }),
    });
  }

  async getModuleSettings(moduleKey) {
    return this.request(`/api/preferences/${moduleKey}`);
  }

  async updateModuleSettings(moduleKey, settings) {
    return this.request(`/api/preferences/${moduleKey}`, {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  }

  // Tasks
  async getTasks(status) {
    const query = status ? `?status=${status}` : '';
    return this.request(`/api/tasks${query}`);
  }

  async createTask(task) {
    return this.request('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    });
  }

  async updateTask(id, updates) {
    return this.request(`/api/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteTask(id) {
    return this.request(`/api/tasks/${id}`, { method: 'DELETE' });
  }

  // Journal
  async getJournalEntries() {
    return this.request('/api/journal');
  }

  async createJournalEntry(entry) {
    return this.request('/api/journal', {
      method: 'POST',
      body: JSON.stringify(entry),
    });
  }

  async updateJournalEntry(id, updates) {
    return this.request(`/api/journal/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteJournalEntry(id) {
    return this.request(`/api/journal/${id}`, { method: 'DELETE' });
  }

  // Synesthesia
  async getSynesthesiaMappings() {
    return this.request('/api/preferences/synesthesia/mappings');
  }

  async createSynesthesiaMapping(mapping) {
    return this.request('/api/preferences/synesthesia/mappings', {
      method: 'POST',
      body: JSON.stringify(mapping),
    });
  }

  async deleteSynesthesiaMapping(id) {
    return this.request(`/api/preferences/synesthesia/mappings/${id}`, {
      method: 'DELETE',
    });
  }
}

export const api = new ApiService();
