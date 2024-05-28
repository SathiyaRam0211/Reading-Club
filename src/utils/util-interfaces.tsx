export type Gender = "male" | "female";

export interface Member {
  id: string;
  username: string;
  books: Array<string>;
  gender: Gender;
  dateOfJoining: string;
}

export interface NavItemProps {
  align?: string;
  pointer?: boolean;
}

export interface FlexItemProps {
  alignItems?: string;
  justifyContent?: string;
  flexDirection?: string;
}

export interface FontProps {
  size?: string;
  weight?: string;
  light?: boolean;
}
