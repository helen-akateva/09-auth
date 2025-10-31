import { User } from "@/types/user";
import type { Note, NoteTag } from "../types/note";
import { nextApi } from "./api";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

interface FetchNotesParams {
  search?: string;
  tag?: NoteTag;
  page?: number;
  perPage?: number;
  sortBy?: SortBy;
}

type SortBy = "title" | "createdAt" | "updatedAt";

interface UserData {
  email: string;
  password: string;
}

interface SessionResponse {
  success: boolean;
}

interface UpdateUserData {
  email?: string;
  name?: string;
}

export async function fetchNotes(
  params?: FetchNotesParams
): Promise<FetchNotesResponse> {
  const response = await nextApi.get<FetchNotesResponse>("/notes", {
    params: params,
  });
  return response.data;
}

export async function createNote(
  createNoteData: CreateNoteData
): Promise<Note> {
  const res = await nextApi.post<Note>("/notes", createNoteData, {});
  return res.data;
}

export async function deleteNote(id: string): Promise<void> {
  await nextApi.delete<Note>("/notes/${id}", {});
}

export async function getNoteById(id: string): Promise<Note> {
  const res = await nextApi.get<Note>(`/notes/${id}`, {});
  return res.data;
}

export async function registerUser(userData: UserData): Promise<User> {
  const res = await nextApi.post<User>("/auth/register", userData);
  return res.data;
}

export async function loginUser(userData: UserData): Promise<User> {
  const res = await nextApi.post<User>("/auth/login", userData);
  return res.data;
}

export async function logoutUser(): Promise<void> {
  await nextApi.post("/auth/logout");
}

export async function checkSession(): Promise<SessionResponse> {
  const res = await nextApi.get("/auth/session");
  if (res.status === 200) {
    return { success: true };
  }
  return { success: false };
}

export async function getUser(): Promise<User> {
  const res = await nextApi.get("/users/me");
  return res.data;
}

export async function updateUser(userData: UpdateUserData): Promise<User> {
  const res = await nextApi.patch<User>("/users/me", userData);
  return res.data;
}
