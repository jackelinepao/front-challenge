import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Status } from "../../shared/graphql/generated/types";
import { BoardColumn } from "../BoardColumn";
import styles from "./board.module.css";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { updateTaskListToCache } from "../../shared/utils/getTasksCache/get-tasks-cache-config";
import { useUpdateTaskMutation } from "../../GraphQL/Mutations/updateTask.mutation.generated";
import { useGetTasksQuery } from "../../GraphQL/Queries/getTasks.query.generated";

const STATES_BOARD = Object.values(Status);
export const Board = () => {
  const { data } = useGetTasksQuery({
    variables: {
      input: {},
    },
    fetchPolicy: "cache-and-network",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const [editTask] = useUpdateTaskMutation();

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className={styles.board}>
        {STATES_BOARD.map((state) => {
          const filteredTasks = (data?.tasks || []).filter(
            (task) => task.status === state
          );

          return (
            <BoardColumn status={state} key={state} tasks={filteredTasks} />
          );
        })}
      </div>
    </DndContext>
  );
  async function handleDragEnd(event) {
    const { active, over } = event;
    console.log(active.id);
    if (event.active?.node?.contains(event.target)) return;
    if (active.id && over.id) {
      await editTask({
        variables: {
          input: { id: active.id, status: over.id },
        },
        onCompleted: (result) => {
          updateTaskListToCache({
            data: result.updateTask,
            variables: { input: {} },
          });
        },
      });
    }
  }
};
