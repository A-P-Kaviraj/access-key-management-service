import { Injectable } from '@nestjs/common';
import { CreateAccessKeyDto, UpdateAccessKeyDto } from '../dto/access-key.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AccessKeyService {
  constructor(private prisma: PrismaService) {}

  // Simple utility function to generate a random alphanumeric string
  private generateRandomAccessKey(): string {
    // Generates a string from Math.random and converts it to a base-36 string (0-9, a-z)
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  async createKey(dto: CreateAccessKeyDto) {
    let accessKey: string;
    let existingKey;

    do {
      accessKey = this.generateRandomAccessKey();
      existingKey = await this.getKeyByKey(accessKey);
    } while (existingKey);

    const newKey = await this.prisma.accessKey.create({
      data: {
        key: accessKey,
        rateLimit: dto.rateLimit,
        ttl: dto.ttl,
      },
    });

    return newKey;
  }

  async listKeys() {
    return this.prisma.accessKey.findMany();
  }

  async getKeyByKey(key: string) {
    return this.prisma.accessKey.findUnique({
      where: { key },
    });
  }

  async updateKey(id: number, dto: UpdateAccessKeyDto) {
    return this.prisma.accessKey.update({
      where: { id },
      data: {
        rateLimit: dto.rateLimit,
        ttl: dto.ttl,
      },
    });
  }

  async deleteKey(id: number) {
    return this.prisma.accessKey.delete({
      where: { id },
    });
  }
}
