import { MutationResult } from "@apollo/client";
export type User = {
  id: string;
  email: string;
  name: string;
};

export type AuthContextType = {
  currentUser: User | null | undefined;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
  mutationResult: {
    login: MutationResult;
    logout: MutationResult;
    register: MutationResult;
  };
};
