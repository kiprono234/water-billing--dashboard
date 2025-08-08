const BASE_URL = 'http://localhost:3001';

// === USERS ===

export const getStoredUsers = async () => {
  const res = await fetch(`${BASE_URL}/users`);
  return await res.json();
};

export const setStoredUsers = async (users) => {
  // Clear and re-add users to mimic overwrite
  const existing = await getStoredUsers();
  for (const user of existing) {
    await fetch(`${BASE_URL}/users/${user.id}`, { method: 'DELETE' });
  }
  for (const user of users) {
    await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
  }
};

// === BILLINGS ===

export const getStoredBillings = async () => {
  const res = await fetch(`${BASE_URL}/billings`);
  return await res.json();
};

export const setStoredBillings = async (billings) => {
  // Optional: add logic to delete all and re-add
  for (const billing of billings) {
    await fetch(`${BASE_URL}/billings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(billing)
    });
  }
};

// === USAGE DATA ===

export const getStoredUsageData = async () => {
  const res = await fetch(`${BASE_URL}/usageData`);
  return await res.json();
};

export const setStoredUsageData = async (usageData) => {
  // Optional: clear and re-add all usage data
  for (const data of usageData) {
    await fetch(`${BASE_URL}/usageData`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  }
};
