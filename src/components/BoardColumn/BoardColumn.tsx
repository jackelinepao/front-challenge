import { Status, Task } from "../../shared/graphql/generated/types";
import { useGetTasksQuery } from "../../GraphQL/Queries/getTasks.query.generated";
import { Card } from "../Card";
import { Text } from "@mantine/core";
import styles from "./boardColumn.module.css";
import { getStatus } from "../../shared/utils/status";
import { useDroppable } from "@dnd-kit/core";

interface BoardColumnProps {
  status: Status;
  tasks: Array<Task>;
}

export const BoardColumn = ({ status, tasks }: BoardColumnProps) => {
  /*  const sortedTasks = (data?.tasks || [])
    .filter((task) => task.dueDate)
    .slice()
    .sort(
      (a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
    ); */
  const { setNodeRef } = useDroppable({
    id: status,
    data: { columnStatus: status }, // Pass column status as data
  });

  return (
    <div ref={setNodeRef}>
      <Text>{`${getStatus(status)} (${
        String(tasks?.length || 0).padStart(2, "0") ?? 0
      })`}</Text>

      <div className={styles.boardColumn}>
        {tasks?.map((task) => (
          <div key={task.id}>
            {<Card key={task.id} task={task} columnStatus={status} />}
          </div>
        ))}
      </div>
    </div>
  );
};
