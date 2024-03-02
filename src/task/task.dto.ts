import { IsString, IsBoolean, IsOptional, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;
}

export class UpdateTaskDto {
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  id: number;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  done: boolean;
}
