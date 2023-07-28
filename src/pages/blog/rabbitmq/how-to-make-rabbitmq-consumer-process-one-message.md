---
title: 'How to Make RabbitMQ Consumer Process Only One Queue Message'
date: '2023-07-28'
tags:
  - typescript
  - rabbitmq
---

## RabbitMQ Consumer Can Pull Up to 250 Messages from Queue 

In RabbitMQ, the prefetch size control how many messages a consumer would pull from the queue. 

By default if you do not specify, it would be 250 messages according to the this [article](https://www.rabbitmq.com/consumer-prefetch.html) in Rabbitmq.

However, I faced the scenario where I would prefer to process one message only every single time. And the question is how?

## How to Setup Consumer Consume Only 1 Message from the Queue?

The simple answer is to set your prefetch size to `1` in your consumer channel.

Below is the sample code write with npm package `amqp-connection-manager`.

```js
import amqp from "amqp-connection-manager";

async function initConsumer() {
  const connection = amqp.connect("amqp://localhost");
  const channelWrapper = connection.createChannel({
    json: false,
    setup: (channel: amqplib.ConfirmChannel) => {
      const queue = "my-queue";
      return Promise.all([
        channel.assertQueue(queue),

        // The MOST IMPORTANT part to configure how many messages the channel fetch from queue.
        channel.prefetch(1), 

        channel.consume(queue, (message) => {
          if (message) {
            console.log(`Received message: ${message.content.toString()}`);
            // Process the message here
            channelWrapper.ack(message); // Acknowledge the message
          }
        }),
      ]);
    },
  });

  await channelWrapper.waitForConnect();
}
```

TLDR, `channel.prefetch(1)` is the answer here.

Thanks for reading and see you in the next one.
