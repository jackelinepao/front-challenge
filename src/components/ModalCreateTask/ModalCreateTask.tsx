import {
  Button,
  Group,
  Input,
  Modal,
  MultiSelect,
  Select,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { pointArray } from "../../shared/utils/points";
import { useGetUsersQuery } from "../../GraphQL/Queries/getUsers.query.generated";
import styles from "./modalCreateTask.module.css";
import {
  DateIcon,
  EstimateIcon,
  LabelIcon,
  UserIcon,
} from "../../shared/Icons";
import { Controller, useForm } from "react-hook-form";
import { FormTaskResolver } from "./utils/FormTask";
import { labelArray } from "../../shared/utils/labels";
import { useCreateTaskMutation } from "../../GraphQL/Mutations/createTask.mutation.generated";
import {
  PointEstimate,
  Status,
  Task,
  TaskTag,
} from "../../shared/graphql/generated/types";
import { useUpdateTaskMutation } from "../../GraphQL/Mutations/updateTask.mutation.generated";
import {
  createTaskInCache,
  updateTaskListToCache,
} from "../../shared/utils/getTasksCache/get-tasks-cache-config";

interface ModalProp {
  opened: boolean;
  task?: Task;
  close: () => void;
}

type Inputs = {
  name: string;
  dueDate: string;
  pointEstimate: PointEstimate;
  tags: Array<TaskTag>;
  status: Status;
  assigneeId?: string;
};

export const ModalCreateTask = ({ opened, close, task }: ModalProp) => {
  const { data } = useGetUsersQuery();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "all",
    resolver: FormTaskResolver,
    defaultValues: {
      status: task?.status ?? Status.BACKLOG,
      name: task?.name ?? "",
      pointEstimate: task?.pointEstimate,
      assigneeId: task?.assignee?.id ?? "",
      tags: task?.tags ?? [],
      dueDate: task?.dueDate ?? "",
    },
  });

  const autocompleteData =
    data?.users?.map((user) => ({
      value: user.id,
      label: user.fullName,
    })) ?? [];

  const [createTask] = useCreateTaskMutation();
  const [editTask] = useUpdateTaskMutation();

  const onHandle = async (data: Inputs) => {
    const result = await createTask({
      variables: {
        input: data,
      },
      onCompleted: (result) => {
        createTaskInCache({
          data: result.createTask,
          variables: { input: {} },
        });
      },
    });

    if (result) {
      close();
    }
  };

  const onEdit = async (data: Inputs) => {
    if (task?.id) {
      const result = await editTask({
        variables: {
          input: { ...data, id: task.id },
        },
        onCompleted: (result) => {
          updateTaskListToCache({
            data: result.updateTask,
            variables: { input: {} },
          });
        },
      });

      if (result) {
        close();
      }
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      centered
      size="lg"
      withCloseButton={false}
    >
      <form onSubmit={handleSubmit(!task?.id ? onHandle : onEdit)}>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Task Title"
              variant="unstyled"
              size="sm"
              className={styles.inputTitle}
              error={!!errors.name}
              autoComplete="off"
            />
          )}
        />

        <div>
          <Group grow wrap="nowrap">
            <Controller
              control={control}
              name="pointEstimate"
              render={({ field }) => (
                <Select
                  {...field}
                  variant="unstyled"
                  placeholder="Estimate"
                  data={pointArray}
                  checkIconPosition="right"
                  leftSection={<EstimateIcon />}
                  rightSection={<div style={{ display: "none" }} />}
                />
              )}
            />
            <Controller
              control={control}
              name="assigneeId"
              render={({ field }) => (
                <Select
                  {...field}
                  variant="unstyled"
                  placeholder="Assignee"
                  data={autocompleteData}
                  checkIconPosition="right"
                  leftSection={<UserIcon />}
                  rightSection={<div style={{ display: "none" }} />}
                />
              )}
            />
            <Controller
              control={control}
              name="tags"
              render={({ field: { onChange, value } }) => (
                <MultiSelect
                  variant="unstyled"
                  value={value}
                  data={labelArray}
                  leftSection={<LabelIcon />}
                  maxDropdownHeight={300}
                  placeholder="Label"
                  onChange={onChange}
                  rightSection={<div style={{ display: "none" }} />}
                />
              )}
            />
            <Controller
              control={control}
              name="dueDate"
              render={({ field }) => (
                <DatePickerInput
                  {...field}
                  value={field.value ? new Date(field.value) : undefined}
                  variant="unstyled"
                  leftSection={<DateIcon />}
                  placeholder="Pick date"
                  valueFormat="MMM. DD YYYY"
                />
              )}
            />
          </Group>
          <Group justify="flex-end">
            <Button onClick={close}>Cancel</Button>
            <Button type="submit">{!task?.id ? "Create" : "Update"}</Button>
          </Group>
        </div>
      </form>
    </Modal>
  );
};
