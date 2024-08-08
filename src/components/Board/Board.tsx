
import { Status } from "../../shared/graphql/generated/types";
import { BoardColumn } from "../BoardColumn";
import styles from "./board.module.css";

const STATES_BOARD = Object.values(Status);
export const Board = () => {
  return (
    <div className={styles.board}>
      {STATES_BOARD.map((state) => (
        <BoardColumn status={state} key={state} />
      ))}
    </div>
  );
};
