import { Task } from "./Task";

export interface ScheduledTask extends Task {
    start: () => void;
    stop: () => void;
}
