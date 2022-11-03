export interface Task {
    name: string;
    frequency: TaskFrequency;
    execute: () => Promise<void>;
}

export enum TaskFrequency {
    EVERY_MINUTE = "* * * * *",
    EVERY_5_MINUTES = "*/5 * * * *",
    EVERY_10_MINUTES = "*/10 * * * *",
    EVERY_15_MINUTES = "*/15 * * * *",
    EVERY_30_MINUTES = "*/30 * * * *",
    EVERY_45_MINUTES = "*/45 * * * *",
    EVERY_HOUR = "0 * * * *",
    EVERY_8_HOURS = "0 */8 * * *",
    EVERY_12_HOURS = "0 */12 * * *",
    EVERY_DAY = "0 0 * * *",
    EVERY_MIDNIGHT = "0 0 0 * *",
    EVERY_2_DAYS = "0 0 */2 * *",
    EVERY_3_DAYS = "0 0 */3 * *",
    EVERY_5_DAYS = "0 0 */5 * *",
    EVERY_7_DAYS = "0 0 */7 * *",
    EVERY_10_DAYS = "0 0 */10 * *",
    EVERY_14_DAYS = "0 0 */14 * *",
    EVERY_21_DAYS = "0 0 */21 * *",
    EVERY_MONTH = "0 0 1 * *",
    EVERY_3_MONTHS = "0 0 1 */3 *",
    EVERY_6_MONTHS = "0 0 1 */6 *",
    EVERY_9_MONTHS = "0 0 1 */9 *",
    EVERY_YEAR = "0 0 1 1 *",
}
