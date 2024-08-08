import { Status } from "../../shared/graphql/generated/types";
import { useGetTasksQuery } from "../../GraphQL/Queries/getTasks.query.generated";
import { Card } from "../Card";
import styles from "./boardColumn.module.css";

interface BoardColumnProps {
  status: Status;
}

export const BoardColumn = ({ status }: BoardColumnProps) => {
  const { data } = useGetTasksQuery({
    variables: {
      input: { status },
    },
    fetchPolicy: "cache-and-network",
  });

  const sortedTasks = (data?.tasks || [])
    .filter((task) => task.dueDate)
    .slice()
    .sort(
      (a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
    );

  return (
    <div className={styles.boardColumn}>
      {sortedTasks?.map((task) => (
        <div key={task.id}>{<Card key={task.id} task={task} />}</div>
      ))}
    </div>
  );
};
