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

export interface RegisterRequest {
  email: string;
  password: string;
}

interface CheckSessionResponse {
    success: boolean;
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
  await nextApi.delete<Note>(`/notes/${id}`, {});
}

export async function getNoteById(id: string): Promise<Note> {
  const res = await nextApi.get<Note>(`/notes/${id}`, {});
  return res.data;
}

export async function register(data: RegisterRequest) {
  const res = await nextApi.post<User>("/auth/register", data);
  return res.data;
}

export async function login(data: RegisterRequest) {
  const res = await nextApi.post<User>("/auth/login", data);
  return res.data;
}

export async function logout() {
  const res = await nextApi.post<User>("/auth/logout");
  return res.data;
}

export async function checkSession() {
    const res = await nextApi.get<CheckSessionResponse>("/auth/session");
    if (res.status === 200) {
        { return {success: true} }
    }
return {success: false}
 
}

export async function getUser() {
  const res = await nextApi.get<User>("/users/me");
  return res.data;
}
