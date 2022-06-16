import Transport = require('winston-transport');
import Pool = require('@voicenter-team/failover-amqp-pool');

export class AmqpPoolTransport extends Transport {
  client:any;
  channel:any;
  constructor(opts: { amqp: amqpConfiguration[],winstonConfig : Transport.TransportStreamOptions}) {
    super(opts.winstonConfig);
    this.client = new Pool(opts.amqp);
    this.client.on('channel', (channel) => {
      this.channel = channel;
    });
    this.client.connect();

  }
  log(info, callback) {
    // do whatever you want with log data
    console.log(info)
    try {
      if(this.channel?.publish)
       this.channel.publish(JSON.stringify(info));
    }catch (e) {
      console.error(e)
    }
    callback();
  }
}

export interface Connection {
  host: string;
  port: number;
  ssl: boolean;
  username: string;
  password: string;
  vhost: string;
  heartbeat: number;
}


export interface Channel {
  exchange_name: string;
  queue_name: string;
  prefetch: number;
  exchange_type: string;
  topic: string;
  options: unknown;
}

export interface amqpConfiguration {
  connection: Connection;
  channel: Channel;
}
