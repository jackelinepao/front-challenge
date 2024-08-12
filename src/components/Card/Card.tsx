import {
  Group,
  Menu,
  ActionIcon,
  Avatar,
  Text,
  Title,
  Button,
} from "@mantine/core";
import { formatDate } from "../../shared/utils/formatDate";
import { Status, Task, TaskTag } from "../../shared/graphql/generated/types";
import styles from "./card.module.css";
import { useDeleteTaskMutation } from "../../GraphQL/Mutations/deleteTask.mutation.generated";
import { useDisclosure } from "@mantine/hooks";
import { ModalCreateTask } from "../ModalCreateTask";
import { deleteTaskInCache } from "../../shared/utils/getTasksCache/get-tasks-cache-config";
import { getLabelPoints } from "../../shared/utils/points";
import { getLabel } from "../../shared/utils/labels";
import { createAvatar } from "@dicebear/core";
import { avataaars } from "@dicebear/collection";
import { useDraggable, useDroppable } from "@dnd-kit/core";

interface CardProps {
  task: Task;
  columnStatus: Status;
}

export const Card = ({ task, columnStatus }: CardProps) => {
  const [deleteTask] = useDeleteTaskMutation();

  const [opened, { open, close }] = useDisclosure(false);

  const { className, text } = formatDate(task.dueDate);

  const avatar = createAvatar(avataaars, {
    seed: task.assignee?.fullName,
    // ... other options
  });

  const onDelete = async () => {
    try {
      await deleteTask({
        variables: { input: { id: task.id } },
        onCompleted: (result) => {
          if (result) {
            deleteTaskInCache({
              data: { id: result.deleteTask.id },
              variables: { input: { status: result.deleteTask.status } },
            });
          }
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
      data: { columnStatus },
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition: transform ? "transform 200ms ease" : undefined, // Apply transition manually
    pointerEvents: isDragging
      ? "none"
      : ("auto" as React.CSSProperties["pointerEvents"]), // Disable pointer events when dragging
  };

  return (
    <>
      <div
        className={styles.card}
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        <div className={styles.contCard}>
          <Group justify="space-between">
            <Title size="h4">{task.name}</Title>
            <Menu withinPortal position="bottom-end" shadow="sm">
              <Menu.Target>
                <ActionIcon variant="subtle" color="gray">
                  <i className="ri-more-line"></i>
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown style={{ zIndex: 999999 }}>
                <Menu.Item
                  leftSection={<i className="ri-pencil-line"></i>}
                  onClick={open}
                >
                  Edit
                </Menu.Item>
                <Menu.Item
                  leftSection={<i className="ri-delete-bin-5-line"></i>}
                  onClick={onDelete}
                >
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
          <Group justify="space-between">
            <Text fz="md">{getLabelPoints(task.pointEstimate).title}</Text>
            <div
              className={`${styles.tagDate} ${
                className ? styles[className] : ""
              }`}
            >
              <i className="ri-alarm-line"></i>
              <Text>{text}</Text>
            </div>
          </Group>
          {!!task.tags.length && (
            <Group gap="8px">
              {task.tags.map((tag) => {
                const { name, key } = getLabel(tag as TaskTag);
                return (
                  <div
                    key={tag}
                    className={`${styles.tag} ${key ? styles[key] : ""}`}
                  >
                    {name}
                  </div>
                );
              })}
            </Group>
          )}
          <Group justify="space-between">
            <Avatar
              src={avatar.toDataUri()}
              alt={task.assignee?.fullName}
              size="32px"
            />

            <Group gap="4px" className={styles.buttons}>
              <ActionIcon variant="subtle" color="white">
                <i className="ri-attachment-line"></i>
              </ActionIcon>
              <Button
                leftSection={<i className="ri-mind-map"></i>}
                color="white"
                variant="subtle"
                size="compact-md"
              >
                5
              </Button>
              <Button
                leftSection={<i className="ri-chat-3-line"></i>}
                color="white"
                variant="subtle"
                size="compact-md"
              >
                3
              </Button>
            </Group>
          </Group>
        </div>
        {opened && (
          <ModalCreateTask opened={opened} close={close} task={task} />
        )}
      </div>
    </>
  );
};
