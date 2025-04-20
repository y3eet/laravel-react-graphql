import { AuthContextType, User } from "@/types/auth";
import { gql, useApolloClient, useMutation } from "@apollo/client";
import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}
const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      name
      email
    }
  }
`;
const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;
const LOGOUT = gql`
  mutation Logout {
    logout {
      id
      email
      name
    }
  }
`;
const REGISTER = gql`
  mutation Register($email: String!, $name: String!, $password: String!) {
    register(email: $email, name: $name, password: $password) {
      created_at
      email
      id
      email_verified_at
      name
      updated_at
    }
  }
`;
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const client = useApolloClient();

  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);

  // Mutations
  const [_login, loginResult] = useMutation<{ login: User }>(LOGIN);
  const [_register, registerResult] = useMutation<{ register: User }>(REGISTER);
  const [_logout, logoutResult] = useMutation(LOGOUT);

  // Results
  const mutationResult = { login: loginResult, logout: logoutResult, register: registerResult };

  useEffect(() => {
    async function getCurrentUser() {
      setLoading(true);
      try {
        const { data } = await client.query<{ currentUser: User }>({ query: CURRENT_USER });
        setUser(data.currentUser);
      } catch {
        setUser(undefined);
      }
      setLoading(false);
    }
    getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (email: string, password: string) => {
    const { data } = await _login({ variables: { email, password } });
    setUser(data?.login);
    navigate("/dashboard");
  };

  const logout = async () => {
    await _logout();
    setUser(undefined);
    navigate("/");
  };

  const register = async (name: string, email: string, password: string) => {
    const { data } = await _register({ variables: { name, email, password } });
    setUser(data?.register);
    navigate("/dashboard");
  };

  const contextValue: AuthContextType = {
    currentUser: user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
    register,
    mutationResult,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
