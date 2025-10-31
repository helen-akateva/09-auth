import { cookies } from "next/headers";
import { nextApi } from "./api";
import { User } from "@/types/user";
import { Note, NoteTag } from "@/types/note";

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

export const fetchServerNotes = async (
  params?: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();
  const { data } = await nextApi.get<FetchNotesResponse>("/notes", {
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const getServerNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const { data } = await nextApi.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const checkServerSession = async () => {
  const cookieStore = await cookies();

  const res = await nextApi.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
};

export const getServerUser = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextApi.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
