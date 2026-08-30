const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export async function fetchProjects() {
  const res = await fetch(`${API_URL}/projects`);
  if (!res.ok) {
    throw new Error('Failed to fetch projects');
  }
  return res.json();
}

export async function fetchProfile() {
  const res = await fetch(`${API_URL}/profile`);
  if (!res.ok) {
    throw new Error('Failed to fetch profile');
  }
  return res.json();
}

export async function submitContactForm(data: any) {
  const res = await fetch(`${API_URL}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error('Failed to submit message');
  }
  return res.json();
}
