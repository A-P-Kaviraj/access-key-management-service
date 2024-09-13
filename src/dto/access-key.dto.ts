export class CreateAccessKeyDto {
  rateLimit: number;
  ttl: number;
}

export class UpdateAccessKeyDto {
  rateLimit?: number;
  ttl?: number;
}
