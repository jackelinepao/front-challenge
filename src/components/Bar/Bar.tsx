import { ActionIcon, Group } from "@mantine/core";
import { useGlobalStore } from "../../shared/context/GlobalStore";
import { useDisclosure } from "@mantine/hooks";
import { ModalCreateTask } from "../ModalCreateTask";

export const Bar = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const setView = useGlobalStore((state) => state.setView);
  const view = useGlobalStore((state) => state.view);

  return (
    <div>
      <Group justify="space-between">
        <Group>
          <ActionIcon
            onClick={() => setView("LIST")}
            variant={view === "LIST" ? "outline" : "transparent"}
            size="xl"
          >
            <i className="ri-menu-line"></i>
          </ActionIcon>
          <ActionIcon
            onClick={() => setView("GRID")}
            variant={view === "GRID" ? "outline" : "subtle"}
            size="xl"
          >
            <i className="ri-function-line"></i>
          </ActionIcon>
        </Group>
        <ActionIcon onClick={open} variant="" size="xl">
          <i className="ri-add-fill"></i>
        </ActionIcon>
      </Group>
      {opened && <ModalCreateTask opened={opened} close={close} />}
    </div>
  );
};
