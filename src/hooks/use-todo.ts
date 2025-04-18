import { Todo } from "@/types/todo";
import { gql, useMutation, useQuery } from "@apollo/client";

const GET_TODOS = gql`
  query GetTodos {
    todos {
      completed
      created_at
      title
      id
      updated_at
    }
  }
`;

const CREATE_TODO = gql`
  mutation CreateTodo($title: String!) {
    createTodo(completed: false, title: $title) {
      completed
      created_at
      id
      title
      updated_at
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!, $title: String, $completed: Boolean) {
    updateTodo(completed: $completed, id: $id, title: $title) {
      completed
      id
      title
    }
  }
`;

export const useTodos = () => {
  const { data, loading, refetch } = useQuery<{ todos: Todo[] }>(GET_TODOS);
  const [_createTodo, createTodoResult] = useMutation(CREATE_TODO);
  const [_deleteTodo, deleteTodoResult] = useMutation(DELETE_TODO);
  const [_updateTodo, updateTodoResult] = useMutation(UPDATE_TODO);

  const mutationResult = { createTodoResult, deleteTodoResult, updateTodoResult };

  async function createTodo(title: string) {
    await _createTodo({ variables: { title } });
    refetch();
  }

  async function deleteTodo(id: string | number) {
    await _deleteTodo({ variables: { id } });
    refetch();
  }

  async function updateTodo(id: string | number, completed: boolean = false, title?: string) {
    await _updateTodo({
      variables: { id, title, completed },
      // Make sure to get the correct data from mutation when using optimistic updates
      optimisticResponse: {
        updateTodo: {
          id: id.toString(),
          title,
          completed,
          __typename: "Todo",
        },
      },
    });
  }

  return {
    todos: data?.todos || [],
    loading,
    refetch,
    createTodo,
    updateTodo,
    deleteTodo,
    mutationResult,
  };
};
