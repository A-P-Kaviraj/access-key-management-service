import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateAccessKeyDto, UpdateAccessKeyDto } from '../dto/access-key.dto';
import { AccessKeyService } from '../services/acess-key.service';

@Controller('keys')
export class AccessKeyController {
  constructor(private readonly accessKeyService: AccessKeyService) {}

  @Post()
  create(@Body() createKeyDto: CreateAccessKeyDto) {
    return this.accessKeyService.createKey(createKeyDto);
  }

  @Get()
  findAll() {
    return this.accessKeyService.listKeys();
  }

  @Get(':key')
  findOne(@Param('key') key: string) {
    return this.accessKeyService.getKeyByKey(key);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateKeyDto: UpdateAccessKeyDto) {
    return this.accessKeyService.updateKey(Number(id), updateKeyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.accessKeyService.deleteKey(Number(id));
  }

  @MessagePattern('access_key_check')
  async checkAccessKey(@Payload() data: { key: string }) {
    console.log('Received message:', data);
    try {
      const accessKey = await this.accessKeyService.getKeyByKey(data.key);
      if (accessKey) {
        const response = {
          valid: true,
          rateLimit: accessKey.rateLimit,
          ttl: accessKey.ttl,
        };
        console.log('Sending response:', response);
        return response;
      }
      console.log('Sending response: invalid key');
      return { valid: false };
    } catch (error) {
      console.error('Error handling message:', error);
      throw error;
    }
  }
}
