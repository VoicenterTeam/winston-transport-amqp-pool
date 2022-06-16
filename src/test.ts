// Using transport
import { createLogger } from 'winston';
import { amqpConfiguration, AmqpPoolTransport, } from './index';
const poolConfig:amqpConfiguration[] =[
  {
    "connection": {
      "host": "127.0.0.1",
      "port": 5672,
      "ssl": false,
      "username": "guest",
      "password": "ANB7harje25eJn2",
      "vhost": "/",
      "heartbeat": 5
    },
    "channel": {
      "exchange_name": "TestExchange",
      "queue_name": "TestQueue",
      "prefetch": 5,
      "exchange_type": "fanout",
      "topic": "",
      "options": {}
    }
  }
];

const transport = new AmqpPoolTransport({amqp:poolConfig,winstonConfig:{}});

// Create a logger and consume an instance of your transport
const logger = createLogger({
  transports: [transport]
});

setInterval(function () {
  logger.info('Here I am')
},1000)

