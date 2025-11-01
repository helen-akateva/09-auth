import { cookies } from "next/headers";

import { User } from "@/types/user";
import { Note, NoteTag } from "@/types/note";
import { nextApi } from "./api";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  search?: string;
  tag?: NoteTag;
  page?: number;
  perPage?: number;
  sortBy?: "title" | "createdAt" | "updatedAt";
}

export async function fetchServerNotes(
  params?: FetchNotesParams
): Promise<FetchNotesResponse> {
  const cookieStore = await cookies();
  const { data } = await nextApi.get<FetchNotesResponse>("/notes", {
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export async function getServerNoteById(id: string): Promise<Note> {
  const cookieStore = await cookies();
  const { data } = await nextApi.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export async function checkServerSession() {
  const cookieStore = await cookies();

  const res = await nextApi.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
}

export async function getServerUser(): Promise<User> {
  const cookieStore = await cookies();
  const { data } = await nextApi.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}
