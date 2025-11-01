import { openDB } from 'idb';

export default async function database() {
  return openDB('ResumeDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('resumes')) {
        db.createObjectStore('resumes', { keyPath: 'id' });
      }
    },
  });
}

export async function addResume(resume) {
  const db = await database();
  await db.put('resumes', resume);
}

export async function getAllResumes() {
  const db = await database();
  return db.getAll('resumes');
}

export async function getResume(id) {
  const db = await database();
  return db.get('resumes', id);
}

export async function deleteResume(id) {
  const db = await database();
  await db.delete('resumes', id);
}