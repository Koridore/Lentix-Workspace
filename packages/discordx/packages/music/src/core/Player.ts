import { EventEmitter } from "node:events";

import type { Guild, Snowflake } from "discord.js";
import { Collection } from "discord.js";

import type { PlayerEventArgOf, PlayerEvents } from "../index.js";
import { Queue } from "./Queue.js";

// default queue
class MyQueue extends Queue {}

/**
 * Music player
 */
export class Player extends EventEmitter {
  public queues = new Collection<Snowflake, Queue>();

  public on<Q extends Queue, T extends keyof PlayerEvents<Q>>(
    event: T,
    handler: PlayerEventArgOf<Q, T>
  ): this {
    return super.on(event, handler);
  }

  /**
   * Get guild queue
   *
   * @param guild - Guild
   *
   * @returns
   */
  public queue<T extends Queue = Queue>(
    guild: Guild,
    customQueue?: () => T
  ): T {
    const queue = this.queues.get(guild.id) as T | undefined;

    // return queue if already exist
    if (queue) {
      return queue;
    }

    const queueClass = customQueue
      ? customQueue()
      : (new MyQueue(this, guild) as T);

    // store queue
    this.queues.set(guild.id, queueClass);

    // return queue
    return queueClass;
  }
}
