import { Dispatch, SetStateAction } from "react";

export type Gender = "male" | "female";

export type Color = "success" | "error" | "warning";

export type Order = "asc" | "desc";

export interface LoginContextType {
  session: string;
  setSession: Dispatch<SetStateAction<string>>;
}

export interface Member {
  id: string;
  username: string;
  books: Array<string>;
  gender: Gender;
  dateOfJoining: string;
}

export interface NavItemProps {
  $align?: string;
  $pointer?: string;
}

export interface FlexItemProps {
  $alignItems?: string;
  $justifyContent?: string;
  $flexDirection?: string;
}

export interface FontProps {
  $size?: string;
  $weight?: string;
  $light?: string;
}
