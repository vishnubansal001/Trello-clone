import { databases } from "@/appwrite";

export const getTodosGroupedByColumn = async () => {
  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
  );

  const todos = data.documents;

  const columns = todos.reduce((acc, todo) => {
    if (!acc.get(todo.status)) {
      acc.set(todo.status, {
        id: todo.status,
        todos: [],
      });
    }

    acc.get(todo.status)!.todos.push({
      $id: todo.$id,
      $createdAt: todo.$createdAt,
      title: todo.title,
      status: todo.status,
      ...(todo.image && { image: JSON.parse(todo.image) }),
    });

    return acc;
  }, new Map<TypedColumn, Column>());

  const cloumnTypes: TypedColumn[] = ["todo", "inprogress", "done"];
  for (const cloumnType of cloumnTypes) {
    if (!columns.get(cloumnType)) {
      columns.set(cloumnType, {
        id: cloumnType,
        todos: [],
      });
    }
  }

  const soretedColumns = new Map(
    Array.from(columns.entries()).sort(
      (a, b) => cloumnTypes.indexOf(a[0]) - cloumnTypes.indexOf(b[0])
    )
  );

  const board: Board = {
    columns: soretedColumns,
  };

  return board;
};
