import { Group, Menu, ActionIcon, Pill, Avatar, Text } from "@mantine/core";
import { formatDate } from "../../shared/utils/formatDate";
import { getLabel } from "../../shared/utils/points";
import { Task } from "../../shared/graphql/generated/types";
import styles from "./card.module.css";
import { useDeleteTaskMutation } from "../../GraphQL/Mutations/deleteTask.mutation.generated";
import { useDisclosure } from "@mantine/hooks";
import { ModalCreateTask } from "../ModalCreateTask";
import { deleteTaskInCache } from "../../shared/utils/getTasksCache/get-tasks-cache-config";

interface CardProps {
  task: Task;
}

export const Card = ({ task }: CardProps) => {
  const [deleteTask] = useDeleteTaskMutation();

  const [opened, { open, close }] = useDisclosure(false);

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

  return (
    <div className={styles.card}>
      <div>
        <Group justify="space-between">
          <h4>{task.name}</h4>
          <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray">
                <i className="ri-more-line"></i>
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
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
          <Text>{getLabel(task.pointEstimate)}</Text>
          <div className={styles.tagDate}>
            <i className="ri-alarm-line"></i>
            <Text>{formatDate(task.dueDate)}</Text>
          </div>
        </Group>
        <Group>
          {task.tags.map((tag) => (
            <Pill key={tag}>{tag}</Pill>
          ))}
        </Group>
        <Group>
          <Avatar color="cyan" radius="xl">
            MK
          </Avatar>
          <Group>
            <ActionIcon variant="subtle" color="gray">
              <i className="ri-attachment-line"></i>
            </ActionIcon>
            <ActionIcon variant="subtle" color="gray">
              5 <i className="ri-mind-map"></i>
            </ActionIcon>
            <ActionIcon variant="subtle" color="gray">
              3 <i className="ri-chat-3-line"></i>
            </ActionIcon>
          </Group>
        </Group>
      </div>
      {opened && <ModalCreateTask opened={opened} close={close} task={task} />}
    </div>
  );
};
