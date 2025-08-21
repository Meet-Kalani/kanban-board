export const PRIORITIES_MAP = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
] as const;

export const STATUS_MAP = [
  { value: "todo", label: "To Do" },
  { value: "doing", label: "Doing" },
  { value: "done", label: "Done" },
];

export const STATUS = {
  TODO: "todo",
  DOING: "doing",
  DONE: "done",
} as const;

export const FORM_MODE = {
  CREATE: "create",
  UPDATE: "update",
} as const;
